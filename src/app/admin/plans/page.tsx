"use client";

export default function PlanFeatureFactory() {
  const modules = [
    { name: "WhatsApp Automation", icon: "forum", essential: false, pro: "toggle", premium: true },
    { name: "Advanced Inventory", icon: "inventory_2", essential: false, pro: "toggle", premium: true },
    { name: "Stripe Signal Integration", icon: "point_of_sale", essential: true, pro: true, premium: true },
    { name: "AI Clinical Charting", icon: "clinical_notes", essential: false, pro: false, premium: "toggle" },
  ];

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-xl">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-xl">
        <div className="flex-1">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs font-bold">Fábrica de Planos & Funcionalidades</h2>
          <p className="font-body-md text-on-surface-variant max-w-3xl leading-relaxed">
            Configure tiers de assinatura, gerencie permissões de módulos e monitore a distribuição de clínicas por plano.
          </p>
        </div>
        <div className="flex gap-sm shrink-0 mt-md md:mt-0">
          <button className="px-lg py-sm rounded-lg font-label-md text-secondary border border-secondary hover:bg-secondary/10 transition-colors">Descartar Rascunho</button>
          <button className="px-lg py-sm rounded-lg font-label-md bg-primary text-white hover:bg-primary/90 transition-colors shadow-md">Publicar Alterações</button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
        {[
          { label: "Essential", count: 142, icon: "sell", color: "primary" },
          { label: "Pro", count: 328, icon: "star", color: "primary", featured: true },
          { label: "Premium", count: 84, icon: "diamond", color: "secondary" },
        ].map((tier, i) => (
          <div key={i} className={`bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant/10 flex flex-col justify-between relative overflow-hidden ${tier.featured ? 'ring-2 ring-primary/20' : ''}`}>
            {tier.featured && <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 pointer-events-none"></div>}
            <div className="flex justify-between items-start mb-md relative z-10">
              <div className={`p-sm rounded-lg ${tier.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{tier.icon}</span>
              </div>
              <span className={`font-bold text-[10px] uppercase tracking-wider px-2 py-1 rounded-full ${
                tier.color === 'primary' ? (tier.featured ? 'bg-primary text-white' : 'bg-primary/10 text-primary') : 'bg-secondary/10 text-secondary border border-secondary/20'
              }`}>
                {tier.label}
              </span>
            </div>
            <div className="relative z-10">
              <p className="font-bold text-[11px] text-on-surface-variant uppercase tracking-widest mb-xs">Clínicas Ativas</p>
              <p className="text-4xl font-bold text-on-surface">{tier.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Entitlements Matrix */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 overflow-hidden flex flex-col">
        <div className="p-lg border-b border-outline-variant/10 bg-surface-container-low/20 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-on-surface">Matriz de Permissões de Módulos</h3>
            <p className="text-xs text-on-surface-variant mt-1">Habilite ou desabilite o acesso a módulos específicos por tier de assinatura.</p>
          </div>
          <button className="flex items-center gap-xs font-bold text-xs text-primary hover:bg-primary/5 px-3 py-2 rounded-lg transition-colors border border-primary/20">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Novo Módulo
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/10">
                <th className="py-md px-lg font-bold text-[11px] text-on-surface-variant uppercase tracking-wider border-b border-outline-variant/10 w-1/3">Nome do Módulo</th>
                <th className="py-md px-lg font-bold text-[11px] text-on-surface-variant uppercase tracking-wider border-b border-outline-variant/10 text-center">Essential</th>
                <th className="py-md px-lg font-bold text-[11px] text-primary uppercase tracking-wider border-b border-outline-variant/10 text-center bg-primary/5">Pro</th>
                <th className="py-md px-lg font-bold text-[11px] text-secondary uppercase tracking-wider border-b border-outline-variant/10 text-center bg-secondary/5">Premium</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 text-sm">
              {modules.map((row, i) => (
                <tr key={i} className="hover:bg-surface-container-low/10 transition-colors">
                  <td className="py-md px-lg">
                    <div className="flex items-center gap-sm">
                      <span className="material-symbols-outlined text-on-surface-variant text-[20px]">{row.icon}</span>
                      <span className="font-bold text-on-surface">{row.name}</span>
                    </div>
                  </td>
                  <td className="py-md px-lg text-center">
                    {row.essential === true ? <Check /> : row.essential === false ? <Minus /> : <Toggle checked={false} color="primary" />}
                  </td>
                  <td className="py-md px-lg text-center bg-primary/5">
                    {row.pro === true ? <Check color="primary" /> : row.pro === false ? <Minus /> : <Toggle checked={true} color="primary" />}
                  </td>
                  <td className="py-md px-lg text-center bg-secondary/5">
                    {row.premium === true ? <Check color="secondary" /> : row.premium === false ? <Minus /> : <Toggle checked={true} color="secondary" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pricing Configurator */}
      <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant/10">
        <h3 className="font-bold text-on-surface mb-lg border-b border-outline-variant/10 pb-md">Configurador de Preços Base</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          {[
            { label: "Essential", price: "99,00", discount: "10", color: "outline-variant" },
            { label: "Pro", price: "249,00", discount: "15", color: "primary", featured: true },
            { label: "Premium", price: "499,00", discount: "20", color: "secondary" },
          ].map((item, i) => (
            <div key={i} className={`p-md rounded-xl border flex flex-col gap-md transition-all ${
              item.featured ? 'border-primary/30 bg-primary/5 shadow-sm' : 'border-outline-variant/30 bg-surface-container-low/10'
            }`}>
              <h4 className={`font-bold text-[11px] uppercase tracking-wider ${item.featured ? 'text-primary' : 'text-on-surface-variant'}`}>
                {item.label} {item.featured && <span className="lowercase font-medium text-[10px] ml-2">(Mais Popular)</span>}
              </h4>
              <div className="flex flex-col gap-xs">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Mensalidade (BRL)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold text-sm">R$</span>
                  <input className="w-full bg-white border border-outline-variant/30 rounded-lg pl-9 pr-3 py-2 font-bold text-on-surface focus:border-primary transition-colors outline-none" type="text" defaultValue={item.price}/>
                </div>
              </div>
              <div className="flex flex-col gap-xs">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Desconto 1ª Assinatura (%)</label>
                <input className="w-full bg-white border border-outline-variant/30 rounded-lg px-3 py-2 font-bold text-on-surface focus:border-primary transition-colors outline-none" type="text" defaultValue={item.discount}/>
                <p className="text-[9px] text-on-surface-variant italic mt-1">*Válido apenas para novos clientes.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Check({ color = 'primary' }: { color?: 'primary' | 'secondary' }) {
  return <span className={`material-symbols-outlined text-[20px] ${color === 'primary' ? 'text-primary' : 'text-secondary'}`} style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>;
}

function Minus() {
  return <span className="material-symbols-outlined text-outline-variant text-[20px]">remove</span>;
}

function Toggle({ checked, color = 'primary' }: { checked: boolean, color?: 'primary' | 'secondary' }) {
  return (
    <div className={`w-9 h-5 rounded-full relative p-0.5 transition-colors cursor-pointer inline-flex mx-auto ${checked ? (color === 'primary' ? 'bg-primary' : 'bg-secondary') : 'bg-outline-variant'}`}>
      <div className={`w-4 h-4 bg-white rounded-full transition-all ${checked ? 'ml-4' : 'ml-0'}`}></div>
    </div>
  );
}
