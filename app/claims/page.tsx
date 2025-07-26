'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  IconArrowRight,
  IconDownload,
  IconClock,
  IconCheck,
  IconX,
  IconArchive
} from '@/components/ui/icons'

interface Claim {
  id: string
  created_at: string
  updated_at: string
  narrative: string
  status: 'pending' | 'solved' | 'opposed' | 'closed'
  files: string[]
  extracted_data?: any
}

const statusConfig = {
  pending: {
    label: 'Pending',
    color:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    icon: IconClock
  },
  solved: {
    label: 'Solved',
    color:
      'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    icon: IconCheck
  },
  opposed: {
    label: 'Opposed',
    color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    icon: IconX
  },
  closed: {
    label: 'Closed',
    color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
    icon: IconArchive
  }
}

export default function ClaimsPage() {
  const [claims, setClaims] = useState<Claim[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    // Check if user was redirected from successful claim submission
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('submitted') === 'true') {
      setShowSuccess(true)
      // Remove the parameter from URL
      window.history.replaceState({}, document.title, window.location.pathname)
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000)
    }
  }, [])

  useEffect(() => {
    fetchClaims()
  }, [])

  async function fetchClaims() {
    try {
      const response = await fetch('/api/claims')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch claims')
      }

      setClaims(data.claims || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch claims')
    } finally {
      setLoading(false)
    }
  }

  async function updateClaimStatus(
    claimId: string,
    newStatus: Claim['status']
  ) {
    try {
      const response = await fetch(`/api/claims/${claimId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })

      if (!response.ok) {
        throw new Error('Failed to update status')
      }

      // Refresh claims list
      fetchClaims()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status')
    }
  }

  async function deleteClaim(claimId: string) {
    if (
      !confirm(
        'Are you sure you want to delete this claim? This action cannot be undone.'
      )
    ) {
      return
    }

    try {
      const response = await fetch(`/api/claims/${claimId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete claim')
      }

      // Refresh claims list
      fetchClaims()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete claim')
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  function truncateText(text: string, maxLength: number = 150) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Loading claims...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Your Claims
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Track and manage all your submitted claims
              </p>
            </div>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <a href="/claim/new">Create New Claim</a>
            </Button>
          </div>
          {claims.length > 0 && claims[0]?.id?.startsWith('demo-') && (
            <div className="mt-4 rounded-lg bg-blue-50 p-4 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
              <strong>Demo Mode:</strong> Claims are stored locally and will be
              lost when you refresh the page. Set up Supabase to persist your
              data permanently.
            </div>
          )}
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}
        {showSuccess && (
          <div className="mb-6 rounded-lg bg-green-50 p-4 text-green-700 dark:bg-green-900/20 dark:text-green-400">
            <strong>Success!</strong> Your claim has been submitted
            successfully.
          </div>
        )}

        {claims.length === 0 ? (
          <Card className="border-0 bg-white/50 shadow-lg backdrop-blur-sm dark:bg-gray-800/50">
            <CardContent className="p-8 text-center">
              <div className="mb-4 text-4xl">📋</div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                No claims yet
              </h3>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                Submit your first claim to get started
              </p>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <a href="/claim/new">Submit a Claim</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {claims.map(claim => {
              const statusInfo = statusConfig[claim.status]
              const StatusIcon = statusInfo.icon

              return (
                <Card
                  key={claim.id}
                  className="border-0 bg-white/50 shadow-lg backdrop-blur-sm dark:bg-gray-800/50"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <Badge className={statusInfo.color}>
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {statusInfo.label}
                          </Badge>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(claim.created_at)}
                          </span>
                        </div>
                        <CardTitle className="text-lg">
                          Claim #{claim.id.slice(-8)}
                        </CardTitle>
                        <CardDescription className="mt-2 text-base">
                          {truncateText(claim.narrative)}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {claim.files.length > 0 && (
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <IconDownload className="h-4 w-4" />
                            {claim.files.length} file
                            {claim.files.length !== 1 ? 's' : ''}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <select
                          value={claim.status}
                          onChange={e =>
                            updateClaimStatus(
                              claim.id,
                              e.target.value as Claim['status']
                            )
                          }
                          className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm dark:border-gray-600 dark:bg-gray-700"
                        >
                          <option value="pending">Pending</option>
                          <option value="solved">Solved</option>
                          <option value="opposed">Opposed</option>
                          <option value="closed">Closed</option>
                        </select>
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/claims/${claim.id}`}>
                            View Details
                            <IconArrowRight className="ml-1 h-3 w-3" />
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteClaim(claim.id)}
                          className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
