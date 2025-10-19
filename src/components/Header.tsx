import Link from 'next/link'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLink } from '@/components/NavLink'
import { MobileNavigation } from '@/components/MobileNavigation'
import { getUser } from '@/lib/auth-helpers'
import { HeaderClient } from '@/components/HeaderClient'


export async function Header() {
  const user = await getUser()
  const isAuthenticated = !!user

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-md py-4">
      <Container>
        <nav className="relative z-[101] flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <HeaderClient isAuthenticated={isAuthenticated} />
            <div className="hidden md:flex md:gap-x-6">
              <NavLink 
                href="#first-cohort-pricing" 
                analyticsLabel="Robotics Cohort Information"
                analyticsLocation="header"
              >
                Cohort Info
              </NavLink>
              {/* <NavLink 
                href="#testimonials" 
                analyticsLabel="Student Success Stories"
                analyticsLocation="header"
              >
                Testimonials
              </NavLink> */}
              <NavLink 
                href="#faq" 
                analyticsLabel="Frequently Asked Questions"
                analyticsLocation="header"
              >
                FAQs
              </NavLink>
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:block">
              {isAuthenticated ? (
                <NavLink 
                  href="/dashboard" 
                  analyticsLabel="Student Dashboard"
                  analyticsLocation="header"
                >
                  Dashboard
                </NavLink>
              ) : <></>}
            </div>
            {!isAuthenticated && (
              <Button 
                href="/login"
                variant="solid"
                color="blue"
                className="px-4 py-2 text-sm font-medium"
              >
                Get started
              </Button>
            )}
            <div className="-mr-1 md:hidden">
              <MobileNavigation isAuthenticated={isAuthenticated} />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
