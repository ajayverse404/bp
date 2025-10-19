import { Faqs } from '@/components/Faqs'
import { FirstCohortPricing } from '@/components/FirstCohortPricing'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Testimonials } from '@/components/Testimonials'
import { getUser } from '@/lib/auth-helpers'

export default async function Home() {
  const user = await getUser()
  const isAuthenticated = !!user

  return (
    <>
      <Header />
      <main className="pt-24">
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <FirstCohortPricing isAuthenticated={isAuthenticated} />
        {/* <Testimonials /> */}
        {/* <Pricing /> */}
        <Faqs />
      </main>
      <Footer />
    </>
  )
}
