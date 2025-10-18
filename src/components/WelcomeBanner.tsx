'use client'

import { useState, useEffect } from 'react'
import { updateUserMetadata, getCurrentUser } from '@/lib/auth-helpers-client'

export function WelcomeBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissing, setIsDismissing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkWelcomeStatus()
  }, [])

  const checkWelcomeStatus = async () => {
    try {
      const { user } = await getCurrentUser()
      
      if (user) {
        // Check if user has seen the welcome banner
        const hasSeenWelcome = user.user_metadata?.has_seen_welcome
        setIsVisible(!hasSeenWelcome)
      }
    } catch (error) {
      console.error('Error checking welcome status:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDismiss = async () => {
    setIsDismissing(true)
    
    try {
      // Update user metadata to mark welcome as seen
      await updateUserMetadata({
        has_seen_welcome: true,
        first_login_at: new Date().toISOString(),
      })
      
      // Hide banner with animation
      setTimeout(() => {
        setIsVisible(false)
      }, 300)
    } catch (error) {
      console.error('Error updating welcome status:', error)
      setIsDismissing(false)
    }
  }

  if (isLoading || !isVisible) {
    return null
  }

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 transition-all duration-300 ease-in-out ${
        isDismissing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
      role="banner"
      aria-label="Welcome message"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50" />
      
      <div className="relative px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Welcome icon */}
            <div className="flex-shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <svg
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                  />
                </svg>
              </div>
            </div>
            
            {/* Welcome message */}
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Welcome to Binary Prototypes! 🎉
              </h3>
              <p className="mt-1 text-sm text-blue-700">
                You're all set! Explore your dashboard and start building amazing things.
              </p>
            </div>
          </div>
          
          {/* Dismiss button */}
          <div className="flex-shrink-0">
            <button
              type="button"
              onClick={handleDismiss}
              disabled={isDismissing}
              className="inline-flex rounded-md bg-blue-100 p-1.5 text-blue-500 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Dismiss welcome message"
            >
              <span className="sr-only">Dismiss</span>
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Progress bar animation */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-blue-200">
        <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 animate-pulse" />
      </div>
    </div>
  )
}
