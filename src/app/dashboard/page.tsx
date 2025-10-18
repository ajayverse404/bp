import { getUser } from '@/lib/auth-helpers'
import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'
import Link from 'next/link'
import SignOutButton from './SignOutButton'

export default async function Dashboard() {
  const user = await getUser()

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <Link href="/" aria-label="Home">
                  <Logo className="h-8 w-auto" />
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <SignOutButton />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="rounded-lg bg-white p-6 shadow">
            <h1 className="text-2xl font-bold text-gray-900">Welcome to your Dashboard</h1>
            <p className="mt-2 text-gray-600">
              You are signed in as: <span className="font-medium">{user.email}</span>
            </p>
            <p className="mt-4 text-sm text-gray-500">
              This is a protected page that only authenticated users can access.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
