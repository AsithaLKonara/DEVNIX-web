'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Sentry or Pino log here
    console.error('Unhandled UI Exception caught by boundary:', error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
          <div className="rounded-xl bg-white p-8 shadow-xl max-w-md border border-red-100">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Something went wrong!</h2>
            <p className="text-gray-600 mb-6 text-sm">
              We encountered an unexpected error processing your request. Our team has been notified.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => reset()}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition-colors"
              >
                Try again
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
