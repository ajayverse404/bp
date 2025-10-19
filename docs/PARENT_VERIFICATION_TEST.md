# Parent Verification System - Testing Guide

## 🧪 How to Test the Parent Verification Flow

### Prerequisites
- Database migration has been run (see `supabase/migrations/001_create_profiles_table.sql`)
- Supabase project is configured
- Development server is running (`pnpm run dev`)

### Test Scenario: Parent Approves Student

#### Step 1: Register as a Parent
1. Go to `http://localhost:3000/register`
2. Select "Parent/Guardian" account type
3. Fill in:
   - Full name: "John Smith"
   - Email: "parent@example.com"
   - Password: "password123"
4. Click "Create account"
5. Check email and verify the parent account

#### Step 2: Register as a Student
1. Go to `http://localhost:3000/register`
2. Select "Student" account type
3. Fill in:
   - Full name: "Jane Smith"
   - Email: "student@example.com"
   - Parent email: "parent@example.com" (same as parent's email)
   - Password: "password123"
4. Click "Create account"
5. Student will be redirected to verification pending page

#### Step 3: Parent Approves Student
1. Log in as parent (`parent@example.com`)
2. Go to `http://localhost:3000/dashboard/parent`
3. You should see a pending approval request for "Jane Smith"
4. Click "Approve" button
5. Student is now approved and can access the dashboard

#### Step 4: Student Access
1. Log in as student (`student@example.com`)
2. Student should now be able to access `http://localhost:3000/dashboard`

## 🔍 What to Check

### Database Tables
Check these tables in Supabase Dashboard → Table Editor:

**profiles table:**
- Should have 2 records (parent and student)
- Parent: `account_type = 'parent'`, `is_verified = true`
- Student: `account_type = 'student'`, `is_verified = true` (after approval)

**student_approvals table:**
- Should have 1 record
- `status = 'approved'` (after parent approval)
- `parent_profile_id` links to parent's profile
- `student_profile_id` links to student's profile

### Middleware Protection
- Unverified users should be redirected to `/verification-pending`
- Only verified users can access `/dashboard`
- Students need both email verification AND parent approval

## 🚨 Troubleshooting

### Issue: Student can't access dashboard after approval
**Solution:** Check that both `profiles.is_verified = true` AND `student_approvals.status = 'approved'`

### Issue: Parent dashboard shows no pending requests
**Solution:** 
1. Check that student registration included correct parent email
2. Verify the `student_approvals` table has a record with `status = 'pending'`

### Issue: Database errors
**Solution:** 
1. Ensure migration script ran successfully
2. Check RLS policies are enabled
3. Verify foreign key relationships

## 📧 Email Notifications (Future Enhancement)

Currently, the system doesn't send automatic emails to parents. To add this:

1. Set up Supabase email templates
2. Create a function to send approval request emails
3. Trigger emails when student registers with parent email

## 🔧 Manual Testing Commands

You can also test directly in Supabase SQL Editor:

```sql
-- Check all profiles
SELECT * FROM profiles;

-- Check pending approvals
SELECT * FROM student_approvals WHERE status = 'pending';

-- Manually approve a student (for testing)
UPDATE student_approvals 
SET status = 'approved', responded_at = NOW() 
WHERE student_profile_id = 'student-profile-id';

-- Update student profile to verified
UPDATE profiles 
SET is_verified = true 
WHERE id = 'student-profile-id';
```
