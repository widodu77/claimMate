'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  IconArrowRight,
  IconCheck,
  IconUsers,
  IconRefresh,
  IconMessage,
  IconDownload,
  IconExternalLink
} from '@/components/ui/icons'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              🤖 AI-Powered Claims Management Assistant
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              ClaimMate
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-300">
              Automate and streamline your entire claims lifecycle.
              <br />
              From document upload to payment tracking - let AI handle the heavy
              lifting.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Free Trial
                <IconArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-red-50 px-4 py-20 dark:bg-red-900/20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              The Claims Problem
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Managing claims is time-consuming and complex, especially for
              small businesses
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="border-0 bg-white/50 shadow-lg backdrop-blur-sm dark:bg-gray-800/50">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900">
                  <IconMessage className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <CardTitle>Time-Consuming</CardTitle>
                <CardDescription>
                  Hours spent gathering documents, filling forms, and following
                  up on claims
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/50 shadow-lg backdrop-blur-sm dark:bg-gray-800/50">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900">
                  <IconDownload className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <CardTitle>Document Overload</CardTitle>
                <CardDescription>
                  Managing multiple file formats, emails, and platform-specific
                  requirements
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/50 shadow-lg backdrop-blur-sm dark:bg-gray-800/50">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900">
                  <IconUsers className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <CardTitle>No Dedicated Team</CardTitle>
                <CardDescription>
                  Most small businesses can't afford a dedicated claims
                  department
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              The ClaimMate Solution
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              AI-powered automation for the entire claims lifecycle
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 bg-white/50 shadow-lg backdrop-blur-sm dark:bg-gray-800/50">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                  <IconDownload className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Smart Intake</CardTitle>
                <CardDescription>
                  Upload documents, emails, or photos via drag-and-drop or email
                  forwarding
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/50 shadow-lg backdrop-blur-sm dark:bg-gray-800/50">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                  <IconRefresh className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>AI Parsing</CardTitle>
                <CardDescription>
                  OCR and NLP extract structured info (claim numbers, amounts,
                  policy IDs)
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/50 shadow-lg backdrop-blur-sm dark:bg-gray-800/50">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
                  <IconMessage className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Auto Forms</CardTitle>
                <CardDescription>
                  Pre-filled forms for insurers and platforms (PDFs, JSON, XML)
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/50 shadow-lg backdrop-blur-sm dark:bg-gray-800/50">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900">
                  <IconExternalLink className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle>Smart Tracking</CardTitle>
                <CardDescription>
                  Automated follow-ups, status tracking, and appeal assistance
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Target Users Section */}
      <section className="bg-gray-50 px-4 py-20 dark:bg-gray-800 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Perfect For
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Small businesses and professionals who need efficient claims
              management
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 bg-white/50 shadow-lg backdrop-blur-sm dark:bg-gray-800/50">
              <CardHeader>
                <CardTitle>Healthcare Practitioners</CardTitle>
                <CardDescription>
                  Chiropractors, therapists, and independent healthcare
                  providers managing insurance claims
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/50 shadow-lg backdrop-blur-sm dark:bg-gray-800/50">
              <CardHeader>
                <CardTitle>E-commerce Merchants</CardTitle>
                <CardDescription>
                  Shopify, Amazon, and Etsy sellers handling returns, damage
                  claims, and shipping insurance
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/50 shadow-lg backdrop-blur-sm dark:bg-gray-800/50">
              <CardHeader>
                <CardTitle>Freelancers & SMBs</CardTitle>
                <CardDescription>
                  Professional liability, travel, equipment, and health-related
                  claims
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Simple Pricing
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Start free, scale as you grow
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <Card className="border-0 bg-white/50 shadow-lg backdrop-blur-sm dark:bg-gray-800/50">
              <CardHeader>
                <CardTitle className="text-center">Free</CardTitle>
                <div className="text-center">
                  <span className="text-3xl font-bold">$0</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    /month
                  </span>
                </div>
                <CardDescription className="text-center">
                  3 claims per month
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 border-2 border-blue-200 bg-blue-50 shadow-lg backdrop-blur-sm dark:border-blue-700 dark:bg-blue-900/20">
              <CardHeader>
                <CardTitle className="text-center">Starter</CardTitle>
                <div className="text-center">
                  <span className="text-3xl font-bold">$19</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    /month
                  </span>
                </div>
                <CardDescription className="text-center">
                  10 claims, email parsing, status tracking
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/50 shadow-lg backdrop-blur-sm dark:bg-gray-800/50">
              <CardHeader>
                <CardTitle className="text-center">Pro</CardTitle>
                <div className="text-center">
                  <span className="text-3xl font-bold">$49</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    /month
                  </span>
                </div>
                <CardDescription className="text-center">
                  50 claims, custom templates, integrations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/50 shadow-lg backdrop-blur-sm dark:bg-gray-800/50">
              <CardHeader>
                <CardTitle className="text-center">Enterprise</CardTitle>
                <div className="text-center">
                  <span className="text-3xl font-bold">$99+</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    /month
                  </span>
                </div>
                <CardDescription className="text-center">
                  Unlimited claims, white-labeled
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Ready to Transform Your Claims Process?
          </h2>
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
            Join thousands of businesses saving time and money with ClaimMate
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Start Your Free Trial
            <IconArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold">ClaimMate</h3>
              <p className="text-gray-400">
                AI-powered claims management that works for you.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>API</li>
                <li>Documentation</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Status</li>
                <li>Privacy</li>
                <li>Terms</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ClaimMate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
