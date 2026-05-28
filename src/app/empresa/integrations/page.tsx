"use client";

export default function IntegrationsSetup() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-xl">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-md">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Integrações & Setup</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Gerencie serviços externos, automações e identidade visual da clínica.</p>
        </div>
        <div className="flex gap-sm">
          <button className="px-md py-sm rounded-lg border border-secondary text-secondary font-label-md text-label-md hover:bg-secondary/10 transition-colors">Descartar</button>
          <button className="px-md py-sm rounded-lg bg-primary text-white font-label-md text-label-md hover:bg-primary/90 transition-colors shadow-md">Salvar Alterações</button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Payment Setup (Stripe) - Span 7 */}
        <section className="md:col-span-7 bg-surface-container-lowest rounded-xl shadow-sm p-lg flex flex-col border border-outline-variant/10">
          <div className="flex justify-between items-center mb-lg">
            <div className="flex items-center gap-sm">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Configuração de Pagamento</h3>
            </div>
            <span className="inline-flex items-center gap-xs px-sm py-xs rounded-full bg-primary/10 text-primary font-label-sm text-label-sm">
              <span className="w-2 h-2 rounded-full bg-primary"></span> Conectado
            </span>
          </div>
          <div className="space-y-md">
            <div>
              <label className="block font-label-sm text-on-surface-variant mb-xs font-bold uppercase tracking-wider text-[10px]">Stripe API Key (Publicável)</label>
              <input className="w-full bg-surface-container-low/30 border border-outline-variant/30 rounded-lg px-md py-sm font-body-sm text-on-surface outline-none focus:border-primary transition-colors" type="text" defaultValue="pk_live_51M..."/>
            </div>
            <div>
              <label className="block font-label-sm text-on-surface-variant mb-xs font-bold uppercase tracking-wider text-[10px]">Webhook Secret</label>
              <input className="w-full bg-surface-container-low/30 border border-outline-variant/30 rounded-lg px-md py-sm font-body-sm text-on-surface outline-none focus:border-primary transition-colors" type="password" defaultValue="whsec_123456789"/>
            </div>
            <div className="mt-lg pt-lg border-t border-outline-variant/30">
              <div className="flex justify-between items-center mb-md">
                <div>
                  <h4 className="font-body-md font-bold text-on-surface">Taxa Anti-No-Show</h4>
                  <p className="font-label-sm text-on-surface-variant mt-xs">Cobrar automaticamente uma porcentagem em caso de falta.</p>
                </div>
                <Toggle checked={true} />
              </div>
              <div className="flex items-center gap-md">
                <div className="relative w-32">
                  <input className="w-full bg-surface-container-low/30 border border-outline-variant/30 rounded-lg px-md py-sm font-body-sm text-on-surface pr-8 outline-none focus:border-primary transition-colors" type="number" defaultValue="25"/>
                  <span className="absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant font-body-sm">%</span>
                </div>
                <span className="font-label-sm text-on-surface-variant italic">do custo total do serviço</span>
              </div>
            </div>
          </div>
        </section>

        {/* Messaging Setup (Twilio) - Span 5 */}
        <section className="md:col-span-5 bg-surface-container-lowest rounded-xl shadow-sm p-lg flex flex-col border border-outline-variant/10">
          <div className="flex justify-between items-center mb-lg">
            <div className="flex items-center gap-sm">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">chat</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Mensagens (WhatsApp)</h3>
            </div>
            <span className="inline-flex items-center gap-xs px-sm py-xs rounded-full bg-error/10 text-error font-label-sm text-label-sm">
              <span className="w-2 h-2 rounded-full bg-error"></span> Desconectado
            </span>
          </div>
          <div className="space-y-md flex-1">
            <div>
              <label className="block font-label-sm text-on-surface-variant mb-xs font-bold uppercase tracking-wider text-[10px]">Account SID</label>
              <input className="w-full bg-surface-container-low/30 border border-outline-variant/30 rounded-lg px-md py-sm font-body-sm text-on-surface outline-none focus:border-primary transition-colors" placeholder="ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" type="text"/>
            </div>
            <div>
              <label className="block font-label-sm text-on-surface-variant mb-xs font-bold uppercase tracking-wider text-[10px]">Auth Token</label>
              <input className="w-full bg-surface-container-low/30 border border-outline-variant/30 rounded-lg px-md py-sm font-body-sm text-on-surface outline-none focus:border-primary transition-colors" placeholder="••••••••••••••••" type="password"/>
            </div>
            <button className="w-full mt-sm py-sm rounded-lg border border-outline-variant/30 text-on-surface-variant font-label-md hover:bg-surface-container-low transition-colors flex items-center justify-center gap-sm">
              <span className="material-symbols-outlined text-[18px]">sync</span> Testar Conexão
            </button>
          </div>
        </section>

        {/* Notification Rules - Span 5 */}
        <section className="md:col-span-5 bg-surface-container-lowest rounded-xl shadow-sm p-lg flex flex-col border border-outline-variant/10">
          <div className="flex items-center gap-sm mb-lg">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined">rule</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Regras de Automação</h3>
          </div>
          <div className="space-y-sm">
            {[
              { title: "Auto-confirmar no pagamento", desc: "Mover agendamento para 'Confirmado' após sinal." },
              { title: "Lembrete de 24h", desc: "Enviar WhatsApp um dia antes do atendimento." },
              { title: "Lembrete de 1h", desc: "Aviso final com link de localização da clínica." },
            ].map((rule, i) => (
              <label key={i} className="flex items-start gap-md p-sm rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer border border-transparent hover:border-outline-variant/30 group">
                <input defaultChecked className="mt-1 w-4 h-4 accent-primary" type="checkbox"/>
                <div>
                  <p className="font-body-sm font-bold text-on-surface group-hover:text-primary transition-colors">{rule.title}</p>
                  <p className="font-label-sm text-on-surface-variant mt-xs text-[11px]">{rule.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* Branding Section - Span 7 */}
        <section className="md:col-span-7 bg-surface-container-lowest rounded-xl shadow-sm p-lg flex flex-col border border-outline-variant/10">
          <div className="flex items-center gap-sm mb-lg">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined">palette</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Branding & Experiência</h3>
          </div>
          <div className="flex flex-col md:flex-row gap-lg">
            {/* Logo Upload */}
            <div className="flex-shrink-0">
              <label className="block font-label-sm text-on-surface-variant mb-sm font-bold uppercase tracking-wider text-[10px]">Logo do Portal do Paciente</label>
              <div className="w-40 h-40 rounded-xl border-2 border-dashed border-outline-variant/30 hover:border-primary/50 transition-colors flex flex-col items-center justify-center cursor-pointer bg-surface relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 flex flex-col items-center gap-xs">
                  <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
                  <span className="font-label-sm text-on-surface font-bold">Subir Logo</span>
                </div>
              </div>
            </div>
            {/* Success Message */}
            <div className="flex-1 flex flex-col">
              <label className="block font-label-sm text-on-surface-variant mb-sm font-bold uppercase tracking-wider text-[10px]">Mensagem de Sucesso (Agendamento)</label>
              <textarea className="w-full flex-1 bg-surface-container-low/30 border border-outline-variant/30 rounded-lg px-md py-sm font-body-sm text-on-surface outline-none focus:border-primary transition-colors resize-none" rows={4} defaultValue={"Obrigado por confirmar seu agendamento na VitaFlow.\n\nLembramos nossa política de cancelamento: alterações em menos de 24h podem gerar taxas. Até breve!"}/>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function Toggle({ checked }: { checked: boolean }) {
  return (
    <div className={`w-12 h-6 rounded-full relative p-1 transition-colors cursor-pointer ${checked ? 'bg-primary' : 'bg-outline-variant'}`}>
      <div className={`w-4 h-4 bg-white rounded-full transition-all ${checked ? 'ml-6' : 'ml-0'}`}></div>
    </div>
  );
}