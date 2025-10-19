# Google OAuth Setup Guide for Binary Prototypes

This guide walks you through setting up Google OAuth authentication for your Binary Prototypes application using Supabase.

## 🚀 Prerequisites

- Supabase project already set up (see `SUPABASE_SETUP_GUIDE.md`)
- Google Cloud Platform account
- Domain name for your application (for production)

## 📋 Step-by-Step Setup

### 1. Create Google Cloud Project

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Click "Select a project" → "New Project"**
3. **Fill in project details:**
   - Project name: `Binary Prototypes OAuth`
   - Organization: Select your organization (if applicable)
4. **Click "Create"**

### 2. Enable Google+ API

1. **In your Google Cloud project, go to "APIs & Services" → "Library"**
2. **Search for "Google+ API"**
3. **Click on it and press "Enable"**

### 3. Configure OAuth Consent Screen

1. **Go to "APIs & Services" → "OAuth consent screen"**
2. **Choose "External" user type (unless you have Google Workspace)**
3. **Fill in the required information:**
   - App name: `Binary Prototypes`
   - User support email: Your email
   - Developer contact information: Your email
4. **Click "Save and Continue"**
5. **Skip "Scopes" for now (click "Save and Continue")**
6. **Add test users (your email) if in testing mode**
7. **Review and submit**

### 4. Create OAuth 2.0 Credentials

1. **Go to "APIs & Services" → "Credentials"**
2. **Click "Create Credentials" → "OAuth 2.0 Client IDs"**
3. **Choose "Web application"**
4. **Fill in the details:**
   - Name: `Binary Prototypes Web Client`
   - Authorized JavaScript origins:
     - `http://localhost:3000` (for development)
     - `https://yourdomain.com` (for production)
   - Authorized redirect URIs:
     - `https://your-supabase-project.supabase.co/auth/v1/callback`
5. **Click "Create"**
6. **Copy the Client ID and Client Secret** (you'll need these for Supabase)

### 5. Configure Supabase

1. **Go to your Supabase Dashboard**
2. **Navigate to Authentication → Providers**
3. **Find "Google" and click the toggle to enable it**
4. **Fill in the credentials:**
   - Client ID: (from step 4)
   - Client Secret: (from step 4)
5. **Click "Save"**

### 6. Update Environment Variables

Add these to your `.env.local` file:

```bash
# Google OAuth (if needed for additional configuration)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**Note:** The main OAuth configuration is done in Supabase, but you might need these for additional features.

## 🔧 Testing Your Setup

### Development Testing

1. **Start your development server:**
   ```bash
   pnpm dev
   ```

2. **Navigate to `/login`**
3. **Click "Sign in with Google"**
4. **Complete the OAuth flow**
5. **Verify you're redirected to the dashboard**

### Production Testing

1. **Deploy your application**
2. **Update Google OAuth settings with production URLs:**
   - Authorized JavaScript origins: `https://yourdomain.com`
   - Authorized redirect URIs: `https://your-supabase-project.supabase.co/auth/v1/callback`
3. **Test the complete flow in production**

## 🛠️ Troubleshooting

### Common Issues

#### "Error 400: redirect_uri_mismatch"
- **Cause:** Redirect URI in Google Console doesn't match Supabase callback URL
- **Solution:** Ensure the redirect URI is exactly: `https://your-supabase-project.supabase.co/auth/v1/callback`

#### "This app isn't verified"
- **Cause:** OAuth consent screen is in testing mode
- **Solution:** 
  - Add test users in Google Console
  - Or submit for verification (for production apps)

#### "Access blocked: This app's request is invalid"
- **Cause:** Missing or incorrect OAuth consent screen configuration
- **Solution:** Complete all required fields in OAuth consent screen

#### "Invalid client" error
- **Cause:** Incorrect Client ID or Client Secret in Supabase
- **Solution:** Double-check credentials in Supabase Authentication → Providers

### Debug Steps

1. **Check Supabase logs:**
   - Go to Supabase Dashboard → Logs
   - Look for authentication errors

2. **Verify Google Console settings:**
   - Ensure all URLs match exactly
   - Check that APIs are enabled

3. **Test with different browsers:**
   - Clear browser cache and cookies
   - Try incognito/private mode

## 🔒 Security Best Practices

### Production Checklist

- [ ] Use HTTPS for all URLs
- [ ] Restrict OAuth consent screen to verified domains
- [ ] Regularly rotate Client Secret
- [ ] Monitor authentication logs
- [ ] Set up proper error handling
- [ ] Use environment variables for sensitive data

### Domain Verification

For production apps, consider verifying your domain in Google Console:

1. **Go to OAuth consent screen**
2. **Add your domain to "Authorized domains"**
3. **Complete domain verification process**

## 📚 Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Google Cloud Console](https://console.cloud.google.com/)

## 🆘 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review Supabase and Google Console logs
3. Ensure all URLs and credentials are correct
4. Test in development before deploying to production

---

## 📁 Related Files

- `src/app/(auth)/login/page.tsx` - Login page with Google OAuth button
- `src/app/auth/callback/route.ts` - OAuth callback handler
- `src/lib/auth-helpers-client.ts` - Google OAuth functions
- `docs/SUPABASE_SETUP_GUIDE.md` - Supabase setup guide
