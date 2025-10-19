'use client'

import { type Metadata } from 'next'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import { signIn, signInWithMagicLink, signInWithGoogle } from '@/lib/auth-helpers-client'

type AuthMethod = 'password' | 'magic-link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authMethod, setAuthMethod] = useState<AuthMethod>('password')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check for success message from password reset
    const successMessage = searchParams.get('message')
    if (successMessage) {
      setMessage(successMessage)
    }
  }, [searchParams])

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setMessage('')

    const { error: signInError } = await signIn(email, password)
    
    if (signInError) {
      setError(signInError)
    } else {
      router.push('/dashboard')
    }
    
    setIsLoading(false)
  }

  const handleMagicLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setMessage('')

    const { error: magicLinkError } = await signInWithMagicLink(email)
    
    if (magicLinkError) {
      setError(magicLinkError)
    } else {
      setMessage('Check your email for a magic link to sign in.')
    }
    
    setIsLoading(false)
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError('')
    setMessage('')

    const { error: googleError } = await signInWithGoogle()
    
    if (googleError) {
      setError(googleError)
      setIsLoading(false)
    }
    // Note: Google OAuth will redirect, so we don't need to handle success here
  }

  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" />
        </Link>
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        Sign in to your account
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Don't have an account?{' '}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:underline"
        >
          Enroll now
        </Link>{' '}
        to get started.
      </p>
      
      {message && (
        <div className="mt-4 rounded-md bg-green-50 p-4">
          <div className="text-sm text-green-700">{message}</div>
        </div>
      )}
      
      {error && (
        <div className="mt-4 rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      {/* Auth Method Toggle */}
      <div className="mt-6">
        <div className="flex rounded-lg bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => setAuthMethod('password')}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              authMethod === 'password'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Password
          </button>
          <button
            type="button"
            onClick={() => setAuthMethod('magic-link')}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              authMethod === 'magic-link'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Magic Link
          </button>
        </div>
      </div>

      {/* Password Form */}
      {authMethod === 'password' && (
        <form onSubmit={handlePasswordSubmit} className="mt-10 grid grid-cols-1 gap-y-8">
          <TextField
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <div>
            <Button 
              type="submit" 
              variant="solid" 
              color="blue" 
              className="w-full"
              disabled={isLoading}
            >
              <span>
                {isLoading ? 'Signing in...' : 'Sign in'} <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
        </form>
      )}

      {/* Magic Link Form */}
      {authMethod === 'magic-link' && (
        <form onSubmit={handleMagicLinkSubmit} className="mt-10 grid grid-cols-1 gap-y-8">
          <TextField
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            <Button 
              type="submit" 
              variant="solid" 
              color="blue" 
              className="w-full"
              disabled={isLoading}
            >
              <span>
                {isLoading ? 'Sending magic link...' : 'Send magic link'} <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
        </form>
      )}

      {/* Divider */}
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>
      </div>

      {/* Google Sign In */}
      <div className="mt-6">
        <Button
          type="button"
          onClick={handleGoogleSignIn}
          variant="outline"
          color="slate"
          className="w-full"
          disabled={isLoading}
        >
          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {isLoading ? 'Signing in...' : 'Sign in with Google'}
        </Button>
      </div>
    </SlimLayout>
  )
}
