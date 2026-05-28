"use client";

export default function RevenuePage() {
  const tiers = [
    { label: "Premium", percentage: 65, value: "R$ 92.6K", color: "bg-secondary" },
    { label: "Pro", percentage: 25, value: "R$ 35.6K", color: "bg-primary" },
    { label: "Essential", percentage: 10, value: "R$ 14.2K", color: "bg-outline-variant" },
  ];

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">Inteligência de Receita</h1>
          <p className="font-body-md text-on-surface-variant mt-xs text-body-lg">Métricas avançadas, previsões de crescimento e análise de saúde financeira.</p>
        </div>
        <div className="flex gap-sm">
          <select className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-md py-sm text-xs font-bold focus:border-primary outline-none text-on-surface shadow-sm">
            <option>Últimos 30 Dias</option>
            <option>Este Trimestre</option>
            <option>Ano Corrente (YTD)</option>
          </select>
          <button className="bg-surface-container-lowest border border-outline-variant/30 text-on-surface font-bold text-xs px-md py-sm rounded-lg hover:bg-surface-container-low transition-colors flex items-center gap-xs shadow-sm">
            <span className="material-symbols-outlined text-[18px]">download</span> Exportar Relatório
          </button>
        </div>
      </div>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
        {/* MRR Card */}
        <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/10">
          <div className="flex justify-between items-start mb-md">
            <h3 className="font-bold text-[11px] text-on-surface-variant uppercase tracking-widest">MRR Total</h3>
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
          </div>
          <div className="text-4xl font-bold text-on-surface mb-xs">R$ 142.5K</div>
          <div className="flex items-center gap-xs text-emerald-600 font-bold text-xs">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            <span>+12.4% vs mês anterior</span>
          </div>
        </div>

        {/* ARPU Card */}
        <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/10">
          <div className="flex justify-between items-start mb-md">
            <h3 className="font-bold text-[11px] text-on-surface-variant uppercase tracking-widest">Ticket Médio (ARPU)</h3>
            <span className="material-symbols-outlined text-primary">analytics</span>
          </div>
          <div className="text-4xl font-bold text-on-surface mb-xs">R$ 371,09</div>
          <div className="flex items-center gap-xs text-emerald-600 font-bold text-xs">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            <span>+4.2% (Upsell pro/premium)</span>
          </div>
        </div>

        {/* LTV Card */}
        <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/10">
          <div className="flex justify-between items-start mb-md">
            <h3 className="font-bold text-[11px] text-on-surface-variant uppercase tracking-widest">Lifetime Value (LTV)</h3>
            <span className="material-symbols-outlined text-primary">monetization_on</span>
          </div>
          <div className="text-4xl font-bold text-on-surface mb-xs">R$ 48.2K</div>
          <div className="flex items-center gap-xs text-on-surface-variant font-bold text-xs">
            <span className="material-symbols-outlined text-[16px]">horizontal_rule</span>
            <span>Estável em todos os tiers</span>
          </div>
        </div>

        {/* Churn Card */}
        <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/10">
          <div className="flex justify-between items-start mb-md">
            <h3 className="font-bold text-[11px] text-on-surface-variant uppercase tracking-widest">Churn Líquido</h3>
            <span className="material-symbols-outlined text-error">heart_broken</span>
          </div>
          <div className="text-4xl font-bold text-on-surface mb-xs">0.8%</div>
          <div className="flex items-center gap-xs text-emerald-600 font-bold text-xs">
            <span className="material-symbols-outlined text-[16px]">trending_down</span>
            <span>Abaixo da meta (1.5%)</span>
          </div>
        </div>
      </div>

      {/* Charts & Distribution Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
        {/* Forecast Chart (Spans 8) */}
        <div className="lg:col-span-8 bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/10 flex flex-col min-h-[400px]">
          <div className="flex justify-between items-center mb-xl">
            <div>
              <h2 className="font-bold text-on-surface">Crescimento de MRR & Previsão</h2>
              <p className="text-xs text-on-surface-variant mt-1">Realizado vs Projeção Baseada em Tendência</p>
            </div>
            <div className="flex gap-lg">
              <span className="flex items-center gap-xs text-[10px] font-bold text-on-surface-variant uppercase tracking-widest"><div className="w-3 h-3 bg-primary rounded-sm"></div> Realizado</span>
              <span className="flex items-center gap-xs text-[10px] font-bold text-on-surface-variant uppercase tracking-widest"><div className="w-3 h-3 bg-primary/20 border border-primary/40 border-dashed rounded-sm"></div> Projeção</span>
            </div>
          </div>
          
          <div className="flex-1 relative mt-md flex items-end gap-sm md:gap-lg pt-lg border-b border-outline-variant/20">
            {/* Y-Axis Simulation */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-0">
              {[150, 100, 50, 0].map((val) => (
                <div key={val} className="border-t border-outline-variant/10 w-full h-0 relative">
                  <span className="absolute -top-3 -left-10 text-[10px] font-bold text-outline-variant/60">{val}k</span>
                </div>
              ))}
            </div>
            {/* Bars Simulation */}
            {[40, 45, 42, 55, 60, 68].map((h, i) => (
              <div key={i} className="flex-1 bg-primary rounded-t-lg transition-all hover:opacity-80 group relative" style={{ height: `${h}%` }}>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-inverse-surface text-white text-[10px] font-bold py-1 px-2 rounded-md transition-all whitespace-nowrap shadow-lg">
                  Mês {i+1}: R$ {h}K
                </div>
              </div>
            ))}
            {/* Forecast Bars */}
            {[75, 82, 90].map((h, i) => (
              <div key={i} className="flex-1 bg-primary/10 border-t-2 border-x-2 border-primary/30 border-dashed rounded-t-lg transition-all hover:bg-primary/20" style={{ height: `${h}%` }}></div>
            ))}
          </div>
          <div className="flex justify-between mt-sm px-2">
            {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul*", "Ago*", "Set*"].map(m => (
              <span key={m} className="text-[10px] font-bold text-on-surface-variant uppercase">{m}</span>
            ))}
          </div>
        </div>

        {/* Revenue by Tier (Spans 4) */}
        <div className="lg:col-span-4 bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/10 flex flex-col">
          <h2 className="font-bold text-on-surface mb-lg">Receita por Tier</h2>
          <div className="flex-1 flex flex-col justify-center gap-xl">
            {tiers.map((tier, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-xs">
                  <span className="font-bold text-xs text-on-surface flex items-center gap-xs">
                    <div className={`w-2 h-2 rounded-full ${tier.color}`}></div>
                    {tier.label}
                  </span>
                  <span className="font-bold text-xs text-on-surface-variant">{tier.percentage}% ({tier.value})</span>
                </div>
                <div className="w-full bg-surface-container-low rounded-full h-2">
                  <div className={`${tier.color} h-2 rounded-full transition-all duration-1000`} style={{ width: `${tier.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-xl pt-lg border-t border-outline-variant/10">
            <div className="flex items-center gap-sm bg-primary/5 p-md rounded-xl">
              <span className="material-symbols-outlined text-primary text-[20px]">lightbulb</span>
              <p className="text-[11px] text-on-surface-variant italic leading-relaxed">
                A expansão do tier <span className="font-bold text-primary">Premium</span> representa 80% do novo MRR captado este mês.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
