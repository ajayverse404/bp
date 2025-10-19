/**
 * Analytics Testing Utilities
 * Use these functions in browser console to test Google Analytics
 */

// Test if Google Analytics is loaded
export const testGALoaded = (): boolean => {
  if (typeof window === 'undefined') return false
  return typeof window.gtag === 'function'
}

// Test if dataLayer exists
export const testDataLayer = (): boolean => {
  if (typeof window === 'undefined') return false
  return Array.isArray(window.dataLayer)
}

// Manually trigger a test event
export const testAnalyticsEvent = (): void => {
  if (typeof window === 'undefined') return
  
  window.gtag('event', 'test_event', {
    event_category: 'Testing',
    event_label: 'Manual Test',
    value: 1
  })
  
  console.log('✅ Test event sent to Google Analytics')
}

// Check current page view
export const testPageView = (): void => {
  if (typeof window === 'undefined') return
  
  window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
    page_path: window.location.pathname,
  })
  
  console.log('✅ Page view sent to Google Analytics')
}

// Get all analytics info
export const getAnalyticsInfo = (): void => {
  console.log('🔍 Google Analytics Debug Info:')
  console.log('GA ID:', process.env.NEXT_PUBLIC_GA_ID)
  console.log('gtag function exists:', testGALoaded())
  console.log('dataLayer exists:', testDataLayer())
  console.log('dataLayer contents:', window.dataLayer)
  console.log('Current URL:', window.location.href)
}

// Make functions available globally in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).testAnalytics = {
    testGALoaded,
    testDataLayer,
    testAnalyticsEvent,
    testPageView,
    getAnalyticsInfo
  }
  
  console.log('🧪 Analytics testing functions available:')
  console.log('- testAnalytics.getAnalyticsInfo() - Get all analytics info')
  console.log('- testAnalytics.testAnalyticsEvent() - Send test event')
  console.log('- testAnalytics.testPageView() - Send test page view')
}
