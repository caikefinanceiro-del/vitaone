"use client";

import { useState, useEffect } from "react";

interface Tenant {
  id: number;
  name: string;
  location: string;
  plan: string;
  status: string;
  joined: string;
  mrr: string;
  initial: string;
}

const DEFAULT_TENANTS: Tenant[] = [
  { id: 1, name: "Aura Aesthetics", location: "São Paulo, SP", plan: "Premium", status: "Active", joined: "12 Out, 2023", mrr: "R$ 1.250,00", initial: "A" },
  { id: 2, name: "Lumina Wellness", location: "Curitiba, PR", plan: "Pro", status: "Active", joined: "05 Nov, 2023", mrr: "R$ 850,00", initial: "L" },
  { id: 3, name: "Revive MedSpa", location: "Rio de Janeiro, RJ", plan: "Essential", status: "Suspended", joined: "18 Jan, 2024", mrr: "R$ 450,00", initial: "R" },
  { id: 4, name: "Elysian Dermatology", location: "Belo Horizonte, MG", plan: "Premium", status: "Pending", joined: "02 Mar, 2024", mrr: "R$ 0,00", initial: "E" },
];

export default function TenantManagement() {
  const [tenants, setTenants] = useState<Tenant[]>(DEFAULT_TENANTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [planFilter, setPlanFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  // Form states
  const [currentStep, setCurrentStep] = useState(1);
  const [cnpj, setCnpj] = useState("");
  const [isLoadingCnpj, setIsLoadingCnpj] = useState(false);
  const [clinicName, setClinicName] = useState("");
  const [clinicLocation, setClinicLocation] = useState("");
  const [clinicPlan, setClinicPlan] = useState("Essential");
  const [clinicStatus, setClinicStatus] = useState("Active");
  const [contractorName, setContractorName] = useState("");
  const [contractorEmail, setContractorEmail] = useState("");
  const [contractorPassword, setContractorPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Toast state
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  
  // Actions dropdown state
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("vitaflow-tenants");
    if (saved) {
      try {
        setTenants(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing tenants list:", e);
      }
    }
  }, []);

  const saveTenants = (updatedList: Tenant[]) => {
    setTenants(updatedList);
    localStorage.setItem("vitaflow-tenants", JSON.stringify(updatedList));
  };

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleCnpjSearch = async () => {
    const cleanCnpj = cnpj.replace(/\D/g, "");
    if (cleanCnpj.length !== 14) {
      setErrorMsg("CNPJ inválido (deve conter 14 dígitos).");
      return;
    }
    
    setIsLoadingCnpj(true);
    setErrorMsg("");
    
    try {
      const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cleanCnpj}`);
      if (!response.ok) throw new Error("CNPJ não encontrado");
      const data = await response.json();
      
      setClinicName(data.nome_fantasia || data.razao_social || "");
      setClinicLocation(`${data.municipio}, ${data.uf}`);
      showToast("Dados da empresa carregados!", "success");
    } catch (err) {
      setErrorMsg("Erro ao buscar CNPJ. Verifique se ele é válido e está ativo.");
    } finally {
      setIsLoadingCnpj(false);
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!clinicName || !clinicLocation) {
        setErrorMsg("Preencha o Nome da Clínica e a Localização para avançar.");
        return;
      }
    }
    setErrorMsg("");
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setErrorMsg("");
    setCurrentStep((prev) => prev - 1);
  };

  // Create Clinic
  const handleCreateClinic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep !== 3) return;

    if (!contractorName.trim() || !contractorEmail.trim() || !contractorPassword.trim()) {
      setErrorMsg("Por favor, preencha todos os campos do responsável.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch('/api/tenants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cnpj,
          clinicName,
          location: clinicLocation,
          contractorName,
          contractorEmail,
          contractorPassword,
          clinicPlan
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao cadastrar a clínica.");
      }

      // Calculate MRR based on plan and status for the UI mockup update
      let mrrValue = "R$ 0,00";
      if (clinicStatus === "Active") {
        if (clinicPlan === "Essential") mrrValue = "R$ 450,00";
        else if (clinicPlan === "Pro") mrrValue = "R$ 850,00";
        else if (clinicPlan === "Premium") mrrValue = "R$ 1.250,00";
      }

      const today = new Date();
      const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
      const formattedDate = `${String(today.getDate()).padStart(2, "0")} ${months[today.getMonth()]} ${today.getFullYear()}`;

      const newClinic: Tenant = {
        id: Date.now(), // Temporarily use timestamp for local UI id
        name: clinicName,
        location: clinicLocation,
        plan: clinicPlan,
        status: clinicStatus,
        joined: formattedDate,
        mrr: mrrValue,
        initial: clinicName.charAt(0).toUpperCase() || "C",
      };

      const updated = [newClinic, ...tenants];
      saveTenants(updated);
      setIsModalOpen(false);
      
      // Clear form
      setClinicName("");
      setClinicLocation("");
      setClinicPlan("Essential");
      setClinicStatus("Active");
      setCnpj("");
      setContractorName("");
      setContractorEmail("");
      setContractorPassword("");
      setCurrentStep(1);
      setErrorMsg("");

      showToast("Clínica cadastrada e e-mail enviado com sucesso!");

    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle Suspend Status
  const handleToggleSuspend = (id: number) => {
    const updated = tenants.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === "Active" ? "Suspended" : "Active";
        
        // Recalculate MRR
        let mrrValue = "R$ 0,00";
        if (nextStatus === "Active") {
          if (t.plan === "Essential") mrrValue = "R$ 450,00";
          else if (t.plan === "Pro") mrrValue = "R$ 850,00";
          else if (t.plan === "Premium") mrrValue = "R$ 1.250,00";
        }
        
        showToast(
          nextStatus === "Suspended" 
            ? `Clínica ${t.name} suspensa.` 
            : `Clínica ${t.name} reativada.`
        );
        return { ...t, status: nextStatus, mrr: mrrValue };
      }
      return t;
    });
    saveTenants(updated);
  };

  // Open Details
  const handleOpenDetails = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setIsDetailsModalOpen(true);
  };

  // Open Edit Plan
  const handleOpenEditPlan = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setClinicPlan(tenant.plan);
    setClinicStatus(tenant.status);
    setIsEditModalOpen(true);
  };

  const handleSaveEditPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTenant) return;

    const updated = tenants.map(t => {
      if (t.id === selectedTenant.id) {
        let mrrValue = "R$ 0,00";
        if (clinicStatus === "Active") {
          if (clinicPlan === "Essential") mrrValue = "R$ 450,00";
          else if (clinicPlan === "Pro") mrrValue = "R$ 850,00";
          else if (clinicPlan === "Premium") mrrValue = "R$ 1.250,00";
        }
        return { ...t, plan: clinicPlan, status: clinicStatus, mrr: mrrValue };
      }
      return t;
    });

    saveTenants(updated);
    setIsEditModalOpen(false);
    setSelectedTenant(null);
    showToast("Dados da clínica atualizados.");
  };

  // Delete Clinic
  const handleDeleteClinic = (id: number) => {
    if (confirm("Tem certeza que deseja excluir permanentemente esta clínica?")) {
      const updated = tenants.filter(t => t.id !== id);
      saveTenants(updated);
      showToast("Clínica excluída permanentemente.", "error");
    }
  };

  // Filter tenants
  const filteredTenants = tenants.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = planFilter === "" || t.plan.toLowerCase() === planFilter.toLowerCase();
    const matchesStatus = statusFilter === "" || t.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesPlan && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-xl relative">
      {/* Toast Alert */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-sm px-lg py-md rounded-xl shadow-lg border text-white transition-all duration-300 animate-slide-in ${
          toast.type === "success" 
            ? "bg-emerald-600 border-emerald-500" 
            : "bg-error border-error/50"
        }`}>
          <span className="material-symbols-outlined">
            {toast.type === "success" ? "check_circle" : "error"}
          </span>
          <span className="font-medium text-sm">{toast.message}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div>
          <h2 className="font-display-lg text-display-lg text-on-surface font-bold">Gestão de Unidades (Tenants)</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-xs">Visão geral e administração de todas as contas de clínicas cadastradas.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white font-label-md px-lg py-sm rounded-lg shadow-md hover:bg-primary/90 transition-colors flex items-center gap-sm h-fit cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">add_business</span>
          Cadastrar Nova Clínica
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row items-center gap-lg">
        <div className="relative w-full md:w-80 lg:w-96">
          <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
          <input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl pl-[44px] pr-md py-sm font-body-md outline-none focus:border-primary transition-all shadow-sm text-sm" 
            placeholder="Buscar por nome ou cidade..." 
            type="text"
          />
        </div>
        <div className="flex items-center gap-md w-full md:w-auto">
          <div className="relative flex-1 md:flex-initial">
            <select 
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="w-full md:w-48 appearance-none bg-surface-container-lowest border border-outline-variant/30 rounded-xl pl-md pr-xl py-sm font-body-md text-on-surface outline-none cursor-pointer shadow-sm text-sm"
            >
              <option value="">Todos os Planos</option>
              <option value="essential">Essential</option>
              <option value="pro">Pro</option>
              <option value="premium">Premium</option>
            </select>
            <span className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[18px]">expand_more</span>
          </div>
          <div className="relative flex-1 md:flex-initial">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-48 appearance-none bg-surface-container-lowest border border-outline-variant/30 rounded-xl pl-md pr-xl py-sm font-body-md text-on-surface outline-none cursor-pointer shadow-sm text-sm"
            >
              <option value="">Todos os Status</option>
              <option value="active">Ativo</option>
              <option value="suspended">Suspenso</option>
              <option value="pending">Pendente</option>
            </select>
            <span className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[18px]">expand_more</span>
          </div>
        </div>
      </div>

      {/* Data Table Card */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-surface-container-low/30 border-b border-outline-variant/10">
                <th className="py-md px-lg font-label-md text-on-surface-variant font-bold uppercase tracking-wider text-[11px]">Detalhes da Clínica</th>
                <th className="py-md px-lg font-label-md text-on-surface-variant font-bold uppercase tracking-wider text-[11px]">Plano</th>
                <th className="py-md px-lg font-label-md text-on-surface-variant font-bold uppercase tracking-wider text-[11px]">Status</th>
                <th className="py-md px-lg font-label-md text-on-surface-variant font-bold uppercase tracking-wider text-[11px]">Cadastro</th>
                <th className="py-md px-lg font-label-md text-on-surface-variant font-bold uppercase tracking-wider text-[11px] text-right">Contrib. MRR</th>
                <th className="py-md px-lg font-label-md text-on-surface-variant font-bold uppercase tracking-wider text-[11px] text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filteredTenants.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-xl text-center text-on-surface-variant font-medium">
                    Nenhuma clínica encontrada para os filtros aplicados.
                  </td>
                </tr>
              ) : (
                filteredTenants.map((row, index) => (
                  <tr key={row.id} className="hover:bg-surface-container-low/20 transition-colors group">
                    <td className="py-md px-lg">
                      <div className="flex items-center gap-md">
                        <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {row.initial}
                        </div>
                        <div>
                          <p className="font-bold text-on-surface">{row.name}</p>
                          <p className="text-[12px] text-on-surface-variant">{row.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-md px-lg">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded border font-bold text-[10px] uppercase tracking-tighter ${
                        row.plan === 'Premium' ? 'border-secondary/30 text-secondary bg-secondary/5' : 
                        row.plan === 'Pro' ? 'border-primary/30 text-primary bg-primary/5' :
                        'border-outline-variant/30 text-on-surface-variant bg-surface'
                      }`}>
                        {row.plan}
                      </span>
                    </td>
                    <td className="py-md px-lg">
                      <span className={`inline-flex items-center gap-xs px-2 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                        row.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 
                        row.status === 'Suspended' ? 'bg-error/10 text-error' : 
                        'bg-amber-100 text-amber-800'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          row.status === 'Active' ? 'bg-emerald-500' : 
                          row.status === 'Suspended' ? 'bg-error' : 
                          'bg-amber-500'
                        }`}></span>
                        {row.status === 'Active' ? 'Ativo' : row.status === 'Suspended' ? 'Suspenso' : 'Pendente'}
                      </span>
                    </td>
                    <td className="py-md px-lg text-body-sm text-on-surface-variant font-medium">{row.joined}</td>
                    <td className="py-md px-lg font-bold text-on-surface text-right">{row.mrr}</td>
                    <td className="py-md px-lg relative text-center">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdownId(openDropdownId === row.id ? null : row.id);
                        }}
                        className="w-8 h-8 rounded-full inline-flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                      
                      {openDropdownId === row.id && (
                        <>
                          <div 
                            className="fixed inset-0 z-[5]" 
                            onClick={(e) => { e.stopPropagation(); setOpenDropdownId(null); }}
                          ></div>
                          <div className={`absolute right-16 w-48 bg-surface border border-outline-variant/30 rounded-xl shadow-xl z-10 py-xs animate-slide-in ${
                            index >= filteredTenants.length - 2 && filteredTenants.length > 2 ? 'bottom-10 origin-bottom-right' : 'top-10 origin-top-right'
                          }`}>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setOpenDropdownId(null); handleOpenDetails(row); }}
                            className="w-full flex items-center gap-sm px-md py-sm text-sm text-on-surface hover:bg-surface-container-low transition-colors text-left"
                          >
                            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">visibility</span>
                            Ver Detalhes
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setOpenDropdownId(null); handleOpenEditPlan(row); }}
                            className="w-full flex items-center gap-sm px-md py-sm text-sm text-on-surface hover:bg-surface-container-low transition-colors text-left"
                          >
                            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">edit</span>
                            Editar Clínica
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setOpenDropdownId(null); handleToggleSuspend(row.id); }}
                            className={`w-full flex items-center gap-sm px-md py-sm text-sm transition-colors text-left ${
                              row.status === "Suspended"
                                ? "text-emerald-700 hover:bg-emerald-50"
                                : "text-error hover:bg-error/10"
                            }`}
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              {row.status === "Suspended" ? "check_circle" : "block"}
                            </span>
                            {row.status === "Suspended" ? "Reativar Acesso" : "Suspender Acesso"}
                          </button>
                          <div className="h-px bg-outline-variant/20 my-xs mx-md"></div>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setOpenDropdownId(null); handleDeleteClinic(row.id); }}
                            className="w-full flex items-center gap-sm px-md py-sm text-sm text-error hover:bg-error/10 transition-colors text-left"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                            Excluir Clínica
                          </button>
                        </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination Footer */}
        <div className="px-lg py-md border-t border-outline-variant/10 flex items-center justify-between bg-surface-container-low/10">
          <p className="text-[12px] text-on-surface-variant font-medium">
            Exibindo <span className="font-bold text-on-surface">{filteredTenants.length}</span> de <span className="font-bold text-on-surface">{tenants.length}</span> clínicas
          </p>
          <div className="flex items-center gap-xs">
            <button className="w-8 h-8 rounded flex items-center justify-center border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low disabled:opacity-50 transition-colors" disabled>
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <button className="w-8 h-8 rounded flex items-center justify-center border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low disabled:opacity-50 transition-colors" disabled>
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODAL: REGISTER NEW CLINIC */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm px-md">
          <div className="bg-surface border border-outline-variant/30 rounded-2xl p-xl shadow-xl w-full max-w-[500px]">
            <div className="flex justify-between items-center mb-md">
              <h3 className="font-bold text-lg text-on-surface flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary">add_business</span>
                Nova Clínica
              </h3>
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  setErrorMsg("");
                  setCurrentStep(1);
                  setCnpj("");
                  setClinicName("");
                  setClinicLocation("");
                  setContractorName("");
                  setContractorEmail("");
                  setContractorPassword("");
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center gap-sm mb-lg">
              <div className={`h-1.5 flex-1 rounded-full transition-colors ${currentStep >= 1 ? "bg-primary" : "bg-outline-variant/30"}`}></div>
              <div className={`h-1.5 flex-1 rounded-full transition-colors ${currentStep >= 2 ? "bg-primary" : "bg-outline-variant/30"}`}></div>
              <div className={`h-1.5 flex-1 rounded-full transition-colors ${currentStep >= 3 ? "bg-primary" : "bg-outline-variant/30"}`}></div>
            </div>

            <form onSubmit={handleCreateClinic} className="flex flex-col gap-md">
              
              {currentStep === 1 && (
                <div className="flex flex-col gap-md">
                  <div className="flex flex-col gap-xs">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">CNPJ (Busca Automática)</label>
                    <div className="flex gap-sm">
                      <input 
                        type="text"
                        value={cnpj}
                        onChange={(e) => setCnpj(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-md py-sm font-body-md outline-none focus:border-primary transition-all text-sm"
                        placeholder="00.000.000/0000-00"
                      />
                      <button 
                        type="button" 
                        onClick={handleCnpjSearch}
                        disabled={isLoadingCnpj}
                        className="bg-surface-container-high text-on-surface font-label-sm px-md rounded-xl hover:bg-outline-variant/30 transition-colors disabled:opacity-50 flex items-center gap-xs whitespace-nowrap cursor-pointer"
                      >
                        {isLoadingCnpj ? (
                          <span className="material-symbols-outlined animate-spin text-[18px]">autorenew</span>
                        ) : (
                          <span className="material-symbols-outlined text-[18px]">search</span>
                        )}
                        Buscar
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-xs">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Nome da Clínica *</label>
                    <input 
                      type="text"
                      value={clinicName}
                      onChange={(e) => setClinicName(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-md py-sm font-body-md outline-none focus:border-primary transition-all text-sm"
                      placeholder="Ex: Belle Ville Estética"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-xs">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Localização (Cidade/UF) *</label>
                    <input 
                      type="text"
                      value={clinicLocation}
                      onChange={(e) => setClinicLocation(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-md py-sm font-body-md outline-none focus:border-primary transition-all text-sm"
                      placeholder="Ex: São Paulo, SP"
                      required
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="flex flex-col gap-md">
                  <div className="grid grid-cols-2 gap-md">
                    <div className="flex flex-col gap-xs">
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider font-semibold">Plano</label>
                      <div className="relative">
                        <select 
                          value={clinicPlan}
                          onChange={(e) => setClinicPlan(e.target.value)}
                          className="w-full appearance-none bg-surface-container-lowest border border-outline-variant/30 rounded-xl pl-md pr-xl py-sm font-body-md text-on-surface outline-none cursor-pointer text-sm"
                        >
                          <option value="Essential">Essential (R$ 450,00)</option>
                          <option value="Pro">Pro (R$ 850,00)</option>
                          <option value="Premium">Premium (R$ 1.250,00)</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[18px]">expand_more</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-xs">
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider font-semibold">Status Inicial</label>
                      <div className="relative">
                        <select 
                          value={clinicStatus}
                          onChange={(e) => setClinicStatus(e.target.value)}
                          className="w-full appearance-none bg-surface-container-lowest border border-outline-variant/30 rounded-xl pl-md pr-xl py-sm font-body-md text-on-surface outline-none cursor-pointer text-sm"
                        >
                          <option value="Active">Ativo</option>
                          <option value="Pending">Pendente</option>
                          <option value="Suspended">Suspenso</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[18px]">expand_more</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-md mt-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-on-surface-variant">Valor Estimado (MRR):</span>
                      <span className="font-bold text-primary text-lg">
                        {clinicPlan === "Essential" ? "R$ 450,00" : clinicPlan === "Pro" ? "R$ 850,00" : "R$ 1.250,00"}
                      </span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant mt-xs">A cobrança será gerada automaticamente na data de adesão baseada no status selecionado.</p>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="flex flex-col gap-md">
                  <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md mb-xs flex items-center gap-md">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <span className="material-symbols-outlined">shield_person</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-on-surface">Conta de Administrador</p>
                      <p className="text-xs text-on-surface-variant">Esta conta terá acesso total à plataforma da clínica.</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-xs">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Nome Completo *</label>
                    <input 
                      type="text"
                      value={contractorName}
                      onChange={(e) => setContractorName(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-md py-sm font-body-md outline-none focus:border-primary transition-all text-sm"
                      placeholder="Nome do Responsável"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-xs">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">E-mail Profissional *</label>
                    <input 
                      type="email"
                      value={contractorEmail}
                      onChange={(e) => setContractorEmail(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-md py-sm font-body-md outline-none focus:border-primary transition-all text-sm"
                      placeholder="email@clinica.com.br"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-xs">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Senha Provisória *</label>
                    <input 
                      type="password"
                      value={contractorPassword}
                      onChange={(e) => setContractorPassword(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-md py-sm font-body-md outline-none focus:border-primary transition-all text-sm"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
              )}

              {errorMsg && (
                <p className="text-xs font-semibold text-error mt-xs bg-error/10 p-sm rounded-lg flex items-center gap-xs">
                  <span className="material-symbols-outlined text-[16px]">error</span>
                  {errorMsg}
                </p>
              )}

              <div className="flex justify-between items-center mt-lg border-t border-outline-variant/10 pt-md">
                <div>
                  {currentStep > 1 && (
                    <button 
                      type="button"
                      onClick={handlePrevStep}
                      className="px-md py-sm rounded-lg font-bold text-xs text-on-surface-variant hover:bg-surface-container-low transition-colors flex items-center gap-xs cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                      Voltar
                    </button>
                  )}
                </div>
                <div className="flex gap-md">
                  <button 
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setErrorMsg("");
                      setCurrentStep(1);
                      setCnpj("");
                      setClinicName("");
                      setClinicLocation("");
                      setContractorName("");
                      setContractorEmail("");
                      setContractorPassword("");
                    }}
                    className="px-lg py-sm rounded-lg font-bold text-xs text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  
                  {currentStep < 3 ? (
                    <button 
                      type="button"
                      onClick={handleNextStep}
                      className="bg-primary text-white font-bold text-xs px-lg py-sm rounded-lg shadow-md hover:bg-primary/90 transition-colors flex items-center gap-xs cursor-pointer"
                    >
                      Próximo
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  ) : (
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className={`font-bold text-xs px-lg py-sm rounded-lg shadow-md transition-colors flex items-center gap-xs ${isSubmitting ? 'bg-primary/70 text-white cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/90 cursor-pointer'}`}
                    >
                      {isSubmitting ? (
                        <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                      ) : (
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      )}
                      {isSubmitting ? "Processando..." : "Concluir Cadastro"}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT CLINIC PLAN & STATUS */}
      {isEditModalOpen && selectedTenant && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm px-md">
          <div className="bg-surface border border-outline-variant/30 rounded-2xl p-xl shadow-xl w-full max-w-[450px] animate-slide-in">
            <div className="flex justify-between items-center mb-lg">
              <h3 className="font-bold text-lg text-on-surface flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary">edit</span>
                Editar Clínica: {selectedTenant.name}
              </h3>
              <button 
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedTenant(null);
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveEditPlan} className="flex flex-col gap-md">
              <div className="flex flex-col gap-xs">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider font-semibold">Alterar Plano</label>
                <div className="relative">
                  <select 
                    value={clinicPlan}
                    onChange={(e) => setClinicPlan(e.target.value)}
                    className="w-full appearance-none bg-surface-container-lowest border border-outline-variant/30 rounded-xl pl-md pr-xl py-sm font-body-md text-on-surface outline-none cursor-pointer text-sm"
                  >
                    <option value="Essential">Essential</option>
                    <option value="Pro">Pro</option>
                    <option value="Premium">Premium</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[18px]">expand_more</span>
                </div>
              </div>

              <div className="flex flex-col gap-xs">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider font-semibold">Alterar Status</label>
                <div className="relative">
                  <select 
                    value={clinicStatus}
                    onChange={(e) => setClinicStatus(e.target.value)}
                    className="w-full appearance-none bg-surface-container-lowest border border-outline-variant/30 rounded-xl pl-md pr-xl py-sm font-body-md text-on-surface outline-none cursor-pointer text-sm"
                  >
                    <option value="Active">Ativo</option>
                    <option value="Pending">Pendente</option>
                    <option value="Suspended">Suspenso</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[18px]">expand_more</span>
                </div>
              </div>

              <div className="flex justify-end gap-md mt-lg border-t border-outline-variant/10 pt-md">
                <button 
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setSelectedTenant(null);
                  }}
                  className="px-lg py-sm rounded-lg font-bold text-xs text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="bg-primary text-white font-bold text-xs px-lg py-sm rounded-lg shadow-md hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CLINIC DETAILS */}
      {isDetailsModalOpen && selectedTenant && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm px-md">
          <div className="bg-surface border border-outline-variant/30 rounded-2xl p-xl shadow-xl w-full max-w-[450px] animate-slide-in">
            <div className="flex justify-between items-center mb-lg">
              <h3 className="font-bold text-lg text-on-surface flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary font-bold">business</span>
                Detalhes da Unidade
              </h3>
              <button 
                onClick={() => {
                  setIsDetailsModalOpen(false);
                  setSelectedTenant(null);
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-lg pb-md">
              <div className="flex items-center gap-md bg-surface-container-low/40 p-md rounded-xl border border-outline-variant/10">
                <div className="w-12 h-12 rounded bg-primary flex items-center justify-center text-white text-lg font-bold">
                  {selectedTenant.initial}
                </div>
                <div>
                  <h4 className="font-bold text-on-surface text-base">{selectedTenant.name}</h4>
                  <p className="text-xs text-on-surface-variant font-medium">{selectedTenant.location}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-lg text-sm border-t border-b border-outline-variant/10 py-md">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Identificador (ID)</span>
                  <span className="font-medium text-on-surface truncate text-xs">{selectedTenant.id}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Plano de Assinatura</span>
                  <span className="font-bold text-primary">{selectedTenant.plan}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Status da Conta</span>
                  <span className={`font-bold text-xs uppercase tracking-wider ${
                    selectedTenant.status === 'Active' ? 'text-emerald-700' : 
                    selectedTenant.status === 'Suspended' ? 'text-error' : 
                    'text-amber-700'
                  }`}>
                    {selectedTenant.status === 'Active' ? 'Ativo' : selectedTenant.status === 'Suspended' ? 'Suspenso' : 'Pendente'}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Data de Ingresso</span>
                  <span className="font-medium text-on-surface">{selectedTenant.joined}</span>
                </div>
              </div>

              <div className="flex justify-between items-center bg-primary-container/10 p-md rounded-xl border border-primary/20">
                <span className="font-semibold text-primary text-xs uppercase tracking-wider">Contribuição de Receita (MRR)</span>
                <span className="font-headline-sm text-headline-sm font-bold text-primary">{selectedTenant.mrr}</span>
              </div>
            </div>

            <div className="flex justify-end mt-md border-t border-outline-variant/10 pt-md">
              <button 
                onClick={() => {
                  setIsDetailsModalOpen(false);
                  setSelectedTenant(null);
                }}
                className="bg-primary text-white font-bold text-xs px-xl py-sm rounded-lg shadow-md hover:bg-primary/90 transition-colors cursor-pointer"
              >
                Concluído
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
