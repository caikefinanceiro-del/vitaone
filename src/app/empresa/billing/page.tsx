"use client";

export default function InsuranceBilling() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-xl">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Convênios & Faturamento</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Gestão de envios TISS/TUSS e sincronização com operadores.</p>
        </div>
        <div className="flex gap-md">
          <button className="font-label-md text-label-md text-primary border border-outline-variant bg-surface-container-lowest px-md py-sm rounded-lg hover:border-primary transition-colors flex items-center gap-base shadow-sm">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Exportar Log
          </button>
          <button className="font-label-md text-label-md text-white bg-primary px-md py-sm rounded-lg shadow-md hover:bg-primary/90 transition-colors flex items-center gap-base">
            <span className="material-symbols-outlined text-[18px]">publish</span>
            Novo Lote
          </button>
        </div>
      </div>

      {/* Bento Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {/* GL Integration */}
        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant/10 flex flex-col gap-sm">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-primary bg-primary/10 p-sm rounded-full">account_balance</span>
            <span className="font-label-sm text-label-sm text-primary bg-primary/10 px-sm py-xs rounded-full">Conectado</span>
          </div>
          <div>
            <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Integração Ledger</p>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mt-xs">Sincronização Ativa</h3>
          </div>
          <p className="font-body-sm text-[12px] text-on-surface-variant mt-auto flex items-center gap-xs">
            <span className="material-symbols-outlined text-[14px]">sync</span> Última sincronia: 12 min atrás
          </p>
        </div>

        {/* Eligibility */}
        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant/10 flex flex-col gap-sm">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-secondary bg-secondary/10 p-sm rounded-full">verified_user</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-variant px-sm py-xs rounded-full">Últimos 30 Dias</span>
          </div>
          <div>
            <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Taxa de Elegibilidade</p>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mt-xs">98.4%</h3>
          </div>
          <p className="font-body-sm text-[12px] text-primary mt-auto flex items-center gap-xs">
            <span className="material-symbols-outlined text-[14px]">trending_up</span> +1.2% em relação ao mês anterior
          </p>
        </div>

        {/* Denials */}
        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant/10 flex flex-col gap-sm border-l-4 border-error">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-error bg-error/10 p-sm rounded-full">warning</span>
            <button className="font-label-sm text-label-sm text-error hover:underline">Ver Todos</button>
          </div>
          <div>
            <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Glosas Ativas</p>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mt-xs">R$ 14.250,00</h3>
          </div>
          <p className="font-body-sm text-[12px] text-error mt-auto">
            12 guias requerem atenção imediata
          </p>
        </div>
      </div>

      {/* Batch Submission List */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 overflow-hidden flex flex-col">
        <div className="p-lg border-b border-outline-variant/30 flex justify-between items-center bg-surface-bright/50">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Rastreador de Envios (Lotes)</h3>
          <button className="font-label-md text-label-md text-primary flex items-center gap-xs hover:bg-primary/10 px-md py-sm rounded-lg transition-colors">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            Filtrar
          </button>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="font-label-md text-label-md text-on-surface-variant font-bold uppercase tracking-wider py-md px-lg border-b border-outline-variant/30">ID Lote</th>
                <th className="font-label-md text-label-md text-on-surface-variant font-bold uppercase tracking-wider py-md px-lg border-b border-outline-variant/30">Data Envio</th>
                <th className="font-label-md text-label-md text-on-surface-variant font-bold uppercase tracking-wider py-md px-lg border-b border-outline-variant/30">Operadora/Formato</th>
                <th className="font-label-md text-label-md text-on-surface-variant font-bold uppercase tracking-wider py-md px-lg border-b border-outline-variant/30 text-right">Guias</th>
                <th className="font-label-md text-label-md text-on-surface-variant font-bold uppercase tracking-wider py-md px-lg border-b border-outline-variant/30 text-right">Valor Total</th>
                <th className="font-label-md text-label-md text-on-surface-variant font-bold uppercase tracking-wider py-md px-lg border-b border-outline-variant/30">Status</th>
                <th className="font-label-md text-label-md text-on-surface-variant font-bold uppercase tracking-wider py-md px-lg border-b border-outline-variant/30 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 font-body-sm text-body-sm">
              {[
                { id: "#B-4921", date: "Out 24, 2023", op: "Bradesco Saúde (TISS)", guias: 145, val: "R$ 45.200,00", status: "Em Análise", color: "secondary" },
                { id: "#B-4920", date: "Out 22, 2023", op: "Amil (TISS)", guias: 82, val: "R$ 28.150,00", status: "Pago", color: "primary" },
                { id: "#B-4919", date: "Out 20, 2023", op: "SulAmérica (TUSS)", guias: 12, val: "R$ 8.400,00", status: "Negado", color: "error" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-surface-container-low/30 transition-colors group">
                  <td className="py-md px-lg font-bold text-on-surface">{row.id}</td>
                  <td className="py-md px-lg text-on-surface-variant">{row.date}</td>
                  <td className="py-md px-lg text-on-surface">{row.op}</td>
                  <td className="py-md px-lg text-right">{row.guias}</td>
                  <td className="py-md px-lg text-right font-medium text-primary">{row.val}</td>
                  <td className="py-md px-lg">
                    <span className={`font-label-sm text-label-sm text-${row.color} bg-${row.color}/10 px-sm py-xs rounded-full inline-flex items-center gap-xs`}>
                      <span className={`w-1.5 h-1.5 rounded-full bg-${row.color}`}></span> {row.status}
                    </span>
                  </td>
                  <td className="py-md px-lg text-center">
                    <button className="text-on-surface-variant hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lower Split: Denials & Eligibility */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        {/* Denial Management */}
        <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 p-lg flex flex-col">
          <div className="flex justify-between items-center mb-md border-b border-outline-variant/30 pb-sm">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Glosas Recentes</h3>
            <span className="font-label-sm text-label-sm text-error bg-error/10 px-sm py-xs rounded-full">Ação Necessária</span>
          </div>
          <div className="flex flex-col gap-sm">
            {[
              { code: "1014", val: "R$ 1.200,00", patient: "Maria S. Oliveira", msg: "Falta de autorização para procedimento TUSS específico." },
              { code: "1009", val: "R$ 850,00", patient: "Carlos E. Santos", msg: "Número de identificação do beneficiário inválido." },
            ].map((denial, i) => (
              <div key={i} className="p-sm rounded-lg border border-outline-variant/30 bg-surface flex flex-col gap-xs hover:border-primary/30 transition-colors">
                <div className="flex justify-between items-start">
                  <span className="font-label-md text-label-md text-secondary bg-secondary/10 px-sm py-xs rounded-md border border-secondary/20">Cód {denial.code}</span>
                  <span className="font-body-sm text-on-surface font-bold">{denial.val}</span>
                </div>
                <p className="font-body-sm text-on-surface">Paciente: <span className="font-medium">{denial.patient}</span></p>
                <p className="font-body-sm text-on-surface-variant flex gap-xs items-start italic">
                  <span className="material-symbols-outlined text-[16px] text-error mt-0.5">error</span>
                  {denial.msg}
                </p>
                <div className="mt-xs flex justify-end">
                  <button className="font-label-sm text-label-sm text-primary hover:underline font-bold">Revisar Guia</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Eligibility Logs */}
        <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 p-lg flex flex-col">
          <div className="flex justify-between items-center mb-md border-b border-outline-variant/30 pb-sm">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Logs de Elegibilidade</h3>
            <button className="font-label-sm text-label-sm text-primary flex items-center gap-xs hover:underline">
              <span className="material-symbols-outlined text-[16px]">refresh</span> Atualizar
            </button>
          </div>
          <div className="flex flex-col gap-sm">
            {[
              { name: "Ana B. Costa", op: "Amil", time: "10:45 AM", status: "Ativo", color: "primary" },
              { name: "João P. Lima", op: "SulAmérica", time: "09:30 AM", status: "Inativo", color: "error" },
              { name: "Fernanda M.", op: "Bradesco", time: "09:15 AM", status: "Ativo", color: "primary" },
            ].map((log, i) => (
              <div key={i} className="flex items-center justify-between p-sm border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/20 transition-colors rounded-lg">
                <div className="flex items-center gap-md">
                  <div className={`h-8 w-8 rounded-full bg-${log.color}/10 flex items-center justify-center shrink-0`}>
                    <span className={`material-symbols-outlined text-${log.color} text-[18px]`}>{log.color === 'primary' ? 'check_circle' : 'cancel'}</span>
                  </div>
                  <div>
                    <p className="font-body-sm text-on-surface font-bold">{log.name}</p>
                    <p className="font-label-sm text-on-surface-variant uppercase tracking-wider text-[10px]">{log.op} • {log.time}</p>
                  </div>
                </div>
                <span className={`font-label-sm text-label-sm text-${log.color} bg-${log.color}/10 px-sm py-xs rounded-full font-bold`}>{log.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}