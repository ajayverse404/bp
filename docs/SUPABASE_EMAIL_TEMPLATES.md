# Supabase Email Templates for Binary Prototypes

This document contains all the customized email templates for Binary Prototypes authentication flows.

## 📧 Template Overview

All templates are designed with:
- **Consistent Binary Prototypes branding**
- **Professional, clean design**
- **Mobile-responsive layout**
- **Clear call-to-action buttons**
- **Fallback text links**
- **Security-appropriate messaging**

## 🔧 How to Apply These Templates

1. **Go to your Supabase Dashboard**
2. **Navigate to Authentication → Email Templates**
3. **For each template:**
   - Click on the template name (Confirm Signup, Magic Link, etc.)
   - Replace the Subject with the provided subject
   - Replace the HTML Body with the provided HTML
   - **Important:** Keep the `{{ .ConfirmationURL }}` placeholder as-is
   - Click **Save**

---

## 1. Confirm Signup Template

**Subject:**
```
Welcome to Binary Prototypes - Confirm Your Account
```

**HTML Body:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #1f2937; font-size: 28px; margin-bottom: 10px;">Welcome to Binary Prototypes!</h1>
    <p style="color: #4b5563; font-size: 16px;">Your journey with innovation starts here.</p>
  </div>
  
  <div style="padding: 20px 0; border-top: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0; margin-bottom: 30px;">
    <p style="color: #374151; font-size: 16px; line-height: 1.5;">
      Thank you for registering with Binary Prototypes. To activate your account and start exploring, please confirm your email address by clicking the button below:
    </p>
    
    <div style="text-align: center; margin-top: 30px;">
      <a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 12px 25px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">Confirm Your Email</a>
    </div>
    
    <p style="color: #6b7280; font-size: 14px; text-align: center; margin-top: 20px;">
      If the button above doesn't work, you can also copy and paste the following link into your browser:
    </p>
    <p style="word-break: break-all; font-size: 14px; color: #2563eb; text-align: center;">
      <a href="{{ .ConfirmationURL }}" style="color: #2563eb; text-decoration: none;">{{ .ConfirmationURL }}</a>
    </p>
  </div>
  
  <div style="text-align: center; color: #9ca3af; font-size: 12px;">
    <p>&copy; 2024 Binary Prototypes. All rights reserved.</p>
    <p>If you did not sign up for Binary Prototypes, please ignore this email.</p>
  </div>
</div>
```

---

## 2. Magic Link Template

**Subject:**
```
Your Binary Prototypes Login Link
```

**HTML Body:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #1f2937; font-size: 28px; margin-bottom: 10px;">Sign in to Binary Prototypes</h1>
    <p style="color: #4b5563; font-size: 16px;">Quick and secure access to your account.</p>
  </div>
  
  <div style="padding: 20px 0; border-top: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0; margin-bottom: 30px;">
    <p style="color: #374151; font-size: 16px; line-height: 1.5;">
      You've requested a magic link to sign in to your Binary Prototypes account. Click the button below to securely log in:
    </p>
    
    <div style="text-align: center; margin-top: 30px;">
      <a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 12px 25px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">Sign In to Binary Prototypes</a>
    </div>
    
    <p style="color: #6b7280; font-size: 14px; text-align: center; margin-top: 20px;">
      This link is valid for a short period. If the button above doesn't work, you can also copy and paste the following link into your browser:
    </p>
    <p style="word-break: break-all; font-size: 14px; color: #2563eb; text-align: center;">
      <a href="{{ .ConfirmationURL }}" style="color: #2563eb; text-decoration: none;">{{ .ConfirmationURL }}</a>
    </p>
  </div>
  
  <div style="text-align: center; color: #9ca3af; font-size: 12px;">
    <p>&copy; 2024 Binary Prototypes. All rights reserved.</p>
    <p>If you did not request this, please ignore this email.</p>
  </div>
</div>
```

---

## 3. Change Email Address Template

**Subject:**
```
Confirm Your New Email for Binary Prototypes
```

