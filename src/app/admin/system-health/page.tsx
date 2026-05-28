"use client";

export default function SystemHealthPage() {
  return (
    <div className="flex flex-col gap-xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-xl gap-md">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Saúde Global do Sistema</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Monitoramento em tempo real de todos os tenants e APIs conectadas.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-lg">
        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-surface-variant flex flex-col justify-between h-40">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">WhatsApp Twilio Vol</span>
          <div>
            <div className="font-headline-md text-headline-md text-on-surface">1,248.5k</div>
            <div className="text-primary font-label-md flex items-center gap-1">+8.4% <span className="material-symbols-outlined text-[14px]">trending_up</span></div>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-surface-variant flex flex-col justify-between h-40">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Stripe Volume</span>
          <div>
            <div className="font-headline-md text-headline-md text-on-surface">$482.1k</div>
            <div className="text-primary font-label-md flex items-center gap-1">+12.1% <span className="material-symbols-outlined text-[14px]">trending_up</span></div>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-surface-variant flex flex-col justify-between h-40">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Latência Global API</span>
          <div>
            <div className="font-headline-md text-headline-md text-on-surface">142ms</div>
            <div className="text-secondary font-label-md flex items-center gap-1">-2ms <span className="material-symbols-outlined text-[14px]">trending_down</span></div>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-surface-variant flex flex-col justify-between h-40">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Clínicas Ativas</span>
          <div>
            <div className="font-headline-md text-headline-md text-on-surface">342</div>
            <div className="text-on-surface-variant font-label-sm">Estável em 4 regiões</div>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant overflow-hidden">
        <div className="p-lg border-b border-surface-variant flex justify-between items-center bg-surface-bright">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Logs de Anomalias Recentes</h3>
          <button className="font-label-md text-label-md text-primary hover:bg-primary-container/20 px-4 py-2 rounded-lg transition-colors border border-primary/20">Ver Todos os Logs</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest border-b border-surface-variant font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                <th className="p-md font-medium">Timestamp</th>
                <th className="p-md font-medium">Serviço</th>
                <th className="p-md font-medium">ID do Tenant</th>
                <th className="p-md font-medium">Código do Evento</th>
                <th className="p-md font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-body-sm text-on-surface divide-y divide-surface-variant">
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="p-md text-on-surface-variant">Out 24, 14:32:01</td>
                <td className="p-md font-medium">Stripe_Webhook</td>
                <td className="p-md">t_aesthetics_lux</td>
                <td className="p-md font-mono text-xs bg-surface p-1 rounded border border-outline-variant/30">ERR_RATE_LIMIT</td>
                <td className="p-md"><span className="bg-error/10 text-error px-2 py-1 rounded-full font-label-sm">Falhou</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
