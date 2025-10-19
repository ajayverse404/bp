'use client'

import Link from 'next/link'
import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from '@headlessui/react'
import clsx from 'clsx'
import { useAnalytics } from '@/hooks/useAnalytics'

function MobileNavLink({
  href,
  children,
  analyticsLabel,
  analyticsLocation = 'mobile-menu',
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
    <PopoverButton 
      as={Link} 
      href={href} 
      onClick={handleClick}
      className="block w-full p-2 text-left hover:bg-slate-50 rounded-lg transition-colors duration-200"
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {children}
    </PopoverButton>
  )
}

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          'origin-center transition',
          open && 'scale-90 opacity-0',
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          'origin-center transition',
          !open && 'scale-90 opacity-0',
        )}
      />
    </svg>
  )
}

export function MobileNavigation({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <Popover>
      <PopoverButton
        className="relative z-10 flex h-8 w-8 items-center justify-center focus:not-data-focus:outline-hidden"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 bg-slate-300/50 duration-150 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in"
      />
      <PopoverPanel
        transition
        className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5 data-closed:scale-95 data-closed:opacity-0 data-enter:duration-150 data-enter:ease-out data-leave:duration-100 data-leave:ease-in"
      >
        <MobileNavLink 
          href="#first-cohort-pricing" 
          analyticsLabel="Robotics Cohort Information"
          analyticsLocation="mobile-menu"
        >
          Cohort Info
        </MobileNavLink>
        {/* <MobileNavLink 
          href="#testimonials" 
          analyticsLabel="Student Success Stories"
          analyticsLocation="mobile-menu"
        >
          Testimonials
        </MobileNavLink> */}
        <MobileNavLink 
          href="#faq" 
          analyticsLabel="Frequently Asked Questions"
          analyticsLocation="mobile-menu"
        >
          FAQs
        </MobileNavLink>
        <hr className="m-2 border-slate-300/40" />
        {isAuthenticated ? (
          <MobileNavLink 
            href="/dashboard" 
            analyticsLabel="Student Dashboard"
            analyticsLocation="mobile-menu"
          >
            Dashboard
          </MobileNavLink>
        ) : (
          <MobileNavLink 
            href="/login" 
            analyticsLabel="Sign In"
            analyticsLocation="mobile-menu"
          >
            Sign in
          </MobileNavLink>
        )}
      </PopoverPanel>
    </Popover>
  )
}
