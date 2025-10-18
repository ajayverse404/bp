'use client'

import Link from 'next/link'
import { useAnalytics } from '@/hooks/useAnalytics'

export function NavLink({
  href,
  children,
  analyticsLabel,
  analyticsLocation = 'header',
}: {
  href: string
  children: React.ReactNode
  analyticsLabel?: string
  analyticsLocation?: string
}) {
  const { trackLinkClick } = useAnalytics()

  const handleClick = () => {
    const label = analyticsLabel || (typeof children === 'string' ? children : href)
    trackLinkClick(href, `${label} - ${analyticsLocation}`)
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors duration-200"
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {children}
    </Link>
  )
}
