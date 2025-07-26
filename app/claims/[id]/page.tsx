'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
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
  IconArrowLeft,
  IconDownload,
  IconClock,
  IconCheck,
  IconX,
  IconArchive,
  IconCalendar,
  IconFile,
  IconUser
} from '@/components/ui/icons'
import Link from 'next/link'

interface Claim {
  id: string
  created_at: string
  updated_at: string
  narrative: string
  status: 'pending' | 'solved' | 'opposed' | 'closed'
  files: string[]
  extracted_data?: any
  user_id?: string | null
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

export default function ClaimDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [claim, setClaim] = useState<Claim | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    fetchClaim()
  }, [params.id])

  async function fetchClaim() {
    try {
      const response = await fetch(`/api/claims/${params.id}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch claim')
      }

      setClaim(data.claim)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch claim')
    } finally {
      setLoading(false)
    }
  }

  async function updateClaimStatus(newStatus: Claim['status']) {
    if (!claim) return

    setUpdating(true)
    try {
      const response = await fetch(`/api/claims/${claim.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })

      if (!response.ok) {
        throw new Error('Failed to update status')
      }

      const data = await response.json()
      setClaim(data.claim)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status')
    } finally {
      setUpdating(false)
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  function getFileNameFromUrl(url: string) {
    try {
      const urlObj = new URL(url)
      const pathname = urlObj.pathname
      const filename = pathname.split('/').pop()
      return filename || 'Unknown file'
    } catch {
      return 'Unknown file'
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Loading claim...
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="mb-4"
            >
              <IconArrowLeft className="mr-2 h-4 w-4" />
              Back to Claims
            </Button>
          </div>
          <Card className="border-0 bg-white/50 shadow-lg backdrop-blur-sm dark:bg-gray-800/50">
            <CardContent className="p-8 text-center">
              <div className="mb-4 text-4xl">❌</div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Error Loading Claim
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{error}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!claim) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="mb-4"
            >
              <IconArrowLeft className="mr-2 h-4 w-4" />
              Back to Claims
            </Button>
          </div>
          <Card className="border-0 bg-white/50 shadow-lg backdrop-blur-sm dark:bg-gray-800/50">
            <CardContent className="p-8 text-center">
              <div className="mb-4 text-4xl">🔍</div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Claim Not Found
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                The claim you're looking for doesn't exist or has been removed.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const statusInfo = statusConfig[claim.status]
  const StatusIcon = statusInfo.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Sticky Message Bubble */}
      <Link
        href={`/claims/${claim.id}/timeline`}
        className="fixed right-8 top-20 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 shadow-lg transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        title="View Timeline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-8 w-8 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 17.25a12.08 12.08 0 01-3.375-2.1C3.042 13.356 2.25 12.03 2.25 10.5c0-3.728 4.272-6.75 9.75-6.75s9.75 3.022 9.75 6.75c0 1.53-.792 2.856-3 4.65a12.08 12.08 0 01-3.375 2.1c-.495.186-.99.342-1.5.45-.51-.108-1.005-.264-1.5-.45z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </Link>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="mb-4"
          >
            <IconArrowLeft className="mr-2 h-4 w-4" />
            Back to Claims
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Claim Details
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                ID: {claim.id}
              </p>
            </div>
            <Badge className={`${statusInfo.color} text-sm`}>
              <StatusIcon className="mr-1 h-3 w-3" />
              {statusInfo.label}
            </Badge>
          </div>
        </div>

        <div className="space-y-6">
          {/* Status Update Card */}
          <Card className="border-0 bg-white/50 shadow-lg backdrop-blur-sm dark:bg-gray-800/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <IconClock className="mr-2 h-5 w-5" />
                Update Status
              </CardTitle>
              <CardDescription>Change the status of this claim</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                {Object.entries(statusConfig).map(([status, config]) => {
                  const StatusIconComponent = config.icon
                  return (
                    <Button
                      key={status}
                      variant={claim.status === status ? 'default' : 'outline'}
                      size="sm"
                      onClick={() =>
                        updateClaimStatus(status as Claim['status'])
                      }
                      disabled={updating}
                      className={`${
                        claim.status === status
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : ''
                      }`}
                    >
                      <StatusIconComponent className="mr-1 h-3 w-3" />
                      {config.label}
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Claim Information */}
          <Card className="border-0 bg-white/50 shadow-lg backdrop-blur-sm dark:bg-gray-800/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <IconUser className="mr-2 h-5 w-5" />
                Claim Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Created
                  </label>
                  <div className="mt-1 flex items-center">
                    <IconCalendar className="mr-2 h-4 w-4 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">
                      {formatDate(claim.created_at)}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Last Updated
                  </label>
                  <div className="mt-1 flex items-center">
                    <IconCalendar className="mr-2 h-4 w-4 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">
                      {formatDate(claim.updated_at)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Extracted Information */}
          {claim.extracted_data && Object.keys(claim.extracted_data).length > 0 && (
            <Card className="border-0 bg-white/50 shadow-lg backdrop-blur-sm dark:bg-gray-800/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mr-2 h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                    />
                  </svg>
                  AI Extracted Information
                </CardTitle>
                <CardDescription>
                  Information automatically extracted from your claim using AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {claim.extracted_data.email && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Email
                      </label>
                      <p className="mt-1 text-gray-900 dark:text-white">
                        {claim.extracted_data.email}
                      </p>
                    </div>
                  )}
                  {claim.extracted_data.phone && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Phone
                      </label>
                      <p className="mt-1 text-gray-900 dark:text-white">
                        {claim.extracted_data.phone}
                      </p>
                    </div>
                  )}
                  {claim.extracted_data.refererPerson && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Referer Person
                      </label>
                      <p className="mt-1 text-gray-900 dark:text-white">
                        {claim.extracted_data.refererPerson}
                      </p>
                    </div>
                  )}
                  {claim.extracted_data.claimType && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Claim Type
                      </label>
                      <p className="mt-1 text-gray-900 dark:text-white">
                        {claim.extracted_data.claimType}
                      </p>
                    </div>
                  )}
                  {claim.extracted_data.amount && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Amount
                      </label>
                      <p className="mt-1 text-gray-900 dark:text-white">
                        {claim.extracted_data.amount}
                      </p>
                    </div>
                  )}
                  {claim.extracted_data.date && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Date
                      </label>
                      <p className="mt-1 text-gray-900 dark:text-white">
                        {claim.extracted_data.date}
                      </p>
                    </div>
                  )}
                  {claim.extracted_data.recipient && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Recipient
                      </label>
                      <p className="mt-1 text-gray-900 dark:text-white">
                        {claim.extracted_data.recipient}
                      </p>
                    </div>
                  )}
                  {claim.extracted_data.description && (
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Description
                      </label>
                      <p className="mt-1 text-gray-900 dark:text-white">
                        {claim.extracted_data.description}
                      </p>
                    </div>
                  )}
                  {claim.extracted_data.urgency && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Urgency
                      </label>
                      <Badge 
                        variant={claim.extracted_data.urgency === 'high' ? 'destructive' : 
                               claim.extracted_data.urgency === 'medium' ? 'default' : 'secondary'}
                        className="mt-1"
                      >
                        {claim.extracted_data.urgency}
                      </Badge>
                    </div>
                  )}
                  {claim.extracted_data.additionalInfo && (
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Additional Information
                      </label>
                      <p className="mt-1 text-gray-900 dark:text-white">
                        {claim.extracted_data.additionalInfo}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Narrative */}
          <Card className="border-0 bg-white/50 shadow-lg backdrop-blur-sm dark:bg-gray-800/50">
            <CardHeader>
              <CardTitle>Claim Narrative</CardTitle>
              <CardDescription>
                The detailed description of your claim
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p className="whitespace-pre-wrap text-gray-900 dark:text-white">
                  {claim.narrative}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Attached Files */}
          {claim.files && claim.files.length > 0 && (
            <Card className="border-0 bg-white/50 shadow-lg backdrop-blur-sm dark:bg-gray-800/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <IconFile className="mr-2 h-5 w-5" />
                  Attached Files
                </CardTitle>
                <CardDescription>
                  {claim.files.length} file{claim.files.length !== 1 ? 's' : ''}{' '}
                  attached to this claim
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {claim.files.map((file, index) => {
                    const fileName = getFileNameFromUrl(file)
                    const isImage = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(
                      fileName
                    )
                    const isPdf = /\.pdf$/i.test(fileName)

                    return (
                      <div
                        key={index}
                        className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <IconFile className="mr-2 h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {fileName}
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(file, '_blank')}
                          >
                            <IconDownload className="mr-1 h-3 w-3" />
                            Download
                          </Button>
                        </div>

                        {/* Document Preview */}
                        {isImage && (
                          <div className="mt-3">
                            <img
                              src={file}
                              alt={fileName}
                              className="h-auto max-w-full rounded-lg border border-gray-200 dark:border-gray-600"
                              style={{ maxHeight: '300px' }}
                            />
                          </div>
                        )}

                        {isPdf && (
                          <div className="mt-3">
                            <iframe
                              src={file}
                              className="h-96 w-full rounded-lg border border-gray-200 dark:border-gray-600"
                              title={fileName}
                            />
                          </div>
                        )}

                        {!isImage && !isPdf && (
                          <div className="mt-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Preview not available for this file type. Click
                              download to view.
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
