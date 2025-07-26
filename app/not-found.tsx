import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="mx-auto max-w-md rounded-lg bg-white/80 p-8 text-center shadow-lg dark:bg-gray-800/80">
        <div className="mb-4 text-6xl">🔍</div>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Page Not Found
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="space-x-4">
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/">Go home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/claim/new">Submit a claim</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