**HTML Body:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #1f2937; font-size: 28px; margin-bottom: 10px;">Update Your Binary Prototypes Email</h1>
    <p style="color: #4b5563; font-size: 16px;">Confirm your email address change.</p>
  </div>
  
  <div style="padding: 20px 0; border-top: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0; margin-bottom: 30px;">
    <p style="color: #374151; font-size: 16px; line-height: 1.5;">
      You have requested to change your email address for your Binary Prototypes account. To confirm this change, please click the button below:
    </p>
    
    <div style="text-align: center; margin-top: 30px;">
      <a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 12px 25px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">Confirm Email Change</a>
    </div>
    
    <p style="color: #6b7280; font-size: 14px; text-align: center; margin-top: 20px;">
      If the button above doesn't work, you can also copy and paste the following link into your browser:
    </p>
    <p style="word-break: break-all; font-size: 14px; color: #2563eb; text-align: center;">
      <a href="{{ .ConfirmationURL }}" style="color: #2563eb; text-decoration: none;">{{ .ConfirmationURL }}</a>
    </p>
  </div>
  
  <div style="text-align: center; color: #9ca3af; font-size: 12px;">
    <p>&copy; 2024 Binary Prototypes. All rights reserved.</p>
    <p>If you did not request this change, please ignore this email.</p>
  </div>
</div>
```

---

## 4. Reset Password Template

**Subject:**
```
Reset Your Binary Prototypes Password
```

**HTML Body:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #1f2937; font-size: 28px; margin-bottom: 10px;">Reset Your Binary Prototypes Password</h1>
    <p style="color: #4b5563; font-size: 16px;">Securely regain access to your account.</p>
  </div>
  
  <div style="padding: 20px 0; border-top: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0; margin-bottom: 30px;">
    <p style="color: #374151; font-size: 16px; line-height: 1.5;">
      You have requested to reset your password for your Binary Prototypes account. To set a new password, please click the button below:
    </p>
    
    <div style="text-align: center; margin-top: 30px;">
      <a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 12px 25px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">Reset Password</a>
    </div>
    
    <p style="color: #6b7280; font-size: 14px; text-align: center; margin-top: 20px;">
      This link is valid for a short period. If the button above doesn't work, you can also copy and paste the following link into your browser:
    </p>
    <p style="word-break: break-all; font-size: 14px; color: #2563eb; text-align: center;">
      <a href="{{ .ConfirmationURL }}" style="color: #2563eb; text-decoration: none;">{{ .ConfirmationURL }}</a>
    </p>
  </div>
  
  <div style="text-align: center; color: #9ca3af; font-size: 12px;">
    <p>&copy; 2024 Binary Prototypes. All rights reserved.</p>
    <p>If you did not request a password reset, please ignore this email.</p>
  </div>
</div>
```

---

## 5. Reauthentication Template

**Subject:**
```
Verify Your Identity for Binary Prototypes
```

**HTML Body:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #1f2937; font-size: 28px; margin-bottom: 10px;">Verify Your Binary Prototypes Account</h1>
    <p style="color: #4b5563; font-size: 16px;">A security step to protect your account.</p>
  </div>
  
  <div style="padding: 20px 0; border-top: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0; margin-bottom: 30px;">
    <p style="color: #374151; font-size: 16px; line-height: 1.5;">
      For your security, we require you to reauthenticate your Binary Prototypes account. Please click the button below to verify your identity:
    </p>
    
    <div style="text-align: center; margin-top: 30px;">
      <a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 12px 25px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">Reauthenticate Account</a>
    </div>
    
    <p style="color: #6b7280; font-size: 14px; text-align: center; margin-top: 20px;">
      This link is valid for a short period. If the button above doesn't work, you can also copy and paste the following link into your browser:
    </p>
    <p style="word-break: break-all; font-size: 14px; color: #2563eb; text-align: center;">
      <a href="{{ .ConfirmationURL }}" style="color: #2563eb; text-decoration: none;">{{ .ConfirmationURL }}</a>
    </p>
  </div>
  
  <div style="text-align: center; color: #9ca3af; font-size: 12px;">
    <p>&copy; 2024 Binary Prototypes. All rights reserved.</p>
    <p>If you did not initiate this reauthentication, please ignore this email.</p>
  </div>
</div>
```

---

## 🔧 Important Notes

### Template Variables to Keep
Make sure these Supabase placeholders remain unchanged:
- `{{ .ConfirmationURL }}` - The actual confirmation link
- `{{ .Token }}` - Authentication token (if used)
- `{{ .SiteURL }}` - Your site URL (if used)

### Customization Options
- **Colors**: You can change the blue color (`#2563eb`) to match your brand
- **Logo**: Add your Binary Prototypes logo to the header section
- **Footer**: Customize the footer with your company information
- **Styling**: Adjust fonts, spacing, and layout as needed

### Testing
After applying these templates:
1. Test each email flow in your application
2. Check email rendering on different email clients
3. Verify all links work correctly
4. Ensure mobile responsiveness

---

## 📁 File Structure

```
docs/
├── SUPABASE_EMAIL_TEMPLATES.md (this file)
├── SUPABASE_SETUP_GUIDE.md
└── SUPABASE_INTEGRATION_PLAN.md
```
