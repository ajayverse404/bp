# Supabase Setup Guide for Binary Prototypes

This guide walks you through setting up Supabase authentication for your Binary Prototypes application.

## 🚀 Quick Start

### 1. Create Supabase Project

1. **Go to [https://supabase.com](https://supabase.com)**
2. **Sign up/Login** with your account
3. **Click "New Project"**
4. **Fill in project details:**
   - Organization: Select your organization
   - Name: `binaryprototypes-com`
   - Database Password: Generate a strong password
   - Region: Choose closest to your users
5. **Click "Create new project"**
6. **Wait for provisioning** (~2 minutes)

### 2. Get Your Credentials

1. **Go to Settings → API**
2. **Copy the following:**
   - Project URL
   - Anon/Public Key
3. **Update your `.env.local` file:**

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Configure Email Settings

1. **Go to Authentication → Settings**
2. **Enable email confirmations:**
   - ✅ Enable email confirmations
   - ✅ Enable email change confirmations
3. **Configure email templates:**
   - Go to Authentication → Email Templates
   - Customize each template (see `SUPABASE_EMAIL_TEMPLATES.md`)

### 4. Test Your Setup

1. **Start your development server:**
   ```bash
   pnpm dev
   ```
2. **Navigate to `/register`**
3. **Create a test account**
4. **Check your email for verification**
5. **Click the verification link**
6. **Try logging in at `/login`**
7. **Access the protected `/dashboard`**

## 🔧 Advanced Configuration

### Email Provider Setup

For production, consider setting up a custom email provider:

1. **Go to Authentication → Settings**
2. **Scroll to "SMTP Settings"**
3. **Configure your email provider:**
   - SendGrid
   - Mailgun
   - AWS SES
   - Or your preferred provider

### Security Settings

1. **Go to Authentication → Settings**
2. **Configure security options:**
   - Session timeout
   - Password requirements
   - Rate limiting
   - JWT settings

### Database Policies

1. **Go to Authentication → Policies**
2. **Set up Row Level Security (RLS)**
3. **Create policies for user data access**

## 📊 Monitoring & Analytics

### Authentication Analytics

1. **Go to Authentication → Users**
2. **View user registrations and activity**
3. **Monitor authentication metrics**

### Database Monitoring

1. **Go to Database → Logs**
2. **Monitor database performance**
3. **Check for any issues**

## 🚨 Troubleshooting

### Common Issues

**Issue: "Invalid API key"**
- ✅ Check your `.env.local` file
- ✅ Ensure keys are copied correctly
- ✅ Restart your development server

**Issue: "Email not sending"**
- ✅ Check Supabase email settings
- ✅ Verify email templates are configured
- ✅ Check spam folder

**Issue: "User not found"**
- ✅ Check if user is verified
- ✅ Verify email confirmation was completed
- ✅ Check authentication logs

### Debug Steps

1. **Check browser console for errors**
2. **Check Supabase logs in dashboard**
3. **Verify environment variables**
4. **Test with a fresh browser session**

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Authentication Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Email Templates Documentation](https://supabase.com/docs/guides/auth/auth-email-templates)

## 🔄 Next Steps

After basic setup is complete:

1. **Customize email templates** (see `SUPABASE_EMAIL_TEMPLATES.md`)
2. **Add Google Sign-In** (future enhancement)
3. **Implement password reset** (future enhancement)
4. **Add user profile management** (future enhancement)
5. **Set up production email provider**

## 📞 Support

If you encounter issues:

1. **Check Supabase documentation**
2. **Review this setup guide**
3. **Check the implementation plan** (`SUPABASE_INTEGRATION_PLAN.md`)
4. **Contact Supabase support if needed**
