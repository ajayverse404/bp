import { useCallback } from 'react'
import { event } from '@/lib/gtag'

/**
 * Custom hook for tracking analytics events
 * Provides convenient methods for common event types
 */
export function useAnalytics() {
  /**
   * Track button clicks
   */
  const trackButtonClick = useCallback((buttonName: string, location?: string) => {
    event({
      action: 'click',
      category: 'Button',
      label: location ? `${buttonName} - ${location}` : buttonName,
    })
  }, [])

  /**
   * Track form submissions
   */
  const trackFormSubmit = useCallback((formName: string, success: boolean = true) => {
    event({
      action: success ? 'submit_success' : 'submit_error',
      category: 'Form',
      label: formName,
    })
  }, [])

  /**
   * Track link clicks (external or internal)
   */
  const trackLinkClick = useCallback((linkUrl: string, linkText?: string) => {
    event({
      action: 'click',
      category: 'Link',
      label: linkText || linkUrl,
    })
  }, [])

  /**
   * Track enrollment actions
   */
  const trackEnrollment = useCallback((programLevel: string, step: string) => {
    event({
      action: step,
      category: 'Enrollment',
      label: programLevel,
    })
  }, [])

  /**
   * Track video plays
   */
  const trackVideoPlay = useCallback((videoTitle: string) => {
    event({
      action: 'play',
      category: 'Video',
      label: videoTitle,
    })
  }, [])

  /**
   * Track custom events
   */
  const trackCustomEvent = useCallback(
    (action: string, category: string, label?: string, value?: number) => {
      event({ action, category, label, value })
    },
    [],
  )

  return {
    trackButtonClick,
    trackFormSubmit,
    trackLinkClick,
    trackEnrollment,
    trackVideoPlay,
    trackCustomEvent,
  }
}
