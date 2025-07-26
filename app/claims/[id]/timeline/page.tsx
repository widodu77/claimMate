'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  IconArrowLeft,
  IconSend,
  IconRobot,
  IconUser,
  IconClock,
  IconRefresh
} from '@/components/ui/icons'
import { TimelineMessage } from '@/lib/ai-message-generation'
import { detectActionIntent } from '@/lib/email-actions'

export default function ClaimTimelinePage() {
  const params = useParams()
  const router = useRouter()
  const [messages, setMessages] = useState<TimelineMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [claim, setClaim] = useState<any>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [botAskedHandle, setBotAskedHandle] = useState(false)
  const [userAcceptedHandle, setUserAcceptedHandle] = useState(false)
  const [executingAction, setExecutingAction] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchClaim()
    fetchTimeline()
  }, [params.id])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  async function fetchClaim() {
    try {
      const response = await fetch(`/api/claims/${params.id}`)
      const data = await response.json()
      if (response.ok) setClaim(data.claim)
    } catch {}
  }

  async function fetchTimeline() {
    try {
      setLoading(true)
      const response = await fetch(`/api/claims/${params.id}/timeline`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch timeline')
      }

      // Use the new API response format
      setMessages(data.chat || [])

      // If no messages exist yet, add the initial AI message
      if (data.chat && data.chat.length === 0) {
        await generateInitialMessage()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch timeline')
    } finally {
      setLoading(false)
    }
  }

  async function sendMessage() {
    if (!newMessage.trim()) return

    try {
      setSending(true)
      const userMsgContent = newMessage.trim()

      // Save user message to API
      const userResponse = await fetch(`/api/claims/${params.id}/timeline`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: 'user',
          content: userMsgContent
        })
      })

      if (!userResponse.ok) {
        throw new Error('Failed to save user message')
      }

      const userData = await userResponse.json()
      const userMessage = userData.message

      // Add user message to UI
      setMessages(prev => [...prev, userMessage])
      setNewMessage('')

      // Handle special responses
      const userMsg = userMsgContent.toLowerCase()
      if (botAskedHandle && (userMsg === 'yes' || userMsg.includes('handle'))) {
        setUserAcceptedHandle(true)

        // Save AI response about handling
        const aiResponse = await fetch(`/api/claims/${params.id}/timeline`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sender: 'ai',
            content:
              'Great! What would you like me to do next? I can:\n\n• Send emails to insurance companies\n• Follow up on your claim status\n• Contact relevant parties\n• Update claim information\n\nJust tell me what you need!'
          })
        })

        if (aiResponse.ok) {
          const aiData = await aiResponse.json()
          setMessages(prev => [...prev, aiData.message])
        }
        return
      }

      // Check if user is requesting an action (like sending an email)
      if (userAcceptedHandle && detectActionIntent(userMsgContent)) {
        await handleAction(userMsgContent)
        return
      }

      // Generate and save AI response
      setTimeout(async () => {
        let aiContent = `I understand your concern about "${userMsgContent}". Let me help you with that. I'll review the claim details and get back to you with an update.`

        // If user has accepted handling, provide more actionable responses
        if (userAcceptedHandle) {
          aiContent = `I understand you want me to "${userMsgContent}". Let me help you with that. Would you like me to send an email about this? Just say "send email" and I'll draft and send a professional message for you.`
        }

        const aiResponse = await fetch(`/api/claims/${params.id}/timeline`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sender: 'ai',
            content: aiContent
          })
        })

        if (aiResponse.ok) {
          const aiData = await aiResponse.json()
          setMessages(prev => [...prev, aiData.message])
        }
      }, 1000)
    } catch (err) {
      setError('Failed to send message')
    } finally {
      setSending(false)
    }
  }

  async function handleAction(userMessage: string) {
    try {
      setExecutingAction(true)

      // Add a "thinking" message
      const thinkingResponse = await fetch(
        `/api/claims/${params.id}/timeline`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sender: 'ai',
            content:
              "🤔 I'm working on that for you... Generating and sending the email now."
          })
        }
      )

      if (thinkingResponse.ok) {
        const thinkingData = await thinkingResponse.json()
        setMessages(prev => [...prev, thinkingData.message])
      }

      // Execute the action
      const actionResponse = await fetch(`/api/claims/${params.id}/actions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send_email',
          userMessage: userMessage,
          chatHistory: messages
        })
      })

      const actionData = await actionResponse.json()

      // Save the action result to chat
      const resultResponse = await fetch(`/api/claims/${params.id}/timeline`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: 'ai',
          content: actionData.message
        })
      })

      if (resultResponse.ok) {
        const resultData = await resultResponse.json()
        setMessages(prev => [...prev, resultData.message])
      }
    } catch (error) {
      console.error('Action error:', error)

      // Save error message to chat
      const errorResponse = await fetch(`/api/claims/${params.id}/timeline`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: 'ai',
          content:
            '❌ Sorry, I encountered an error while trying to execute that action. Please try again.'
        })
      })

      if (errorResponse.ok) {
        const errorData = await errorResponse.json()
        setMessages(prev => [...prev, errorData.message])
      }
    } finally {
      setExecutingAction(false)
    }
  }

  async function generateInitialMessage() {
    try {
      setSending(true)

      // Generate initial AI message
      const initialContent = `Hello! I'm here to help you with your claim. I can see the details and I'm ready to assist you. What would you like to know?`

      const response = await fetch(`/api/claims/${params.id}/timeline`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: 'ai',
          content: initialContent
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate initial message')
      }

      const data = await response.json()
      setMessages(prev => [...prev, data.message])

      // Add the handling question
      setTimeout(async () => {
        setBotAskedHandle(true)

        const handleResponse = await fetch(
          `/api/claims/${params.id}/timeline`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sender: 'ai',
              content:
                'Would you like me to handle this claim for you? I can send emails, update status, and more. Just say "yes" to get started!'
            })
          }
        )

        if (handleResponse.ok) {
          const handleData = await handleResponse.json()
          setMessages(prev => [...prev, handleData.message])
        }
      }, 800)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to generate message'
      )
    } finally {
      setSending(false)
    }
  }

  function formatTime(dateString: string) {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <IconClock className="mx-auto h-12 w-12 animate-spin text-blue-500" />
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Loading chat...
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-red-50 p-6 text-center dark:bg-red-900/20">
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <Button onClick={fetchTimeline} className="mt-4">
              <IconRefresh className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:px-8">
        {/* Main Chat Area */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="mb-4"
            >
              <IconArrowLeft className="mr-2 h-4 w-4" />
              Back to Claim Details
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Claim Chat
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Chat with AI about your claim
                </p>
              </div>
            </div>
          </div>
          {/* Chat Container */}
          <Card className="border-0 bg-white/50 shadow-lg backdrop-blur-sm dark:bg-gray-800/50">
            <CardContent className="p-0">
              {/* Messages */}
              <div className="h-[600px] overflow-y-auto p-6">
                {messages.length === 0 ? (
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <IconRobot className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                        No messages yet
                      </h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        Start a conversation with AI about your claim.
                      </p>
                      <Button
                        onClick={generateInitialMessage}
                        disabled={sending}
                        className="mt-4 bg-blue-600 hover:bg-blue-700"
                      >
                        <IconRobot className="mr-2 h-4 w-4" />
                        Start Chat
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => {
                      const isAI =
                        message.type === 'ai_generated' ||
                        message.type === 'system'
                      const isUser = message.type === 'user_sent'
                      return (
                        <div
                          key={message.id}
                          className={`flex ${
                            isUser ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`flex max-w-[80%] items-start space-x-2 ${
                              isUser ? 'flex-row-reverse space-x-reverse' : ''
                            }`}
                          >
                            {/* Avatar */}
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                isAI
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-green-500 text-white'
                              }`}
                            >
                              {isAI ? (
                                <IconRobot className="h-4 w-4" />
                              ) : (
                                <IconUser className="h-4 w-4" />
                              )}
                            </div>
                            {/* Message */}
                            <div
                              className={`rounded-lg px-4 py-2 ${
                                isAI
                                  ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                                  : 'bg-blue-500 text-white'
                              }`}
                            >
                              <div className="whitespace-pre-wrap text-sm">
                                {message.content}
                              </div>
                              <div
                                className={`mt-1 text-xs ${
                                  isAI
                                    ? 'text-gray-500 dark:text-gray-400'
                                    : 'text-blue-100'
                                }`}
                              >
                                {formatTime(message.timestamp)}
                              </div>
                              {/* If user accepted bot handle, show action buttons */}
                              {userAcceptedHandle &&
                                isAI &&
                                index === messages.length - 1 && (
                                  <div className="mt-3 flex gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="border-blue-300"
                                      onClick={() =>
                                        handleAction(
                                          'send email to follow up on my claim'
                                        )
                                      }
                                      disabled={executingAction}
                                    >
                                      Send Email
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="border-green-300"
                                      onClick={() =>
                                        handleAction(
                                          'send email to request claim status update'
                                        )
                                      }
                                      disabled={executingAction}
                                    >
                                      Follow Up
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="border-gray-300"
                                      onClick={() =>
                                        handleAction(
                                          'send email asking for more information about my claim'
                                        )
                                      }
                                      disabled={executingAction}
                                    >
                                      Request Info
                                    </Button>
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>
              {/* Message Input */}
              {messages.length > 0 && (
                <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                  <div className="flex space-x-2">
                    <Input
                      value={newMessage}
                      onChange={e => setNewMessage(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && sendMessage()}
                      placeholder={
                        userAcceptedHandle
                          ? 'Ask me to send emails, update status, or take other actions...'
                          : 'Type your message...'
                      }
                      className="flex-1"
                      disabled={sending || executingAction}
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={
                        !newMessage.trim() || sending || executingAction
                      }
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {executingAction ? (
                        <IconClock className="h-4 w-4 animate-spin" />
                      ) : (
                        <IconSend className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        {/* Sidebar: Claim Details */}
        <aside className="w-full flex-shrink-0 lg:w-[340px]">
          <Card className="bg-white/80 shadow-lg dark:bg-gray-800/80">
            <CardHeader>
              <CardTitle>Claim Details</CardTitle>
              <CardDescription>
                Key information about this claim
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {claim ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Type
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {claim.extracted_data?.claimType || 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Amount
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {claim.extracted_data?.amount || 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Date
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {claim.extracted_data?.date || 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Recipient
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {claim.extracted_data?.recipient || 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Status
                    </span>
                    <Badge className="capitalize">{claim.status}</Badge>
                  </div>
                  <button
                    className="mt-2 text-xs text-blue-600 hover:underline"
                    onClick={() => setShowDetails(v => !v)}
                  >
                    {showDetails ? 'Hide details' : 'Show more'}
                  </button>
                  {showDetails && (
                    <div className="mt-2 space-y-2 rounded-lg bg-gray-50 p-3 text-xs dark:bg-gray-900/40">
                      <div>
                        <span className="font-medium">Narrative:</span>
                        <div className="mt-1 whitespace-pre-wrap text-gray-700 dark:text-gray-200">
                          {claim.narrative}
                        </div>
                      </div>
                      {claim.extracted_data && (
                        <div>
                          <span className="font-medium">Extracted Info:</span>
                          <pre className="mt-1 whitespace-pre-wrap text-gray-700 dark:text-gray-200">
                            {JSON.stringify(claim.extracted_data, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-sm text-gray-400">
                  Loading claim details...
                </div>
              )}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}
