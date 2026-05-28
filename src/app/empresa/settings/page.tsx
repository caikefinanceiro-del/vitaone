"use client";

export default function GeneralSettings() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-xl">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-md">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs font-bold">Configurações Gerais</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Gerencie as informações da sua unidade, horários de funcionamento e preferências do sistema.</p>
        </div>
        <div className="flex gap-sm">
          <button className="px-lg py-sm rounded-lg border border-secondary text-secondary font-label-md hover:bg-secondary/10 transition-colors">Descartar</button>
          <button className="px-lg py-sm rounded-lg bg-primary text-white font-label-md hover:bg-primary/90 transition-colors shadow-md">Salvar Alterações</button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Unit Profile - Span 8 */}
        <section className="md:col-span-8 bg-surface-container-lowest rounded-xl shadow-sm p-lg flex flex-col border border-outline-variant/10">
          <div className="flex items-center gap-sm mb-lg border-b border-outline-variant/30 pb-md">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">medical_services</span>
            </div>
            <h3 className="font-headline-sm text-on-surface font-bold">Perfil da Unidade</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div className="col-span-2">
              <label className="block font-label-sm text-on-surface-variant mb-xs font-bold uppercase tracking-wider text-[10px]">Nome da Clínica / Unidade</label>
              <input className="w-full bg-surface-container-low/30 border border-outline-variant/30 rounded-lg px-md py-sm font-body-sm text-on-surface outline-none focus:border-primary transition-colors" type="text" defaultValue="VitaOne Clinic - São Paulo"/>
            </div>
            <div>
              <label className="block font-label-sm text-on-surface-variant mb-xs font-bold uppercase tracking-wider text-[10px]">E-mail de Contato</label>
              <input className="w-full bg-surface-container-low/30 border border-outline-variant/30 rounded-lg px-md py-sm font-body-sm text-on-surface outline-none focus:border-primary transition-colors" type="email" defaultValue="contato@vitaone.com.br"/>
            </div>
            <div>
              <label className="block font-label-sm text-on-surface-variant mb-xs font-bold uppercase tracking-wider text-[10px]">Telefone / WhatsApp</label>
              <input className="w-full bg-surface-container-low/30 border border-outline-variant/30 rounded-lg px-md py-sm font-body-sm text-on-surface outline-none focus:border-primary transition-colors" type="text" defaultValue="(11) 99999-9999"/>
            </div>
            <div className="col-span-2">
              <label className="block font-label-sm text-on-surface-variant mb-xs font-bold uppercase tracking-wider text-[10px]">Endereço Completo</label>
              <input className="w-full bg-surface-container-low/30 border border-outline-variant/30 rounded-lg px-md py-sm font-body-sm text-on-surface outline-none focus:border-primary transition-colors" type="text" defaultValue="Av. Paulista, 1000 - Bela Vista, São Paulo - SP"/>
            </div>
          </div>
        </section>

        {/* Business Status - Span 4 */}
        <section className="md:col-span-4 bg-surface-container-lowest rounded-xl shadow-sm p-lg flex flex-col border border-outline-variant/10">
          <div className="flex items-center gap-sm mb-lg">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined">schedule</span>
            </div>
            <h3 className="font-headline-sm text-on-surface font-bold">Status da Operação</h3>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-md mb-md">
            <div className="flex items-center gap-md">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
              <div>
                <p className="font-bold text-emerald-900 text-sm">Clínica Aberta</p>
                <p className="text-[11px] text-emerald-700">Horário atual: 08:00 - 18:00</p>
              </div>
            </div>
          </div>
          <div className="space-y-sm">
            {['Seg', 'Ter', 'Qua', 'Qui', 'Sex'].map((day) => (
              <div key={day} className="flex justify-between items-center py-1 border-b border-outline-variant/10 last:border-0">
                <span className="font-bold text-on-surface text-xs">{day}</span>
                <span className="text-on-surface-variant text-xs font-medium">08:00 - 18:00</span>
              </div>
            ))}
            <div className="flex justify-between items-center py-1">
              <span className="font-bold text-on-surface text-xs">Sáb</span>
              <span className="text-secondary text-xs font-bold">Fechado</span>
            </div>
          </div>
          <button className="mt-auto w-full py-2 bg-surface-container-low/50 text-primary font-bold text-xs rounded-lg hover:bg-surface-container-low transition-colors">
            Editar Horários
          </button>
        </section>

        {/* Notifications - Span 4 */}
        <section className="md:col-span-4 bg-surface-container-lowest rounded-xl shadow-sm p-lg flex flex-col border border-outline-variant/10">
          <div className="flex items-center gap-sm mb-lg">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">notifications</span>
            </div>
            <h3 className="font-headline-sm text-on-surface font-bold">Notificações</h3>
          </div>
          <div className="space-y-md">
            {[
              { title: "Resumo Diário", desc: "E-mail com agenda e faturamento do dia anterior." },
              { title: "Alertas de Estoque", desc: "Notificar quando produtos atingirem o nível crítico." },
              { title: "Novos Agendamentos", desc: "Push notification para cada nova reserva." },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-start gap-md">
                <div>
                  <p className="font-bold text-on-surface text-sm">{item.title}</p>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">{item.desc}</p>
                </div>
                <Toggle checked={i < 2} />
              </div>
            ))}
          </div>
        </section>

        {/* Security & Access - Span 8 */}
        <section className="md:col-span-8 bg-surface-container-lowest rounded-xl shadow-sm p-lg flex flex-col border border-outline-variant/10">
          <div className="flex items-center gap-sm mb-lg">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined">security</span>
            </div>
            <h3 className="font-headline-sm text-on-surface font-bold">Segurança & Acesso</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            <div className="p-md rounded-xl bg-surface-container-low/30 border border-outline-variant/30 flex flex-col justify-between h-40">
              <div>
                <p className="font-bold text-on-surface text-sm mb-xs">Autenticação em Dois Fatores (2FA)</p>
                <p className="text-[11px] text-on-surface-variant">Proteja sua conta e a de seus colaboradores com uma camada extra de segurança.</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold text-secondary uppercase">Desativado</span>
                <button className="text-primary font-bold text-xs hover:underline">Configurar</button>
              </div>
            </div>
            <div className="p-md rounded-xl bg-surface-container-low/30 border border-outline-variant/30 flex flex-col justify-between h-40">
              <div>
                <p className="font-bold text-on-surface text-sm mb-xs">Logs de Auditoria</p>
                <p className="text-[11px] text-on-surface-variant">Rastreie quem acessou quais prontuários e quando (Conformidade LGPD).</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold text-primary uppercase">Ativo</span>
                <button className="text-primary font-bold text-xs hover:underline">Ver Logs</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function Toggle({ checked }: { checked: boolean }) {
  return (
    <div className={`w-12 h-6 rounded-full relative p-1 transition-colors cursor-pointer flex-shrink-0 ${checked ? 'bg-primary' : 'bg-outline-variant'}`}>
      <div className={`w-4 h-4 bg-white rounded-full transition-all ${checked ? 'ml-6' : 'ml-0'}`}></div>
    </div>
  );
}
