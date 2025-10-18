'use client'

import Link from 'next/link'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import SignOutButton from '@/app/dashboard/SignOutButton'

export function DashboardHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-md border-b border-gray-200">
      <Container>
        <nav className="relative z-[101] flex justify-between items-center py-4">
          <div className="flex items-center gap-x-8">
            <Link href="/" aria-label="Home" className="flex items-center gap-x-2 sm:gap-x-3">
              <Logo className="h-8 w-auto" />
              <div className="block">
                <div className="text-xs sm:text-sm font-semibold text-slate-900">
                  Try Catch Robotics
                </div>
                <div className="text-[10px] sm:text-xs text-slate-600">by Binary Prototypes</div>
              </div>
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              
              <Link
                href="/"
                className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              >
                Dashboard
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <SignOutButton />
          </div>
        </nav>
      </Container>
    </header>
  )
}
