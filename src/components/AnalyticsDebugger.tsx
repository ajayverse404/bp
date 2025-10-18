'use client'

import { useEffect, useState } from 'react'
import { isGAEnabled, GA_MEASUREMENT_ID } from '@/lib/gtag'

/**
 * Analytics Debugger Component
 * Shows Google Analytics status and tracks events in development
 */
export function AnalyticsDebugger() {
  const [isEnabled, setIsEnabled] = useState(false)
  const [measurementId, setMeasurementId] = useState<string | undefined>()
  const [events, setEvents] = useState<Array<{ timestamp: string; event: string }>>([])

  useEffect(() => {
    setIsEnabled(isGAEnabled())
    setMeasurementId(GA_MEASUREMENT_ID)

    // Listen for gtag events in development
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      const originalGtag = window.gtag
      window.gtag = (...args: any[]) => {
        const timestamp = new Date().toLocaleTimeString()
        const event = Array.prototype.join.call(args, ' ')
        setEvents(prev => [...prev.slice(-9), { timestamp, event }])
        return originalGtag.apply(window, args as any)
      }
    }
  }, [])

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg shadow-lg max-w-sm text-xs z-50">
      <h3 className="font-bold mb-2">🔍 Analytics Debug</h3>
      <div className="space-y-1">
        <div>
          <strong>Status:</strong> {isEnabled ? '✅ Enabled' : '❌ Disabled'}
        </div>
        <div>
          <strong>GA ID:</strong> {measurementId || 'Not set'}
        </div>
        {events.length > 0 && (
          <div>
            <strong>Recent Events:</strong>
            <div className="mt-1 max-h-32 overflow-y-auto">
              {events.map((event, index) => (
                <div key={index} className="text-xs opacity-75">
                  {event.timestamp}: {event.event}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
