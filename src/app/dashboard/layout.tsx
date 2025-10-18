import { redirect } from 'next/navigation'
import { getUser } from '@/lib/auth-helpers'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  return <>{children}</>
}
