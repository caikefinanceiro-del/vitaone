-- Drop recursive policies on profiles that cause infinite recursion
DROP POLICY IF EXISTS "admin_master_all" ON profiles;
DROP POLICY IF EXISTS "users_read_own" ON profiles;

-- Allow users to read their own profile (needed for login flow)
CREATE POLICY "users_read_own" ON profiles FOR SELECT
  USING (auth.uid() = id);
