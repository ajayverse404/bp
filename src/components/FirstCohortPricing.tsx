import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

function CheckIcon({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      aria-hidden="true"
      className={clsx(
        'h-5 w-5 flex-none',
        className,
      )}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <circle
        cx="10"
        cy="10"
        r="9"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M6 10l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

function ShieldIcon({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      aria-hidden="true"
      className={clsx('h-6 w-6', className)}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.814 3.438 10.89 8.25 12.65.75.15 1.5.15 2.25 0 4.812-1.76 8.25-6.836 8.25-12.65 0-1.28-.22-2.52-.635-3.67a.75.75 0 0 0-.722-.515 11.209 11.209 0 0 1-7.877-3.08ZM15.75 9.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function PricingCard({
  name,
  originalPrice,
  currentPrice,
  description,
  features,
  featured = false,
}: {
  name: string
  originalPrice: string
  currentPrice: string
  description: string
  features: Array<string>
  featured?: boolean
}) {
  return (
    <div
      className={clsx(
        'relative rounded-2xl p-8 shadow-lg',
        featured
          ? 'bg-blue-600 text-white'
          : 'bg-white text-slate-900 border border-slate-200',
      )}
    >
      {/* Original Price */}
      <div className="absolute top-6 left-6">
        <span
          className={clsx(
            'text-sm line-through',
            featured ? 'text-white/70' : 'text-slate-400',
          )}
        >
          {originalPrice}
        </span>
      </div>

      {/* Discount Badge */}
      <div className="absolute top-6 right-6">
        <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
          60% OFF
        </span>
      </div>

      {/* Current Price */}
      <div className="mt-8">
        <div className="flex items-baseline">
          <span className="text-2xl font-medium">$</span>
          <span className="text-5xl font-bold">{currentPrice}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="mt-4 text-xl font-bold">{name}</h3>

      {/* Description */}
      <p
        className={clsx(
          'mt-2 text-sm',
          featured ? 'text-white/90' : 'text-slate-600',
        )}
      >
        {description}
      </p>

      {/* Features */}
      <ul className="mt-6 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start">
            <CheckIcon
              className={clsx(
                'mt-0.5 h-5 w-5 flex-shrink-0',
                featured ? 'text-white' : 'text-slate-400',
              )}
            />
            <span className="ml-3 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        disabled
        className={clsx(
          'mt-8 w-full inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium cursor-not-allowed',
          featured
            ? 'bg-slate-400 text-white'
            : 'bg-slate-400 text-white'
        )}
      >
        Get started (Coming Soon)
      </button>
    </div>
  )
}

export function FirstCohortPricing() {
  return (
    <section
      id="first-cohort-pricing"
      className="bg-slate-50 py-20 sm:py-32"
    >
      <Container>
        {/* Navigation Breadcrumb */}
        

        {/* Header */}
        <div className="text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Next Cohort Special Pricing
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Limited time offer for our 2026 Summer cohort! Get 60% off early signup pricing with full satisfaction guarantee - if you're not completely satisfied, get a full refund.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 grid max-w-4xl mx-auto grid-cols-1 gap-8 lg:grid-cols-2">
          <PricingCard
            name="Next Cohort - Early Bird"
            originalPrice="$200"
            currentPrice="120"
            description="Perfect introduction to robotics for beginners."
            features={[
              'Complete robotics kit included',
              '3-day intensive course',
              'All tutorial videos and resources',
              'Parent support materials',
              '60% early signup discount',
            ]}
          />
          <PricingCard
            name="Next Cohort - Kit Included"
            originalPrice="$400"
            currentPrice="240"
            description="Full robotics education with complete kit included."
            features={[
              'Complete robotics kit included',
              '3-day intensive course',
              'All tutorial videos and resources',
              'Mentorship and guidance',
              '60% early signup discount',
              'Full satisfaction guarantee',
            ]}
            featured
          />
        </div>

        {/* Satisfaction Guarantee */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="rounded-2xl bg-green-50 p-8 shadow-sm">
            <div className="flex items-center justify-center mb-4">
              <ShieldIcon className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="text-xl font-bold text-green-800">
                100% Satisfaction Guarantee
              </h3>
            </div>
            <div className="text-center space-y-3">
              <p className="text-green-700">
                We're confident you'll love our robotics program. If you're not completely satisfied with your experience, we'll provide a full refund - no questions asked.
              </p>
              <p className="text-green-700">
                Join our 2026 Summer cohort risk-free and discover the joy of robotics education.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
