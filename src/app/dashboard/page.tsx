import { getUser } from '@/lib/auth-helpers'

export default async function Dashboard() {
  const user = await getUser()

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
