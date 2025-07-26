import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { IconGitHub, IconSeparator } from '@/components/ui/icons'
import { ThemeToggle } from '@/components/theme-toggle'

export async function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            ClaimMate
          </span>
        </Link>
        <div className="ml-8 flex items-center">
          <IconSeparator className="h-6 w-6 text-muted-foreground/50" />
          <nav className="ml-4 flex items-center space-x-4">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/claims"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              My Claims
            </Link>
          </nav>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <ThemeToggle />
        <Button variant="outline" size="sm">
          Contact Sales
        </Button>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
          Start Free Trial
        </Button>
      </div>
    </header>
  )
}
