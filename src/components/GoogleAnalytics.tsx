'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { GA_MEASUREMENT_ID, pageview } from '@/lib/gtag'

/**
 * Analytics tracking component
 * Tracks page views on route changes
 */
function AnalyticsTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!pathname) return

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    pageview(url)
  }, [pathname, searchParams])

  return null
}

/**
 * Google Analytics component
 * Handles GA initialization and page view tracking
 */
export function GoogleAnalytics() {
  // Only render scripts if GA_MEASUREMENT_ID is defined
  if (!GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
    </>
  )
}
