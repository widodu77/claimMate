'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ClaimSubmissionError({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Claim submission error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white/80 p-8 text-center shadow-lg dark:bg-gray-800/80">
          <div className="mb-4 text-6xl">⚠️</div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Error Submitting Claim
          </h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            {error.message || 'Failed to submit your claim. Please try again.'}
          </p>
          <div className="space-x-4">
            <Button onClick={reset} className="bg-blue-600 hover:bg-blue-700">
              Try again
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Go home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
