/**
 * Google Analytics utility functions
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs/pages
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID

/**
 * Check if Google Analytics is enabled
 */
export const isGAEnabled = (): boolean => {
  return Boolean(GA_MEASUREMENT_ID) && typeof window !== 'undefined'
}

/**
 * Track page views
 * @param url - The URL to track
 */
export const pageview = (url: string): void => {
  if (!isGAEnabled()) return

  window.gtag('config', GA_MEASUREMENT_ID as string, {
    page_path: url,
  })
}

// Define event types for better type safety
type GTagEvent = {
  action: string
  category: string
  label?: string
  value?: number
}

/**
 * Track custom events
 * @param event - Event object with action, category, label, and value
 */
export const event = ({ action, category, label, value }: GTagEvent): void => {
  if (!isGAEnabled()) return

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

// Type declaration for gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: Record<string, unknown>,
    ) => void
    dataLayer: unknown[]
  }
}
