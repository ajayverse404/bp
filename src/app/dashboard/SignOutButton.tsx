'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/Button'
import { signOut } from '@/lib/auth-helpers-client'

export default function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    setIsLoading(true)
    
    const { error } = await signOut()
    
    if (!error) {
      router.push('/login')
    }
    
    setIsLoading(false)
  }

  return (
    <Button 
      onClick={handleSignOut}
      variant="outline" 
      color="slate"
      disabled={isLoading}
    >
      {isLoading ? 'Signing out...' : 'Sign out'}
    </Button>
  )
}
