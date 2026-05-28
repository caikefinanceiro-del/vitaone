-- Create clinics/tenants table
CREATE TABLE IF NOT EXISTS clinics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  document TEXT,
  email TEXT,
  segment TEXT,
  plan TEXT DEFAULT 'essential',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create profiles (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin_master', 'manager', 'reception', 'professional', 'client')),
  clinic_id UUID REFERENCES clinics(id) ON DELETE SET NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create services
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  duration_minutes INTEGER,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create patients
CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  document TEXT,
  birth_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create appointments
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  professional_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'paid', 'cancelled', 'completed', 'no_show')),
  deposit DECIMAL(10,2),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create suppliers
CREATE TABLE IF NOT EXISTS suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  contact TEXT,
  email TEXT,
  phone TEXT,
  rating INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create inventory_items
CREATE TABLE IF NOT EXISTS inventory_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  supplier_id UUID REFERENCES suppliers(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  quantity INTEGER DEFAULT 0,
  min_quantity INTEGER DEFAULT 5,
  unit_price DECIMAL(10,2),
  unit TEXT DEFAULT 'un',
  batch TEXT,
  expiry_date DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create billing records
CREATE TABLE IF NOT EXISTS billing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  total DECIMAL(10,2) NOT NULL,
  method TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'cancelled', 'refunded')),
  payment_date TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create financial records (daily revenue tracking)
CREATE TABLE IF NOT EXISTS financial_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  revenue DECIMAL(10,2) DEFAULT 0,
  pix DECIMAL(10,2) DEFAULT 0,
  card DECIMAL(10,2) DEFAULT 0,
  cash DECIMAL(10,2) DEFAULT 0,
  expenses DECIMAL(10,2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(clinic_id, date)
);

-- Create feature_flags (for plan_feature_factory)
CREATE TABLE IF NOT EXISTS feature_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan TEXT NOT NULL CHECK (plan IN ('essential', 'pro', 'premium')),
  feature TEXT NOT NULL,
  enabled BOOLEAN DEFAULT false,
  UNIQUE(plan, feature)
);

-- Enable Row Level Security
ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_records ENABLE ROW LEVEL SECURITY;

-- RLS Policies: admin_master can see all
CREATE POLICY "admin_master_all" ON clinics FOR ALL USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin_master')
);
CREATE POLICY "admin_master_all" ON profiles FOR ALL USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin_master')
);

-- RLS Policies: clinic members can see their own clinic data
CREATE POLICY "clinic_members_select" ON patients FOR SELECT USING (
  clinic_id IN (
    SELECT clinic_id FROM profiles WHERE id = auth.uid()
  )
);
CREATE POLICY "clinic_members_all" ON patients FOR ALL USING (
  clinic_id IN (
    SELECT clinic_id FROM profiles WHERE id = auth.uid()
  )
);

-- Apply same policy to appointments, services, inventory, billing, financial_records
CREATE POLICY "clinic_members_select" ON appointments FOR SELECT USING (
  clinic_id IN (SELECT clinic_id FROM profiles WHERE id = auth.uid())
);
CREATE POLICY "clinic_members_all" ON appointments FOR ALL USING (
  clinic_id IN (SELECT clinic_id FROM profiles WHERE id = auth.uid())
);

CREATE POLICY "clinic_members_select" ON services FOR SELECT USING (
  clinic_id IN (SELECT clinic_id FROM profiles WHERE id = auth.uid())
);
CREATE POLICY "clinic_members_all" ON services FOR ALL USING (
  clinic_id IN (SELECT clinic_id FROM profiles WHERE id = auth.uid())
);

CREATE POLICY "clinic_members_select" ON inventory_items FOR SELECT USING (
  clinic_id IN (SELECT clinic_id FROM profiles WHERE id = auth.uid())
);
CREATE POLICY "clinic_members_all" ON inventory_items FOR ALL USING (
  clinic_id IN (SELECT clinic_id FROM profiles WHERE id = auth.uid())
);

CREATE POLICY "clinic_members_select" ON billing FOR SELECT USING (
  clinic_id IN (SELECT clinic_id FROM profiles WHERE id = auth.uid())
);
CREATE POLICY "clinic_members_all" ON billing FOR ALL USING (
  clinic_id IN (SELECT clinic_id FROM profiles WHERE id = auth.uid())
);

CREATE POLICY "clinic_members_select" ON financial_records FOR SELECT USING (
  clinic_id IN (SELECT clinic_id FROM profiles WHERE id = auth.uid())
);
CREATE POLICY "clinic_members_all" ON financial_records FOR ALL USING (
  clinic_id IN (SELECT clinic_id FROM profiles WHERE id = auth.uid())
);

CREATE POLICY "clinic_members_select" ON suppliers FOR SELECT USING (
  clinic_id IN (SELECT clinic_id FROM profiles WHERE id = auth.uid())
);
CREATE POLICY "clinic_members_all" ON suppliers FOR ALL USING (
  clinic_id IN (SELECT clinic_id FROM profiles WHERE id = auth.uid())
);

-- Insert default feature flags
INSERT INTO feature_flags (plan, feature, enabled) VALUES
  ('essential', 'max_staff', true),
  ('essential', 'basic_reports', true),
  ('essential', 'whatsapp_notifications', true),
  ('essential', 'max_patients', true),
  ('pro', 'max_staff', true),
  ('pro', 'advanced_reports', true),
  ('pro', 'whatsapp_notifications', true),
  ('pro', 'inventory_management', true),
  ('pro', 'crm', true),
  ('pro', 'max_patients', true),
  ('premium', 'max_staff', true),
  ('premium', 'advanced_reports', true),
  ('premium', 'whatsapp_notifications', true),
  ('premium', 'inventory_management', true),
  ('premium', 'crm', true),
  ('premium', 'financial_forecasting', true),
  ('premium', 'facial_mapping', true),
  ('premium', 'max_patients', true),
  ('premium', 'api_integrations', true)
ON CONFLICT (plan, feature) DO NOTHING;
