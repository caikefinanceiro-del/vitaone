"use client";

export default function PatientMarketingCRM() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-xl">
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Marketing & CRM de Pacientes</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Gerencie campanhas de ciclo de vida, rastreie conversões e automatize a retenção.</p>
        </div>
        <div className="flex gap-sm">
          <button className="px-4 py-2 border border-secondary text-secondary rounded-lg font-label-md text-label-md hover:bg-secondary/10 transition-colors">
            Exportar Relatório
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg font-label-md text-label-md hover:bg-primary/90 transition-colors shadow-md flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Nova Campanha
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Lead Conversion Funnel (Wide) */}
        <div className="col-span-12 bg-surface-container-lowest rounded-xl shadow-sm p-lg flex flex-col border border-outline-variant/10">
          <div className="flex justify-between items-center mb-md">
            <h3 className="font-headline-sm text-primary font-bold">Funil de Conversão de Leads</h3>
            <span className="font-label-sm text-on-surface-variant bg-surface-container-low py-1 px-3 rounded-full text-[11px] font-bold">Últimos 30 Dias</span>
          </div>
          <div className="flex-1 flex items-center justify-between relative mt-sm px-10">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-20 right-20 h-1 bg-surface-container-low -translate-y-1/2 z-0"></div>
            
            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center bg-surface-container-lowest px-4">
              <div className="w-16 h-16 rounded-full border-4 border-primary/20 bg-primary/5 flex items-center justify-center text-primary font-bold text-xl mb-3 shadow-sm">
                482
              </div>
              <span className="font-bold text-on-surface text-sm">Contatos</span>
              <span className="font-label-sm text-on-surface-variant mt-1 text-[11px]">Web & Social</span>
            </div>

            {/* Conversion 1 */}
            <div className="relative z-10 flex flex-col items-center bg-surface-container-lowest px-2 text-secondary font-bold">
              <span className="text-xs mb-1">42%</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center bg-surface-container-lowest px-4">
              <div className="w-16 h-16 rounded-full border-4 border-primary/20 bg-primary/5 flex items-center justify-center text-primary font-bold text-xl mb-3 shadow-sm">
                202
              </div>
              <span className="font-bold text-on-surface text-sm">Consultas</span>
              <span className="font-label-sm text-on-surface-variant mt-1 text-[11px]">Agendadas</span>
            </div>

            {/* Conversion 2 */}
            <div className="relative z-10 flex flex-col items-center bg-surface-container-lowest px-2 text-secondary font-bold">
              <span className="text-xs mb-1">68%</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center bg-surface-container-lowest px-4">
              <div className="w-16 h-16 rounded-full border-4 border-primary bg-primary text-white flex items-center justify-center font-bold text-xl mb-3 shadow-md">
                137
              </div>
              <span className="font-bold text-on-surface text-sm">Procedimentos</span>
              <span className="font-label-sm text-on-surface-variant mt-1 text-[11px]">Realizados</span>
            </div>
          </div>
        </div>

        {/* Automated Botox Recall */}
        <div className="col-span-12 md:col-span-8 bg-surface-container-lowest rounded-xl shadow-sm p-lg border border-outline-variant/10 flex flex-col">
          <div className="flex justify-between items-center mb-md">
            <div>
              <h3 className="font-headline-sm text-primary font-bold flex items-center gap-2">
                <span className="material-symbols-outlined">event_repeat</span>
                Recall Automático de Botox
              </h3>
              <p className="font-body-sm text-on-surface-variant mt-1">Pacientes que devem retornar nos próximos 14 dias.</p>
            </div>
            <button className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
              Ver Todos <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
          <div className="flex-1 overflow-x-auto mt-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/30">
                  <th className="pb-3 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Paciente</th>
                  <th className="pb-3 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Última Aplicação</th>
                  <th className="pb-3 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Valor Previsto</th>
                  <th className="pb-3 font-label-md text-on-surface-variant uppercase tracking-wider text-[11px] text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="text-body-sm">
                {[
                  { name: "Eleanor Vance", date: "12 Out, 2023", val: "R$ 450,00", status: "Pendente", initial: "EV" },
                  { name: "Sophia Sterling", date: "15 Out, 2023", val: "R$ 600,00", status: "Pendente", initial: "SS" },
                  { name: "Julianne Wright", date: "18 Out, 2023", val: "R$ 350,00", status: "Enviado", initial: "JW" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-outline-variant/10 hover:bg-surface-container-low/20 transition-colors">
                    <td className="py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">{row.initial}</div>
                      <span className="font-bold text-on-surface">{row.name}</span>
                    </td>
                    <td className="py-4 text-on-surface-variant">{row.date}</td>
                    <td className="py-4 font-bold text-primary">{row.val}</td>
                    <td className="py-4 text-right">
                      {row.status === "Pendente" ? (
                        <button className="px-3 py-1.5 bg-primary text-white rounded font-bold text-xs hover:bg-primary/90 transition-colors flex items-center gap-1 ml-auto">
                          <span className="material-symbols-outlined text-[16px]">chat</span> WhatsApp
                        </button>
                      ) : (
                        <span className="px-3 py-1.5 text-primary-container font-bold text-xs flex items-center justify-end gap-1">
                          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Enviado
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column Stack */}
        <div className="col-span-12 md:col-span-4 flex flex-col gap-gutter">
          {/* WhatsApp Integration Status */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm p-lg border border-outline-variant/10">
            <div className="flex items-center gap-sm mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">forum</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-on-surface font-bold">API do WhatsApp</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-[11px] text-on-surface-variant font-medium">Conectado (Twilio)</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="bg-surface-container-low/30 p-3 rounded-lg border border-outline-variant/30">
                <div className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Templates</div>
                <div className="text-xl font-bold text-on-surface">12</div>
              </div>
              <div className="bg-surface-container-low/30 p-3 rounded-lg border border-outline-variant/30">
                <div className="text-[10px] text-on-surface-variant uppercase font-bold mb-1">Msgs (Mês)</div>
                <div className="text-xl font-bold text-on-surface">1.402</div>
              </div>
            </div>
          </div>

          {/* Birthday Campaigns */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm p-lg border border-outline-variant/10 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-headline-sm text-secondary font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined">cake</span>
                  Aniversariantes
                </h3>
                <p className="text-[11px] text-on-surface-variant mt-1 font-medium italic">Ofertas automáticas de presente.</p>
              </div>
              <div className="w-10 h-5 bg-secondary/20 rounded-full relative p-0.5 cursor-pointer">
                <div className="w-4 h-4 bg-secondary rounded-full absolute right-0.5"></div>
              </div>
            </div>
            <div className="bg-secondary/5 rounded-lg p-4 mb-4 flex items-center justify-between border border-secondary/10">
              <div>
                <div className="text-[10px] text-secondary uppercase font-bold mb-1 tracking-wider">Próximos 7 dias</div>
                <div className="text-2xl font-bold text-on-surface">24 Pacientes</div>
              </div>
              <span className="material-symbols-outlined text-secondary text-4xl opacity-30">celebration</span>
            </div>
            <button className="mt-auto w-full py-2 border border-outline-variant/30 rounded-lg font-bold text-xs text-on-surface-variant hover:bg-surface-container-low transition-colors">
              Editar Template de Oferta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}