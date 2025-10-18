import Link from 'next/link'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLink } from '@/components/NavLink'
import { MobileNavigation } from '@/components/MobileNavigation'
import { getUser } from '@/lib/auth-helpers'


export async function Header() {
  const user = await getUser()
  const isAuthenticated = !!user

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-md py-10">
      <Container>
        <nav className="relative z-[101] flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="#" aria-label="Home" className="flex items-center gap-x-2 sm:gap-x-3">
              <Logo className="h-10 w-auto" />
              <div className="block">
                <div className="text-xs sm:text-sm font-semibold text-slate-900">
                  Try Catch Robotics
                </div>
                <div className="text-[10px] sm:text-xs text-slate-600">by Binary Prototypes</div>
              </div>
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              <NavLink href="#first-cohort-pricing">Cohort Info</NavLink>
              <NavLink href="#testimonials">Testimonials</NavLink>
              <NavLink href="#faq">FAQs</NavLink>
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:block">
              {isAuthenticated ? (
                <NavLink href="/dashboard">Dashboard</NavLink>
              ) : (
                <span className="inline-block rounded-lg px-2 py-1 text-sm text-slate-500 cursor-not-allowed">
                  Sign in (Coming Soon)
                </span>
              )}
            </div>
            {!isAuthenticated && (
              <button 
                disabled 
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-slate-400 px-4 py-2 text-sm font-medium text-white cursor-not-allowed"
              >
                <span>
                  Get started <span className="hidden lg:inline">(Coming Soon)</span>
                </span>
              </button>
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
