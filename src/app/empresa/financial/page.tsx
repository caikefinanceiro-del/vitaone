"use client";

export default function FinancialSettings() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-xl">
      <div className="flex flex-col gap-xs">
        <h2 className="font-headline-lg text-headline-lg text-primary">Configurações Financeiras</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Gerencie pagamentos, taxas e informações de faturamento da sua clínica.</p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Column: Primary Settings */}
        <div className="lg:col-span-8 flex flex-col gap-gutter">
          {/* Payment Methods Card */}
          <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant/10">
            <div className="flex justify-between items-center mb-md border-b border-outline-variant/30 pb-md">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Métodos de Pagamento</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">Configure os tipos de pagamento aceitos no checkout.</p>
              </div>
              <span className="material-symbols-outlined text-outline-variant text-[28px]">payments</span>
            </div>
            <div className="space-y-md">
              {/* Stripe */}
              <div className="flex justify-between items-center p-md border border-outline-variant/30 rounded-xl hover:border-primary/50 transition-colors group">
                <div className="flex items-center gap-md">
                  <div className="w-12 h-12 bg-surface-container-low rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <span className="material-symbols-outlined text-primary">credit_card</span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-label-md text-on-surface font-bold">Stripe (Cartão de Crédito)</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Taxa de processamento: 2.9% + R$ 0,50</p>
                  </div>
                </div>
                <Toggle checked={true} />
              </div>
              {/* Pix */}
              <div className="flex justify-between items-center p-md border border-outline-variant/30 rounded-xl hover:border-primary/50 transition-colors group">
                <div className="flex items-center gap-md">
                  <div className="w-12 h-12 bg-surface-container-low rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <span className="material-symbols-outlined text-primary">qr_code_scanner</span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-label-md text-on-surface font-bold">Pix (Transferência Instantânea)</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">0% de taxa de processamento</p>
                  </div>
                </div>
                <Toggle checked={true} />
              </div>
            </div>
          </div>

          {/* Booking Deposits Card */}
          <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant/10">
            <div className="flex justify-between items-center mb-md border-b border-outline-variant/30 pb-md">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Taxa de Reserva <span className="font-body-sm text-on-surface-variant font-normal">(Sinal)</span></h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">Exija um pagamento antecipado para garantir agendamentos premium.</p>
              </div>
              <Toggle checked={true} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md mt-md">
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-on-surface font-bold uppercase tracking-wider text-[11px]">Tipo de Depósito</label>
                <select className="w-full bg-surface-container-lowest border border-outline-variant/30 text-body-md rounded-lg p-sm outline-none focus:border-primary transition-colors">
                  <option>Porcentagem (%)</option>
                  <option>Valor Fixo (R$)</option>
                </select>
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-on-surface font-bold uppercase tracking-wider text-[11px]">Valor Padrão</label>
                <input className="w-full bg-surface-container-lowest border border-outline-variant/30 text-body-md rounded-lg p-sm outline-none focus:border-primary transition-colors" type="number" defaultValue="20"/>
              </div>
            </div>
            <p className="font-body-sm text-[12px] text-on-surface-variant mt-md italic">*Este padrão será aplicado a todos os procedimentos marcados como 'Premium'.</p>
          </div>
        </div>

        {/* Right Column: Secondary Settings */}
        <div className="lg:col-span-4 flex flex-col gap-gutter">
          {/* Payout Schedule */}
          <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant/10">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-sm">Cronograma de Repasses</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-md">Quando os fundos chegam em sua conta bancária.</p>
            <div className="space-y-sm">
              <label className="flex items-center gap-sm cursor-pointer p-sm border border-outline-variant/30 rounded-lg hover:bg-surface-container-low transition-colors group">
                <input defaultChecked className="w-4 h-4 accent-primary" name="payout" type="radio"/>
                <span className="font-body-md text-on-surface group-hover:text-primary">Diário (D+2 dias úteis)</span>
              </label>
              <label className="flex items-center gap-sm cursor-pointer p-sm border border-outline-variant/30 rounded-lg hover:bg-surface-container-low transition-colors group">
                <input className="w-4 h-4 accent-primary" name="payout" type="radio"/>
                <span className="font-body-md text-on-surface group-hover:text-primary">Semanal (Toda Segunda)</span>
              </label>
            </div>
            <div className="mt-md p-sm bg-primary-container/10 rounded-lg border border-primary/20">
              <p className="font-label-md text-primary flex items-center gap-sm">
                <span className="material-symbols-outlined text-[18px]">account_balance</span>
                Itaú Unibanco final **4921
              </p>
            </div>
          </div>

          {/* Tax Rules */}
          <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant/10 border-t-4 border-secondary">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-sm">Regras de Impostos (ISS)</h3>
            <div className="mb-md">
              <label className="block font-label-md text-on-surface font-bold uppercase tracking-wider text-[11px] mb-xs">Alíquota de Serviço Local</label>
              <div className="relative">
                <input className="w-full bg-surface-container-lowest border border-outline-variant/30 text-body-md rounded-lg p-sm pr-8 outline-none focus:border-primary transition-colors" type="number" defaultValue="5.0"/>
                <span className="absolute right-sm top-1/2 -translate-y-1/2 font-body-md text-on-surface-variant">%</span>
              </div>
            </div>
            <label className="flex items-start gap-sm cursor-pointer">
              <input defaultChecked className="w-4 h-4 accent-primary mt-1" type="checkbox"/>
              <span className="font-body-sm text-on-surface-variant">Adicionar imposto automaticamente em todas as faturas e recibos.</span>
            </label>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="mt-xl flex justify-end gap-md border-t border-outline-variant/30 pt-lg">
        <button className="font-label-md text-label-md text-secondary border border-secondary px-lg py-sm rounded-lg hover:bg-secondary/10 transition-colors">
          Descartar Alterações
        </button>
        <button className="font-label-md text-label-md text-white bg-primary px-lg py-sm rounded-lg hover:bg-primary/90 transition-colors shadow-sm">
          Salvar Configurações
        </button>
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