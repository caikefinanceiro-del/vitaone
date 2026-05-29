"use client";

import { useState } from "react";

type ModuleAccess = boolean | "toggle";

interface ModuleDef {
  id: number;
  name: string;
  icon: string;
  globalActive: boolean;
  essential: ModuleAccess;
  pro: ModuleAccess;
  premium: ModuleAccess;
}

const INITIAL_MODULES: ModuleDef[] = [
  { id: 1, name: "WhatsApp Automation", icon: "forum", globalActive: true, essential: false, pro: "toggle", premium: true },
  { id: 2, name: "Advanced Inventory", icon: "inventory_2", globalActive: true, essential: false, pro: "toggle", premium: true },
  { id: 3, name: "Stripe Signal Integration", icon: "point_of_sale", globalActive: true, essential: true, pro: true, premium: true },
  { id: 4, name: "AI Clinical Charting", icon: "clinical_notes", globalActive: true, essential: false, pro: false, premium: "toggle" },
];

export default function PlanFeatureFactory() {
  const [modules, setModules] = useState<ModuleDef[]>(INITIAL_MODULES);
  
  // Workflow states
  const [isDirty, setIsDirty] = useState(false);
  const [hasSavedChanges, setHasSavedChanges] = useState(false);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newModuleName, setNewModuleName] = useState("");
  const [newModuleIcon, setNewModuleIcon] = useState("api");
  const [newEssential, setNewEssential] = useState<ModuleAccess>(false);
  const [newPro, setNewPro] = useState<ModuleAccess>(false);
  const [newPremium, setNewPremium] = useState<ModuleAccess>(true);

  const handleToggleGlobal = (id: number) => {
    setModules(prev => prev.map(m => m.id === id ? { ...m, globalActive: !m.globalActive } : m));
    setIsDirty(true);
  };

  const handleAddModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModuleName.trim()) return;
    
    const newModule: ModuleDef = {
      id: Date.now(),
      name: newModuleName,
      icon: newModuleIcon,
      globalActive: true,
      essential: newEssential,
      pro: newPro,
      premium: newPremium
    };
    
    setModules(prev => [...prev, newModule]);
    setIsDirty(true);
    
    // reset form
    setNewModuleName("");
    setNewModuleIcon("api");
    setNewEssential(false);
    setNewPro(false);
    setNewPremium(true);
    setIsAddModalOpen(false);
  };

  const handleDiscard = () => {
    setModules(INITIAL_MODULES);
    setIsDirty(false);
    setHasSavedChanges(false);
  };

  const handleSaveDraft = () => {
    // mock save
    setIsDirty(false);
    setHasSavedChanges(true);
  };

  const handlePublish = () => {
    if (!hasSavedChanges || isDirty) return;
    // mock publish
    alert("Alterações publicadas com sucesso para todas as clínicas!");
    setHasSavedChanges(false);
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-xl relative">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-xl">
        <div className="flex-1">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs font-bold">Fábrica de Planos & Funcionalidades</h2>
          <p className="font-body-md text-on-surface-variant max-w-3xl leading-relaxed">
            Configure tiers de assinatura, gerencie permissões de módulos e monitore a distribuição de clínicas por plano.
          </p>
        </div>
        <div className="flex gap-sm shrink-0 mt-md md:mt-0">
          {(isDirty || hasSavedChanges) && (
            <button 
              onClick={handleDiscard}
              className="px-lg py-sm rounded-lg font-label-md text-error border border-error/50 hover:bg-error/10 transition-colors cursor-pointer"
            >
              Descartar Rascunho
            </button>
          )}
          
          {isDirty && (
            <button 
              onClick={handleSaveDraft}
              className="px-lg py-sm rounded-lg font-label-md text-primary border border-primary hover:bg-primary/10 transition-colors cursor-pointer flex items-center gap-xs shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              Salvar Alterações
            </button>
          )}

          <button 
            onClick={handlePublish}
            disabled={!hasSavedChanges || isDirty}
            className={`px-lg py-sm rounded-lg font-label-md shadow-md flex items-center gap-xs transition-colors ${
              !hasSavedChanges || isDirty 
                ? "bg-surface-container-highest text-on-surface-variant opacity-50 cursor-not-allowed" 
                : "bg-primary text-white hover:bg-primary/90 cursor-pointer"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
            Publicar Alterações
          </button>
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
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-xs font-bold text-xs text-primary hover:bg-primary/5 px-3 py-2 rounded-lg transition-colors border border-primary/20 cursor-pointer bg-white"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Novo Módulo
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-surface-container-low/10">
                <th className="py-md px-lg font-bold text-[11px] text-on-surface-variant uppercase tracking-wider border-b border-outline-variant/10 w-[40%]">Nome do Módulo / Manutenção</th>
                <th className="py-md px-lg font-bold text-[11px] text-on-surface-variant uppercase tracking-wider border-b border-outline-variant/10 text-center">Essential</th>
                <th className="py-md px-lg font-bold text-[11px] text-primary uppercase tracking-wider border-b border-outline-variant/10 text-center bg-primary/5">Pro</th>
                <th className="py-md px-lg font-bold text-[11px] text-secondary uppercase tracking-wider border-b border-outline-variant/10 text-center bg-secondary/5">Premium</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 text-sm">
              {modules.map((row) => (
                <tr key={row.id} className={`transition-colors ${row.globalActive ? 'hover:bg-surface-container-low/10' : 'bg-surface-container-highest/20 opacity-60 grayscale'}`}>
                  <td className="py-md px-lg">
                    <div className="flex items-center gap-md">
                      <div className="flex flex-col items-center">
                        <div 
                          onClick={() => handleToggleGlobal(row.id)}
                          className={`w-8 h-4 rounded-full relative p-0.5 transition-colors cursor-pointer inline-flex ${row.globalActive ? 'bg-primary' : 'bg-outline-variant'}`}
                        >
                          <div className={`w-3 h-3 bg-white rounded-full transition-all ${row.globalActive ? 'ml-4' : 'ml-0'}`}></div>
                        </div>
                        <span className="text-[9px] font-bold mt-1 text-on-surface-variant uppercase">{row.globalActive ? 'ON' : 'OFF'}</span>
                      </div>
                      <div className="flex items-center gap-sm">
                        <span className="material-symbols-outlined text-on-surface-variant text-[20px]">{row.icon}</span>
                        <span className="font-bold text-on-surface">{row.name}</span>
                      </div>
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
                  <input className="w-full bg-white border border-outline-variant/30 rounded-lg pl-9 pr-3 py-2 font-bold text-on-surface focus:border-primary transition-colors outline-none" type="text" defaultValue={item.price} onChange={() => setIsDirty(true)} />
                </div>
              </div>
              <div className="flex flex-col gap-xs">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Desconto 1ª Assinatura (%)</label>
                <input className="w-full bg-white border border-outline-variant/30 rounded-lg px-3 py-2 font-bold text-on-surface focus:border-primary transition-colors outline-none" type="text" defaultValue={item.discount} onChange={() => setIsDirty(true)}/>
                <p className="text-[9px] text-on-surface-variant italic mt-1">*Válido apenas para novos clientes.</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: ADD NEW MODULE */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm px-md">
          <div className="bg-surface border border-outline-variant/30 rounded-2xl p-xl shadow-xl w-full max-w-[500px] animate-slide-in">
            <div className="flex justify-between items-center mb-lg">
              <h3 className="font-bold text-lg text-on-surface flex items-center gap-sm">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </div>
                Cadastrar Novo Módulo
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddModule} className="flex flex-col gap-md">
              <div className="flex flex-col gap-xs">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Nome do Módulo *</label>
                <input 
                  type="text"
                  value={newModuleName}
                  onChange={(e) => setNewModuleName(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-md py-sm font-body-md outline-none focus:border-primary transition-all text-sm"
                  placeholder="Ex: Telemedicina Integrada"
                  required
                />
              </div>

              <div className="flex flex-col gap-xs">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Ícone (Material Symbols) *</label>
                <div className="flex items-center gap-sm">
                  <input 
                    type="text"
                    value={newModuleIcon}
                    onChange={(e) => setNewModuleIcon(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-md py-sm font-body-md outline-none focus:border-primary transition-all text-sm"
                    placeholder="Ex: videocam"
                    required
                  />
                  <div className="w-10 h-10 shrink-0 bg-surface-container-low rounded-xl flex items-center justify-center text-on-surface">
                    <span className="material-symbols-outlined">{newModuleIcon}</span>
                  </div>
                </div>
                <p className="text-[10px] text-on-surface-variant">Nome do ícone da biblioteca do Google Fonts.</p>
              </div>

              <div className="mt-md border-t border-outline-variant/10 pt-md">
                <h4 className="font-bold text-sm text-on-surface mb-sm">Configuração de Acesso Inicial</h4>
                <div className="grid grid-cols-3 gap-sm">
                  <AccessSelector label="Essential" value={newEssential} onChange={setNewEssential} />
                  <AccessSelector label="Pro" value={newPro} onChange={setNewPro} color="primary" />
                  <AccessSelector label="Premium" value={newPremium} onChange={setNewPremium} color="secondary" />
                </div>
              </div>

              <div className="flex justify-end gap-md mt-lg border-t border-outline-variant/10 pt-md">
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-lg py-sm rounded-lg font-bold text-xs text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="bg-primary text-white font-bold text-xs px-lg py-sm rounded-lg shadow-md hover:bg-primary/90 transition-colors cursor-pointer flex items-center gap-xs"
                >
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  Adicionar à Matriz
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

function AccessSelector({ label, value, onChange, color = 'primary' }: { label: string, value: ModuleAccess, onChange: (v: ModuleAccess) => void, color?: string }) {
  return (
    <div className="flex flex-col gap-xs">
      <label className={`text-[10px] font-bold uppercase tracking-wider text-center ${color === 'primary' ? 'text-primary' : color === 'secondary' ? 'text-secondary' : 'text-on-surface-variant'}`}>{label}</label>
      <select 
        value={value.toString()} 
        onChange={(e) => {
          const val = e.target.value;
          onChange(val === "true" ? true : val === "false" ? false : "toggle");
        }}
        className="w-full appearance-none bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-2 py-1.5 text-xs text-center outline-none cursor-pointer"
      >
        <option value="true">Incluído</option>
        <option value="false">Bloqueado</option>
        <option value="toggle">Opcional</option>
      </select>
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
