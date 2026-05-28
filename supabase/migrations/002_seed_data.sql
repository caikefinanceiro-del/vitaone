-- Seed: Create demo clinic
INSERT INTO clinics (id, name, document, email, segment, plan) VALUES
  ('c0000000-0000-0000-0000-000000000001', 'Luxe Clinic', '12.345.678/0001-90', 'contato@luxeclinic.com.br', 'estetica', 'premium'),
  ('c0000000-0000-0000-0000-000000000002', 'Elite Aesthetics', '98.765.432/0001-10', 'contato@eliteaesthetics.com.br', 'dermatologia', 'pro');

-- Seed: Create demo patients
INSERT INTO patients (clinic_id, name, email, phone, document) VALUES
  ('c0000000-0000-0000-0000-000000000001', 'Ana Beatriz Costa', 'ana@email.com', '(11) 99999-0001', '123.456.789-00'),
  ('c0000000-0000-0000-0000-000000000001', 'Carlos Eduardo Lima', 'carlos@email.com', '(11) 99999-0002', '987.654.321-00'),
  ('c0000000-0000-0000-0000-000000000001', 'Mariana Silva Santos', 'mariana@email.com', '(11) 99999-0003', '456.789.123-00'),
  ('c0000000-0000-0000-0000-000000000001', 'Roberto Almeida Junior', 'roberto@email.com', '(11) 99999-0004', '789.123.456-00'),
  ('c0000000-0000-0000-0000-000000000002', 'Juliana Ferreira', 'juliana@email.com', '(21) 99999-0001', '321.654.987-00');

-- Seed: Create services
INSERT INTO services (clinic_id, name, description, price, duration_minutes, category) VALUES
  ('c0000000-0000-0000-0000-000000000001', 'Botox 100U', 'Aplicação de toxina botulínica', 1200.00, 30, 'injetaveis'),
  ('c0000000-0000-0000-0000-000000000001', 'Ácido Hialurônico', 'Preenchimento com ácido hialurônico', 1800.00, 45, 'injetaveis'),
  ('c0000000-0000-0000-0000-000000000001', 'Limpeza de Pele', 'Limpeza de pele profunda', 250.00, 60, 'estetica'),
  ('c0000000-0000-0000-0000-000000000001', 'Laser Facial', 'Tratamento a laser para rejuvenescimento', 800.00, 45, 'laser'),
  ('c0000000-0000-0000-0000-000000000002', 'Consulta Dermatológica', 'Avaliação dermatológica completa', 350.00, 60, 'consulta'),
  ('c0000000-0000-0000-0000-000000000002', 'Peeling Químico', 'Peeling para renovação celular', 600.00, 40, 'estetica');

-- Seed: Create suppliers
INSERT INTO suppliers (clinic_id, name, contact, email, phone, rating) VALUES
  ('c0000000-0000-0000-0000-000000000001', 'Allergan', 'João Silva', 'joao@allergan.com', '(11) 3333-0001', 5),
  ('c0000000-0000-0000-0000-000000000001', 'Juvederm', 'Maria Costa', 'maria@juvederm.com', '(11) 3333-0002', 4),
  ('c0000000-0000-0000-0000-000000000001', 'DermoSuprimentos', 'Carlos Lima', 'carlos@dermo.com.br', '(11) 3333-0003', 3);

-- Seed: Create inventory items
INSERT INTO inventory_items (clinic_id, supplier_id, name, description, category, quantity, min_quantity, unit_price, unit, batch, expiry_date) VALUES
  ('c0000000-0000-0000-0000-000000000001', (SELECT id FROM suppliers WHERE name = 'Allergan'), 'Botox 100U', 'Toxina botulínica 100 unidades', 'injetaveis', 2, 5, 450.00, 'un', 'B2024A', '2026-12-31'),
  ('c0000000-0000-0000-0000-000000000001', (SELECT id FROM suppliers WHERE name = 'Juvederm'), 'Ácido Hialurônico Voluma', 'Preenchedor 1ml', 'injetaveis', 5, 5, 320.00, 'un', 'J2024B', '2027-06-30'),
  ('c0000000-0000-0000-0000-000000000001', (SELECT id FROM suppliers WHERE name = 'DermoSuprimentos'), 'Lidocaína Creme', 'Anestésico tópico 30g', 'medicamentos', 12, 5, 35.00, 'un', 'L2024C', '2026-09-30');

-- Seed: Create feature flags
INSERT INTO feature_flags (plan, feature, enabled) VALUES
  ('essential', 'max_staff', true),
  ('essential', 'basic_reports', true),
  ('essential', 'whatsapp_notifications', true),
  ('pro', 'max_staff', true),
  ('pro', 'advanced_reports', true),
  ('pro', 'inventory_management', true),
  ('pro', 'crm', true),
  ('premium', 'max_staff', true),
  ('premium', 'advanced_reports', true),
  ('premium', 'inventory_management', true),
  ('premium', 'crm', true),
  ('premium', 'financial_forecasting', true),
  ('premium', 'facial_mapping', true),
  ('premium', 'api_integrations', true)
ON CONFLICT (plan, feature) DO NOTHING;
