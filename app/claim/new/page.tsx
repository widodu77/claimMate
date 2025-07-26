'use client'
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function NewClaimPage() {
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const form = e.currentTarget
    const narrative = (
      form.elements.namedItem('narrative') as HTMLTextAreaElement
    )?.value.trim()

    if (!narrative) {
      setError('Please describe your claim in the text box.')
      return
    }

    try {
      const formData = new FormData()
      formData.append('narrative', narrative)

      // Add files to form data
      files.forEach(file => {
        formData.append('files', file)
      })

      const response = await fetch('/api/claims', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit claim')
      }

      // Redirect to claims list with success parameter
      window.location.href = '/claims?submitted=true'
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit claim')
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      f => f.type.startsWith('image/') || f.type === 'application/pdf'
    )
    setFiles(prev => [...prev, ...droppedFiles])
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFiles(Array.from(e.target.files || []))
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white/80 p-10 shadow-2xl dark:border-gray-800 dark:bg-gray-900/80">
        <h1 className="mb-3 text-center text-3xl font-bold text-blue-600 dark:text-blue-400">
          Submit Your Claim
        </h1>
        <p className="mb-8 text-center text-lg text-gray-600 dark:text-gray-300">
          Describe your claim in your own words. You can include all relevant
          details, recipient info, amounts, dates, and anything else you think
          is important. We'll handle the rest with care and confidentiality.
        </p>
        <form className="space-y-8" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </div>
          )}
          <div>
            <Label
              htmlFor="narrative"
              className="text-base font-medium text-gray-800 dark:text-gray-200"
            >
              Claim Narrative
            </Label>
            <Textarea
              id="narrative"
              name="narrative"
              rows={8}
              placeholder="E.g. On March 5th, I shipped a package to John Doe (john@example.com, 555-123-4567) valued at $500. The package was damaged in transit. Please find attached the invoice and photos."
              className="resize-vertical mt-3 min-h-[120px] rounded-xl border border-gray-200 bg-white px-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-950 dark:focus:ring-blue-900"
              required
            />
            <div className="mt-2 text-base text-gray-400">
              Include all details: what happened, who is involved, amounts,
              dates, recipient info, etc.
            </div>
          </div>
          <div>
            <Label
              htmlFor="files"
              className="text-base font-medium text-gray-800 dark:text-gray-200"
            >
              Attach Documents{' '}
              <span className="font-normal text-gray-400">
                (optional, multiple allowed)
              </span>
            </Label>
            <div
              className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-200 bg-blue-50/40 px-4 py-8 transition hover:border-blue-400 dark:border-blue-900 dark:bg-blue-900/20"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <svg
                className="mb-2 h-10 w-10 text-blue-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16v-8m0 0l-4 4m4-4l4 4m-8 4h8a2 2 0 002-2V7a2 2 0 00-2-2H8a2 2 0 00-2 2v7a2 2 0 002 2z"
                />
              </svg>
              <span className="font-medium text-blue-600 dark:text-blue-300">
                Drag & drop or click to select files
              </span>
              <Input
                ref={fileInputRef}
                id="files"
                name="files"
                type="file"
                accept=".pdf,image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="mt-2 text-sm text-gray-400">
                PDF, JPG, PNG, etc. Max 10MB each. You can upload multiple
                files.
              </div>
            </div>
            {files.length > 0 && (
              <ul className="mt-4 list-inside list-disc text-base text-gray-600 dark:text-gray-300">
                {files.map(file => (
                  <li key={file.name}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>
          <Button
            type="submit"
            size="lg"
            className="mt-2 w-full rounded-lg bg-blue-600 py-3 text-lg font-semibold shadow hover:bg-blue-700"
          >
            Submit Claim
          </Button>
        </form>
      </div>
    </div>
  )
}
