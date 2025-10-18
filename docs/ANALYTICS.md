# Google Analytics Setup Guide

This project uses Google Analytics 4 (GA4) for tracking user interactions and page views.

## Setup Instructions

### 1. Get Your Google Analytics Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property (or use an existing one)
3. Navigate to **Admin** → **Data Streams**
4. Select your web data stream (or create a new one)
5. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Add your Measurement ID to `.env.local`:
   ```bash
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

3. **Important**: Never commit `.env.local` to version control. It's already in `.gitignore`.

### 3. Deploy to Production

For production deployment (Vercel, Netlify, etc.), add the environment variable:

- **Variable Name**: `NEXT_PUBLIC_GA_ID`
- **Value**: Your production GA4 Measurement ID

## Usage

### Automatic Page View Tracking

Page views are automatically tracked when users navigate between pages. No additional code needed.

### Track Custom Events

Use the `useAnalytics` hook to track custom events:

```tsx
'use client'

import { useAnalytics } from '@/hooks/useAnalytics'

export function MyComponent() {
  const { trackButtonClick, trackFormSubmit, trackEnrollment } = useAnalytics()

  const handleEnroll = () => {
    trackEnrollment('Intermediate', 'click_enroll_button')
    // ... enrollment logic
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // ... form submission
    trackFormSubmit('enrollment_form', true)
  }

  return (
    <button onClick={() => trackButtonClick('Enroll Now', 'Hero Section')}>
      Enroll Now
    </button>
  )
}
```

### Available Tracking Methods

The `useAnalytics` hook provides:

- `trackButtonClick(buttonName, location?)` - Track button interactions
- `trackFormSubmit(formName, success)` - Track form submissions
- `trackLinkClick(linkUrl, linkText?)` - Track link clicks
- `trackEnrollment(programLevel, step)` - Track enrollment actions
- `trackVideoPlay(videoTitle)` - Track video plays
- `trackCustomEvent(action, category, label?, value?)` - Track custom events

### Direct Event Tracking

For more control, use the `gtag` utility functions:

```tsx
import { event } from '@/lib/gtag'

event({
  action: 'click',
  category: 'CTA',
  label: 'Header Enroll Button',
  value: 1,
})
```

## Development vs Production

### Development
- Analytics are **disabled by default** when `NEXT_PUBLIC_GA_ID` is not set
- This prevents dev traffic from polluting production analytics
- To test analytics in dev, create a separate GA4 property for development

### Production
- Always set `NEXT_PUBLIC_GA_ID` in production environment variables
- Use your production GA4 Measurement ID

## Privacy Considerations

1. **Cookie Consent**: Consider implementing a cookie consent banner before initializing GA
2. **IP Anonymization**: GA4 automatically anonymizes IP addresses
3. **GDPR Compliance**: Review GA4 data collection settings for GDPR compliance
4. **Data Retention**: Configure appropriate data retention settings in GA4

## Testing

### Verify Analytics is Working

1. **Development**:
   ```bash
   npm run dev
   ```
   - Open browser DevTools → Network tab
   - Look for requests to `google-analytics.com` or `googletagmanager.com`

2. **Real-time Reports**:
   - Go to GA4 → Reports → Realtime
   - Navigate around your site
   - See your activity in real-time

### Debug Mode

Enable GA4 debug mode in development:

```tsx
// Add to src/lib/gtag.ts
gtag('config', GA_MEASUREMENT_ID, {
  debug_mode: process.env.NODE_ENV === 'development',
})
```

## Troubleshooting

### Analytics Not Loading

1. Check `.env.local` exists with correct `NEXT_PUBLIC_GA_ID`
2. Verify the Measurement ID format: `G-XXXXXXXXXX`
3. Restart dev server after changing environment variables
4. Check browser console for errors

### Events Not Showing in GA4

- Events may take 24-48 hours to appear in standard reports
- Use **Realtime** reports for immediate verification
- Check DebugView in GA4 for detailed event debugging

## File Structure

```
src/
├── components/
│   └── GoogleAnalytics.tsx    # GA initialization component
├── lib/
│   └── gtag.ts                # GA utility functions
└── hooks/
    └── useAnalytics.ts        # Custom hook for event tracking
```

## Resources

- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Next.js Analytics Guide](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
- [GA4 Events Reference](https://developers.google.com/analytics/devguides/collection/ga4/events)
