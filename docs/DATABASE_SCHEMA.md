# Database Schema for Binary Prototypes

## Overview

This document outlines the database schema for the parent-first verification system with account types and student management.

## Tables

### 1. profiles

Stores user profile information with account types and verification status.

```sql
CREATE TABLE profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  account_type TEXT NOT NULL CHECK (account_type IN ('parent', 'student')),
  full_name TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  parent_id UUID REFERENCES profiles(id) ON DELETE SET NULL, -- For student accounts
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_account_type ON profiles(account_type);
CREATE INDEX idx_profiles_parent_id ON profiles(parent_id);
CREATE INDEX idx_profiles_is_verified ON profiles(is_verified);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Parents can view their linked student profiles
CREATE POLICY "Parents can view linked students" ON profiles
  FOR SELECT USING (
    auth.uid() = user_id OR 
    (parent_id IS NOT NULL AND parent_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    ))
  );

-- System can insert profiles (via triggers)
CREATE POLICY "System can insert profiles" ON profiles
  FOR INSERT WITH CHECK (true);
```

### 2. student_approvals

Tracks pending student account approvals by parents.

```sql
CREATE TABLE student_approvals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  parent_profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied')),
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  responded_at TIMESTAMP WITH TIME ZONE,
  parent_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_student_approvals_student ON student_approvals(student_profile_id);
CREATE INDEX idx_student_approvals_parent ON student_approvals(parent_profile_id);
CREATE INDEX idx_student_approvals_status ON student_approvals(status);

-- RLS Policies
ALTER TABLE student_approvals ENABLE ROW LEVEL SECURITY;

-- Parents can view their approval requests
CREATE POLICY "Parents can view their approvals" ON student_approvals
  FOR SELECT USING (
    parent_profile_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    )
  );

-- Students can view their approval status
CREATE POLICY "Students can view their approval status" ON student_approvals
  FOR SELECT USING (
    student_profile_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    )
  );

-- System can manage approvals
CREATE POLICY "System can manage approvals" ON student_approvals
  FOR ALL USING (true);
```

## Functions and Triggers

### 1. Update updated_at timestamp

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to profiles table
CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Apply to student_approvals table
CREATE TRIGGER update_student_approvals_updated_at 
  BEFORE UPDATE ON student_approvals 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 2. Auto-create profile on user signup

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, account_type, full_name, is_verified)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'account_type', 'parent'),
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    FALSE
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## Migration Script

```sql
-- Migration: 001_create_profiles_table.sql
-- Description: Create profiles and student_approvals tables with RLS policies

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  account_type TEXT NOT NULL CHECK (account_type IN ('parent', 'student')),
  full_name TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  parent_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create student_approvals table
CREATE TABLE IF NOT EXISTS student_approvals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  parent_profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied')),
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  responded_at TIMESTAMP WITH TIME ZONE,
  parent_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_account_type ON profiles(account_type);
CREATE INDEX IF NOT EXISTS idx_profiles_parent_id ON profiles(parent_id);
CREATE INDEX IF NOT EXISTS idx_profiles_is_verified ON profiles(is_verified);
CREATE INDEX IF NOT EXISTS idx_student_approvals_student ON student_approvals(student_profile_id);
CREATE INDEX IF NOT EXISTS idx_student_approvals_parent ON student_approvals(parent_profile_id);
CREATE INDEX IF NOT EXISTS idx_student_approvals_status ON student_approvals(status);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_approvals ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (see above for full policy definitions)
-- ... (policies would be included here)

-- Create functions and triggers (see above for full definitions)
-- ... (functions and triggers would be included here)
```

## Usage Examples

### Get user profile with account type
```sql
SELECT p.*, u.email 
FROM profiles p 
JOIN auth.users u ON p.user_id = u.id 
WHERE u.id = auth.uid();
```

### Get pending student approvals for a parent
```sql
SELECT sa.*, sp.full_name as student_name, sp.user_id as student_user_id
FROM student_approvals sa
JOIN profiles sp ON sa.student_profile_id = sp.id
WHERE sa.parent_profile_id = (
  SELECT id FROM profiles WHERE user_id = auth.uid()
)
AND sa.status = 'pending';
```

### Check if user is verified (email + parent approval if student)
```sql
SELECT 
  p.is_verified as email_verified,
  CASE 
    WHEN p.account_type = 'parent' THEN p.is_verified
    WHEN p.account_type = 'student' THEN (
      p.is_verified AND EXISTS (
        SELECT 1 FROM student_approvals sa 
        WHERE sa.student_profile_id = p.id 
        AND sa.status = 'approved'
      )
    )
    ELSE FALSE
  END as fully_verified
FROM profiles p 
WHERE p.user_id = auth.uid();
```
