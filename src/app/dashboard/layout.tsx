import { redirect } from 'next/navigation'
import { getUser } from '@/lib/auth-helpers'
import { DashboardHeader } from '@/components/DashboardHeader'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <>
      <DashboardHeader />
      <main className="pt-20">
        {children}
      </main>
    </>
  )
}
