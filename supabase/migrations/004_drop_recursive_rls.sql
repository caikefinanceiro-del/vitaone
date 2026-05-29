-- Drop recursive policies on profiles that cause infinite recursion
DROP POLICY IF EXISTS "admin_master_all" ON profiles;

-- users_read_own was created in 003, keep it
