"use client";

export default function OperationsHub() {
  return (
    <div className="max-w-[1400px] mx-auto flex flex-col gap-xl">
      {/* Hero Banner (Text Only) */}
      <div 
        className="w-full h-[220px] rounded-2xl overflow-hidden mb-xl relative flex items-center bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 shadow-sm"
      >
        <div className="relative z-20 px-lg md:px-xl lg:px-2xl py-lg w-full">
          <div className="w-full max-w-4xl">
            <h1 className="font-display-lg text-display-lg text-primary mb-md leading-tight">Hub de Operações</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Diretório central para módulos operacionais, financeiros e controle da clínica. 
              Acesse todas as ferramentas administrativas em um único workspace seguro.
            </p>
          </div>
        </div>
        {/* Abstract Deco Element */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Operational Suite */}
      <section>
        <div className="flex items-center gap-sm mb-lg border-b border-surface-container-highest pb-sm">
          <span className="material-symbols-outlined text-primary-container text-[28px]">domain</span>
          <h2 className="font-headline-md text-headline-md text-on-surface">Suíte Operacional</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          <OperationCard 
            icon="inventory_2" 
            title="Estoque & Inventário" 
            description="Controle de insumos, produtos de revenda e gestão de níveis críticos."
            href="/empresa/inventory"
          />
          <OperationCard 
            icon="trending_up" 
            title="Performance da Equipe" 
            description="Métricas de profissionais, volumes de atendimento e feedback de pacientes."
            href="/empresa/team"
          />
          <OperationCard 
            icon="local_shipping" 
            title="Gestão de Fornecedores" 
            description="Contatos, ordens de compra e calendários de entrega de insumos."
            href="/empresa/suppliers"
          />
          <OperationCard 
            icon="settings_applications" 
            title="Configurações Financeiras" 
            description="Taxas, gateways de pagamento e integrações contábeis."
            href="/empresa/financial"
          />
        </div>
      </section>

      {/* Financial Insights */}
      <section>
        <div className="flex items-center gap-sm mb-lg border-b border-surface-container-highest pb-sm">
          <span className="material-symbols-outlined text-secondary text-[28px]">query_stats</span>
          <h2 className="font-headline-md text-headline-md text-on-surface">Insights Financeiros</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          <OperationCard 
            icon="monitoring" 
            title="Analytics de Receita" 
            description="Visão profunda dos fluxos de caixa diários, semanais e mensais."
            color="secondary"
          />
          <OperationCard 
            icon="receipt_long" 
            title="Histórico de Faturamento" 
            description="Logs completos de notas fiscais, reembolsos e ajustes."
            color="secondary"
          />
          <OperationCard 
            icon="account_balance" 
            title="Configuração de Payout" 
            description="Gestão de contas bancárias, calendários de repasse e comissões."
            color="secondary"
          />
        </div>
      </section>

      {/* Clinic Controls */}
      <section>
        <div className="flex items-center gap-sm mb-lg border-b border-surface-container-highest pb-sm">
          <span className="material-symbols-outlined text-tertiary text-[28px]">admin_panel_settings</span>
          <h2 className="font-headline-md text-headline-md text-on-surface">Controles da Clínica</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          <OperationCard 
            icon="shield_person" 
            title="Permissões do Time" 
            description="Controle de acesso baseado em cargos e privilégios no sistema."
            color="tertiary"
          />
          <OperationCard 
            icon="folder_shared" 
            title="Base de Pacientes" 
            description="Gestão global de prontuários, privacidade e exportação de dados."
            color="tertiary"
          />
          <OperationCard 
            icon="build_circle" 
            title="Configuração de Serviços" 
            description="Defina tratamentos, durações, preços e equipamentos necessários."
            color="tertiary"
          />
        </div>
      </section>
    </div>
  );
}

function OperationCard({ 
  icon, 
  title, 
  description, 
  href = "#", 
  color = "primary" 
}: { 
  icon: string; 
  title: string; 
  description: string; 
  href?: string;
  color?: "primary" | "secondary" | "tertiary"
}) {
  const colorClasses = {
    primary: "group-hover:bg-primary-container text-primary-container",
    secondary: "group-hover:bg-secondary-container text-secondary",
    tertiary: "group-hover:bg-tertiary-container text-on-surface-variant"
  };

  const bgClasses = {
    primary: "bg-surface-container",
    secondary: "bg-secondary-fixed",
    tertiary: "bg-surface-variant"
  };

  return (
    <div 
      onClick={() => href !== "#" && (window.location.href = href)}
      className="bg-surface-container-lowest rounded-xl p-lg shadow-sm hover:shadow-md transition-all duration-300 border border-outline-variant/10 hover:border-primary/20 cursor-pointer group flex flex-col min-h-[180px]"
    >
      <div className={`w-12 h-12 rounded-lg ${bgClasses[color]} flex items-center justify-center mb-md ${colorClasses[color]} group-hover:text-white transition-colors`}>
        <span className="material-symbols-outlined text-[24px]">{icon}</span>
      </div>
      <h3 className="font-headline-sm text-headline-sm text-on-surface mb-xs">{title}</h3>
      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-auto">{description}</p>
    </div>
  );
}