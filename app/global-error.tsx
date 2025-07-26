'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="mx-auto max-w-md rounded-lg bg-white/80 p-8 text-center shadow-lg dark:bg-gray-800/80">
            <div className="mb-4 text-6xl">⚠️</div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Something went wrong!
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              {error.message ||
                'An unexpected error occurred. Please try again.'}
            </p>
            <div className="space-x-4">
              <button
                onClick={reset}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Try again
              </button>
              <button
                onClick={() => (window.location.href = '/')}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Go home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
