"use client";

export default function AdminMasterDashboard() {
  return (
    <div className="flex flex-col gap-xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Overview</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Métricas mestre e saúde do sistema para VitaOne.</p>
        </div>
        <button className="flex items-center gap-sm px-md py-sm border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-low transition-colors shadow-sm">
          <span className="material-symbols-outlined text-[18px]">download</span>
          Exportar Relatório
        </button>
      </div>

      {/* Bento Grid: KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
        {/* MRR Card */}
        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm ambient-shadow flex flex-col justify-between h-48 relative overflow-hidden group border border-outline-variant/10">
          <div className="flex justify-between items-start z-10 relative">
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Monthly Recurring Revenue</p>
              <h3 className="font-display-lg text-display-lg text-primary mt-sm">$1.24M</h3>
            </div>
            <div className="bg-primary-container/10 px-sm py-xs rounded-full flex items-center gap-xs text-primary-container">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span className="font-label-md text-label-md">12.4%</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-24 flex items-end gap-1 px-lg pb-md opacity-20 group-hover:opacity-40 transition-opacity">
            <div className="w-full h-[20%] bg-primary-container rounded-t-sm"></div>
            <div className="w-full h-[25%] bg-primary-container rounded-t-sm"></div>
            <div className="w-full h-[40%] bg-primary-container rounded-t-sm"></div>
            <div className="w-full h-[35%] bg-primary-container rounded-t-sm"></div>
            <div className="w-full h-[60%] bg-primary-container rounded-t-sm"></div>
            <div className="w-full h-[80%] bg-primary-container rounded-t-sm"></div>
            <div className="w-full h-[100%] bg-primary rounded-t-sm"></div>
          </div>
        </div>

        {/* Churn Card */}
        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm ambient-shadow flex flex-col justify-between h-48 relative overflow-hidden border border-outline-variant/10">
          <div className="flex justify-between items-start z-10">
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Clinic Churn Rate</p>
              <h3 className="font-display-lg text-display-lg text-on-surface mt-sm">0.8%</h3>
            </div>
            <div className="bg-primary-container/10 px-sm py-xs rounded-full flex items-center gap-xs text-primary-container">
              <span className="material-symbols-outlined text-[14px]">trending_down</span>
              <span className="font-label-md text-label-md">0.2%</span>
            </div>
          </div>
          <div className="w-full h-16 flex items-center relative mt-auto">
            <div className="absolute w-full h-px bg-outline-variant top-1/2 -translate-y-1/2 border-dashed border-b"></div>
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
              <path className="opacity-70" d="M0,20 Q25,30 50,15 T100,25" fill="none" stroke="#115e59" strokeWidth="2"></path>
            </svg>
          </div>
        </div>

        {/* Total Clinics Card */}
        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm ambient-shadow flex flex-col justify-between h-48 border border-outline-variant/10">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Active Clinics</p>
              <h3 className="font-display-lg text-display-lg text-on-surface mt-sm">842</h3>
            </div>
            <div className="w-10 h-10 bg-surface-container-low rounded-full flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined">domain</span>
            </div>
          </div>
          <div className="flex items-center gap-sm mt-auto">
            <div className="flex -space-x-3">
              <div className="w-8 h-8 rounded-full bg-tertiary-fixed border-2 border-surface-container-lowest flex items-center justify-center text-label-sm">C1</div>
              <div className="w-8 h-8 rounded-full bg-secondary-container border-2 border-surface-container-lowest flex items-center justify-center text-label-sm">C2</div>
              <div className="w-8 h-8 rounded-full bg-primary-fixed border-2 border-surface-container-lowest flex items-center justify-center text-label-sm">C3</div>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant ml-sm">+42 onboards essa semana</p>
          </div>
        </div>
      </div>

      {/* API & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant/10">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-lg">Volume de API e Transações</h3>
          <div className="flex gap-xl h-64">
            <div className="flex-1 flex flex-col">
              <p className="font-label-md text-on-surface-variant mb-sm">Stripe Volume ($4.2M)</p>
              <div className="flex-1 bg-surface-container-low rounded-lg p-sm flex items-end gap-1">
                <div className="w-full bg-primary-container/80 h-[85%] rounded-sm"></div>
                <div className="w-full bg-primary h-[100%] rounded-sm"></div>
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <p className="font-label-md text-on-surface-variant mb-sm">WhatsApp Msgs (1.2M)</p>
              <div className="flex-1 bg-surface-container-low rounded-lg p-sm flex items-end gap-1">
                <div className="w-full bg-secondary-container h-[65%] rounded-sm"></div>
                <div className="w-full bg-secondary h-[90%] rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant/10">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-lg">Atividade Recente</h3>
          <div className="flex flex-col gap-md">
            <div className="flex gap-md items-start">
              <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center shrink-0 mt-1 text-primary shadow-sm">
                <span className="material-symbols-outlined">rocket_launch</span>
              </div>
              <div>
                <p className="font-body-sm text-on-surface"><span className="font-medium">Aesthetics Beverly Hills</span> upgrade Premium.</p>
                <p className="font-label-sm text-on-surface-variant">Há 2 horas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
