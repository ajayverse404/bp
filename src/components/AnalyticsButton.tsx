'use client'

import Link from 'next/link'
import { useAnalytics } from '@/hooks/useAnalytics'
import clsx from 'clsx'

/**
 * Example component showing how to integrate analytics tracking
 * This is a wrapper that provides analytics tracking for link-based buttons
 *
 * NOTE: For actual implementation, consider tracking directly in your
 * Button/Link components rather than creating wrappers
 */

const baseStyles = {
  solid:
    'group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2',
  outline:
    'group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm',
}

const variantStyles = {
  solid: {
    slate:
      'bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300',
    blue: 'bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100',
    white: 'bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600',
  },
  outline: {
    slate:
      'ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600',
    white:
      'ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400',
  },
}

interface AnalyticsButtonProps {
  href: string
  children: React.ReactNode
  variant?: 'solid' | 'outline'
  color?: 'blue' | 'white' | 'slate'
  className?: string
  analyticsLabel?: string
  analyticsLocation?: string
}

export function AnalyticsButton({
  href,
  children,
  variant = 'solid',
  color = 'slate',
  className,
  analyticsLabel,
  analyticsLocation,
}: AnalyticsButtonProps) {
  const { trackButtonClick } = useAnalytics()

  const handleClick = () => {
    // Track the button click with optional location context
    const label = analyticsLabel || (typeof children === 'string' ? children : 'Button')
    trackButtonClick(label, analyticsLocation)
  }

  const buttonClassName = clsx(
    baseStyles[variant],
    variant === 'outline'
      ? variantStyles.outline[color as keyof typeof variantStyles.outline]
      : variantStyles.solid[color as keyof typeof variantStyles.solid],
    className,
  )

  return (
    <Link href={href} className={buttonClassName} onClick={handleClick}>
      {children}
    </Link>
  )
}

/**
 * Usage example:
 *
 * <AnalyticsButton
 *   href="/register"
 *   color="blue"
 *   analyticsLabel="Enroll Now"
 *   analyticsLocation="Hero Section"
 * >
 *   Enroll Now
 * </AnalyticsButton>
 */
