import axios from 'axios';
import axiosRetry from 'axios-retry';
import { io, Socket } from 'socket.io-client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Implement exponential backoff API retries for network turbulence
axiosRetry(apiClient, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    // Retry on network errors or 5xx server errors
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || (error.response?.status ?? 0) >= 500;
  },
});


// Request Interceptor: Inject JWT token into headers dynamically
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('xonit_space_auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor: Simplify standard response unwrapping & catch auth expirations
apiClient.interceptors.response.use(
  (response) => {
    // Our NestJS TransformInterceptor envelopes data in { success: true, statusCode: 200, data: T }
    // We return the unwrapped payload to the caller directly.
    return response.data?.data !== undefined ? response.data.data : response.data;
  },
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      console.warn('⚠️ Session expired or unauthorized. Redirecting to login.');
      // Handle session expiration cleanup
      localStorage.removeItem('xonit_space_auth_token');
      localStorage.removeItem('xonit_space_user_profile');
      
      // Optionally redirect if on a protected browser page
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error.response?.data || error);
  },
);

// WebSocket Auto-Reconnect Strategy
export const createWebSocketClient = (namespace: string = '/'): Socket => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('xonit_space_auth_token') : null;
  const baseUrl = API_BASE_URL.replace('/api/v1', '');
  
  const socket = io(`${baseUrl}${namespace}`, {
    auth: { token },
    reconnection: true,
    reconnectionAttempts: 10, // Max retries before giving up
    reconnectionDelay: 1000, // Initial delay between retries
    reconnectionDelayMax: 5000, // Maximum delay between retries
    timeout: 20000,
    transports: ['websocket'],
  });

  socket.on('connect_error', (err) => {
    console.warn(`[WebSocket] Connection error: ${err.message}`);
  });

  socket.on('disconnect', (reason) => {
    console.warn(`[WebSocket] Disconnected: ${reason}`);
    if (reason === 'io server disconnect') {
      // Reconnect manually if server dropped the connection
      setTimeout(() => socket.connect(), 1000);
    }
  });

  return socket;
};
