import { Faqs } from '@/components/Faqs'
import { FirstCohortPricing } from '@/components/FirstCohortPricing'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Testimonials } from '@/components/Testimonials'

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <FirstCohortPricing />
        <Testimonials />
        {/* <Pricing /> */}
        <Faqs />
      </main>
      <Footer />
    </>
  )
}
