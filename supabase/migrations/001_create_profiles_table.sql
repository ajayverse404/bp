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

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Parents can view linked students" ON profiles
  FOR SELECT USING (
    auth.uid() = user_id OR 
    (parent_id IS NOT NULL AND parent_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    ))
  );

CREATE POLICY "System can insert profiles" ON profiles
  FOR INSERT WITH CHECK (true);

-- RLS Policies for student_approvals
CREATE POLICY "Parents can view their approvals" ON student_approvals
  FOR SELECT USING (
    parent_profile_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Students can view their approval status" ON student_approvals
  FOR SELECT USING (
    student_profile_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "System can manage approvals" ON student_approvals
  FOR ALL USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers
CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_student_approvals_updated_at 
  BEFORE UPDATE ON student_approvals 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to auto-create profile on user signup
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
