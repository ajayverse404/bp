# Google Analytics Quick Start Guide

## Overview

This project includes a production-ready Google Analytics 4 (GA4) implementation following Next.js and React best practices.

## Features

✅ **TypeScript Support** - Fully typed analytics utilities
✅ **Auto Page Tracking** - Tracks page views on route changes
✅ **Custom Event Tracking** - Easy-to-use hooks for custom events
✅ **Development Safe** - Automatically disabled when GA ID not set
✅ **Performance Optimized** - Lazy loaded with Next.js Script component
✅ **Privacy Focused** - Only loads when explicitly configured

## Quick Setup (5 minutes)

### Step 1: Get Your GA4 Measurement ID

1. Visit [Google Analytics](https://analytics.google.com/)
2. Admin → Data Streams → Your Web Stream
3. Copy Measurement ID (format: `G-XXXXXXXXXX`)

### Step 2: Add to Environment

Create `.env.local`:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your ID:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Step 3: Verify

```bash
npm run dev
```

Open DevTools → Network → Filter for "google"
You should see requests to Google Analytics

## File Structure

```
src/
├── components/
│   ├── GoogleAnalytics.tsx       # Main GA component (already in layout)
│   └── AnalyticsButton.tsx       # Example: Button with tracking
├── lib/
│   └── gtag.ts                   # Core GA utilities
└── hooks/
    └── useAnalytics.ts           # React hook for event tracking
```

## Usage Examples

### Track Button Clicks

```tsx
'use client'

import { useAnalytics } from '@/hooks/useAnalytics'

export function EnrollButton() {
  const { trackButtonClick } = useAnalytics()

  return (
    <button onClick={() => trackButtonClick('Enroll Now', 'Hero Section')}>
      Enroll Now
    </button>
  )
}
```

### Track Form Submissions

```tsx
'use client'

import { useAnalytics } from '@/hooks/useAnalytics'

export function ContactForm() {
  const { trackFormSubmit } = useAnalytics()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      await submitForm()
      trackFormSubmit('contact_form', true)
    } catch (error) {
      trackFormSubmit('contact_form', false)
    }
  }

  return <form onSubmit={handleSubmit}>...</form>
}
```

### Track Custom Events

```tsx
'use client'

import { useAnalytics } from '@/hooks/useAnalytics'

export function ProgramSelector() {
  const { trackEnrollment } = useAnalytics()

  const selectProgram = (level: string) => {
    trackEnrollment(level, 'program_selected')
  }

  return (
    <select onChange={(e) => selectProgram(e.target.value)}>
      <option value="beginner">Beginner</option>
      <option value="intermediate">Intermediate</option>
      <option value="advanced">Advanced</option>
    </select>
  )
}
```

## Available Tracking Methods

```typescript
const {
  trackButtonClick,       // (name, location?)
  trackFormSubmit,        // (formName, success)
  trackLinkClick,         // (url, text?)
  trackEnrollment,        // (programLevel, step)
  trackVideoPlay,         // (videoTitle)
  trackCustomEvent,       // (action, category, label?, value?)
} = useAnalytics()
```

## Deployment

### Vercel

1. Go to Project Settings → Environment Variables
2. Add: `NEXT_PUBLIC_GA_ID` = `G-XXXXXXXXXX`
3. Deploy

### Other Platforms

Add environment variable `NEXT_PUBLIC_GA_ID` in your platform's dashboard.

## Privacy & Compliance

- GA4 automatically anonymizes IP addresses
- Only loads when `NEXT_PUBLIC_GA_ID` is set
- No tracking in development by default
- Consider adding cookie consent banner for GDPR compliance

## Testing

### Development
```bash
# Without GA (default)
npm run dev

# With GA
echo "NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX" > .env.local
npm run dev
```

### Check Real-time Data
1. Go to GA4 → Reports → Realtime
2. Navigate your site
3. See events appear in real-time

## Troubleshooting

**Q: Analytics not loading?**
A: Check `.env.local` exists and contains `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`

**Q: Build failing?**
A: Run `npm run build` - should complete successfully without GA ID

**Q: Events not showing in GA4?**
A: Check Realtime reports (standard reports have 24-48hr delay)

**Q: How to disable in development?**
A: Remove `.env.local` or delete the `NEXT_PUBLIC_GA_ID` line

## Best Practices

✅ **Do**: Use separate GA properties for dev/staging/prod
✅ **Do**: Test in Realtime reports before deploying
✅ **Do**: Add meaningful event labels and categories
✅ **Do**: Keep `.env.local` in `.gitignore`

❌ **Don't**: Commit `.env.local` to git
❌ **Don't**: Use production GA ID in development
❌ **Don't**: Track sensitive user data

## Next Steps

1. Set up custom audiences in GA4
2. Configure conversion events
3. Add cookie consent banner (recommended)
4. Review data retention settings
5. Set up GA4 dashboards and reports

## Support

- [Full Documentation](./ANALYTICS.md)
- [GA4 Docs](https://developers.google.com/analytics/devguides/collection/ga4)
- [Next.js Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
