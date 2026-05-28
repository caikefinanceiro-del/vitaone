export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export const ADMIN_NAV: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "dashboard" },
  { label: "Tenants", href: "/admin/tenants", icon: "business" },
  { label: "Planos", href: "/admin/plans", icon: "subscriptions" },
  { label: "Saúde do Sistema", href: "/admin/system-health", icon: "monitor_heart" },
  { label: "Revenue", href: "/admin/revenue", icon: "trending_up" },
  { label: "Usuários", href: "/admin/users", icon: "groups" },
];

export const EMPRESA_NAV: NavItem[] = [
  { label: "Dashboard", href: "/empresa/dashboard", icon: "dashboard" },
  { label: "Operações", href: "/empresa/operations", icon: "business_center" },
  { label: "Estoque", href: "/empresa/inventory", icon: "inventory_2" },
  { label: "Financeiro", href: "/empresa/financial", icon: "payments" },
  { label: "Convênios", href: "/empresa/billing", icon: "receipt_long" },
  { label: "Equipe", href: "/empresa/team", icon: "group" },
  { label: "Fornecedores", href: "/empresa/suppliers", icon: "local_shipping" },
  { label: "Integrações", href: "/empresa/integrations", icon: "integration_instructions" },
  { label: "CRM", href: "/empresa/crm", icon: "campaign" },
];

export const COLABORADOR_NAV: NavItem[] = [
  { label: "Agenda", href: "/colaborador/reception/agenda", icon: "calendar_month" },
  { label: "Fila de Espera", href: "/colaborador/reception/waiting", icon: "queue" },
  { label: "Cadastro", href: "/colaborador/reception/patients/new", icon: "person_add" },
  { label: "Checkout", href: "/colaborador/reception/checkout", icon: "shopping_cart" },
  { label: "Prontuário", href: "/colaborador/professional/clinical-record", icon: "clinical_notes" },
  { label: "Mapeamento Facial", href: "/colaborador/professional/facial-mapping", icon: "face" },
  { label: "Histórico", href: "/colaborador/professional/patient-history", icon: "history" },
  { label: "Pacientes", href: "/colaborador/professional/patient-records", icon: "patient_list" },
  { label: "Jornada Clínica", href: "/colaborador/professional/workday", icon: "stethoscope" },
];

export const CLIENTE_NAV: NavItem[] = [
  { label: "Minhas Consultas", href: "/cliente/appointments", icon: "calendar_month" },
  { label: "Pagamentos", href: "/cliente/payments", icon: "payments" },
  { label: "Histórico", href: "/cliente/history", icon: "history" },
];
