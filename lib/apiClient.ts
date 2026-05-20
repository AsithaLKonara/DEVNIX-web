import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
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
