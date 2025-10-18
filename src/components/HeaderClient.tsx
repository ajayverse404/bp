'use client'

import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { useAnalytics } from '@/hooks/useAnalytics'

interface HeaderClientProps {
  isAuthenticated: boolean
}

export function HeaderClient({ isAuthenticated }: HeaderClientProps) {
  const { trackLinkClick } = useAnalytics()

  const handleLogoClick = () => {
    trackLinkClick('/', 'Try Catch Robotics Logo - header')
  }

  return (
    <Link 
      href="#" 
      onClick={handleLogoClick}
      aria-label="Try Catch Robotics - Home" 
      className="flex items-center gap-x-2 sm:gap-x-3"
    >
      <Logo className="h-10 w-auto" />
      <div className="block">
        <div className="text-xs sm:text-sm font-semibold text-slate-900">
          Try Catch Robotics
        </div>
        <div className="text-[10px] sm:text-xs text-slate-600">by Binary Prototypes</div>
      </div>
    </Link>
  )
}
