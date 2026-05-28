"use client";

export default function StaffPerformance() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-xl">
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Performance da Equipe</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Visão geral da produtividade do time e geração de receita.</p>
        </div>
        <div className="flex gap-md">
          <button className="px-md py-sm bg-surface-container-lowest border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface flex items-center gap-xs shadow-sm">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            Este Mês
            <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
        </div>
      </div>

      {/* Performance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant/10 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <span className="flex items-center text-primary bg-primary/10 px-2 py-1 rounded font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[14px] mr-1">arrow_upward</span> 12%
            </span>
          </div>
          <div>
            <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Receita Total</p>
            <h3 className="font-headline-lg text-headline-lg text-on-surface mt-xs">R$ 145.200</h3>
          </div>
        </div>
        
        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant/10 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined">calendar_clock</span>
            </div>
            <span className="flex items-center text-primary bg-primary/10 px-2 py-1 rounded font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[14px] mr-1">arrow_upward</span> 5%
            </span>
          </div>
          <div>
            <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Média Atend/Semana</p>
            <h3 className="font-headline-lg text-headline-lg text-on-surface mt-xs">42</h3>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant/10 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">mood</span>
            </div>
          </div>
          <div>
            <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">NPS Geral</p>
            <h3 className="font-headline-lg text-headline-lg text-on-surface mt-xs">94 <span className="text-body-sm font-normal text-on-surface-variant">/ 100</span></h3>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant/10 flex flex-col justify-between h-40 border-t-4 border-secondary">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary">person</span>
            </div>
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
          </div>
          <div>
            <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Destaque do Mês</p>
            <h3 className="font-headline-md text-headline-md text-on-surface mt-xs truncate">Dr. E. Thorne</h3>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant/10 h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-lg">
            <h3 className="font-headline-sm text-on-surface">Receita vs. Horas Trabalhadas</h3>
          </div>
          <div className="flex-1 flex items-end justify-around gap-md pb-md border-b border-outline-variant/30">
            {[80, 65, 40, 90, 55].map((h, i) => (
              <div key={i} className="flex gap-1 items-end h-full w-12 group cursor-pointer">
                <div className="w-1/2 bg-primary-container rounded-t-sm transition-all group-hover:opacity-80" style={{ height: `${h}%` }}></div>
                <div className="w-1/2 bg-secondary/40 rounded-t-sm transition-all group-hover:opacity-80" style={{ height: `${h * 0.7}%` }}></div>
              </div>
            ))}
          </div>
          <div className="flex justify-around mt-sm font-label-sm text-on-surface-variant">
            <span>Thorne</span><span>Valdez</span><span>Chen</span><span>Miller</span><span>Bauer</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant/10 flex flex-col">
          <h3 className="font-headline-sm text-on-surface mb-lg">Distribuição de Serviços</h3>
          <div className="flex flex-col gap-lg">
            {[
              { label: "Injetáveis", p: 45, color: "bg-primary" },
              { label: "Lasers", p: 25, color: "bg-primary-container" },
              { label: "Consultas", p: 20, color: "bg-secondary" },
              { label: "Estética", p: 10, color: "bg-outline-variant" },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between font-label-sm mb-xs">
                  <span>{item.label}</span>
                  <span className="font-bold">{item.p}%</span>
                </div>
                <div className="w-full bg-surface-container-low rounded-full h-2">
                  <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.p}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Table Area */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 overflow-hidden">
        <div className="p-lg border-b border-outline-variant/30">
          <h3 className="font-headline-sm text-on-surface">Detalhamento por Profissional</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/30 border-b border-outline-variant/30">
                <th className="p-md font-label-md text-on-surface-variant uppercase tracking-wider">Profissional</th>
                <th className="p-md font-label-md text-on-surface-variant uppercase tracking-wider">Cargo</th>
                <th className="p-md font-label-md text-on-surface-variant uppercase tracking-wider text-right">Agendamentos</th>
                <th className="p-md font-label-md text-on-surface-variant uppercase tracking-wider text-right">Receita</th>
                <th className="p-md font-label-md text-on-surface-variant uppercase tracking-wider text-center">Rating</th>
                <th className="p-md font-label-md text-on-surface-variant uppercase tracking-wider text-center">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 text-body-sm">
              {[
                { name: "Dr. E. Thorne", role: "Dermatologista Chefe", appts: 112, rev: "R$ 42.500", rate: "4.9", initial: "ET", color: "bg-primary" },
                { name: "Maria Valdez", role: "Enfermeira Esteta", appts: 145, rev: "R$ 38.200", rate: "4.8", initial: "MV", color: "bg-secondary" },
                { name: "Dr. L. Chen", role: "Cirurgião Plástico", appts: 45, rev: "R$ 55.100", rate: "5.0", initial: "LC", color: "bg-surface-variant" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-surface-container-low/20 transition-colors">
                  <td className="p-md flex items-center gap-sm">
                    <div className={`w-8 h-8 rounded-full ${row.color} text-white flex items-center justify-center font-bold text-[10px]`}>{row.initial}</div>
                    <span className="font-bold text-on-surface">{row.name}</span>
                  </td>
                  <td className="p-md text-on-surface-variant">{row.role}</td>
                  <td className="p-md text-right font-medium">{row.appts}</td>
                  <td className="p-md text-right font-bold text-primary">{row.rev}</td>
                  <td className="p-md text-center">
                    <div className="flex items-center justify-center text-amber-500 gap-1 font-bold">
                      <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      {row.rate}
                    </div>
                  </td>
                  <td className="p-md text-center">
                    <button className="text-primary font-bold hover:underline">Ver Detalhes</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}