"use client";

import { useState, useEffect } from "react";

interface UserData {
  id: number;
  name: string;
  email: string;
  type: "ADMIN" | "STAFF" | "USER";
  clinic: string;
  status: "Active" | "Inactive" | "Suspended";
  document: string;
}

const DEFAULT_USERS: UserData[] = [
  { id: 1, name: "Carlos Oliveira", email: "carlos@clinicaaura.com", type: "ADMIN", clinic: "Aura Aesthetics", status: "Active", document: "123.456.789-00" },
  { id: 2, name: "Dra. Mariana Silva", email: "mariana@lumina.com", type: "STAFF", clinic: "Lumina Wellness", status: "Active", document: "987.654.321-11" },
  { id: 3, name: "João Pedro Santos", email: "joao.pedro@gmail.com", type: "USER", clinic: "Aura Aesthetics", status: "Active", document: "456.123.789-22" },
  { id: 4, name: "Roberto Menezes", email: "roberto@revive.com", type: "ADMIN", clinic: "Revive MedSpa", status: "Suspended", document: "12.345.678/0001-99" },
  { id: 5, name: "Ana Beatriz", email: "ana.b@gmail.com", type: "USER", clinic: "Lumina Wellness", status: "Inactive", document: "789.456.123-33" },
  { id: 6, name: "Ricardo Souza", email: "ricardo.staff@aura.com", type: "STAFF", clinic: "Aura Aesthetics", status: "Active", document: "321.654.987-44" },
];

export default function UserManagement() {
  const [users, setUsers] = useState<UserData[]>(DEFAULT_USERS);
  const [filter, setFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  // UI States
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  
  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  // Form Fields
  const [fName, setFName] = useState("");
  const [fEmail, setFEmail] = useState("");
  const [fDocument, setFDocument] = useState("");
  const [fType, setFType] = useState<"ADMIN" | "STAFF" | "USER">("STAFF");
  const [fClinic, setFClinic] = useState("");
  const [availableClinics, setAvailableClinics] = useState<string[]>(["Aura Aesthetics", "Lumina Wellness", "Revive MedSpa"]);

  useEffect(() => {
    const saved = localStorage.getItem("vitaflow-users");
    if (saved) {
      try {
        setUsers(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing users:", e);
      }
    }

    const savedTenants = localStorage.getItem("vitaflow-tenants");
    if (savedTenants) {
      try {
        const tenants = JSON.parse(savedTenants);
        const clinicNames = tenants.map((t: any) => t.name);
        if (clinicNames.length > 0) setAvailableClinics(clinicNames);
      } catch (e) {
        console.error("Error parsing tenants:", e);
      }
    }
  }, []);

  const saveUsers = (updatedList: UserData[]) => {
    setUsers(updatedList);
    localStorage.setItem("vitaflow-users", JSON.stringify(updatedList));
  };

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const filteredUsers = users.filter(u => {
    const matchesFilter = filter === "ALL" || u.type === filter;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      u.name.toLowerCase().includes(searchLower) || 
      u.email.toLowerCase().includes(searchLower) ||
      u.document.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const stats = [
    { label: "Total de Usuários", value: users.length.toString(), icon: "groups", color: "text-primary" },
    { label: "Admins (Donos)", value: users.filter(u => u.type === "ADMIN").length.toString(), icon: "admin_panel_settings", color: "text-secondary" },
    { label: "Colaboradores", value: users.filter(u => u.type === "STAFF").length.toString(), icon: "badge", color: "text-primary" },
    { label: "Usuários Finais", value: users.filter(u => u.type === "USER").length.toString(), icon: "person", color: "text-emerald-600" },
  ];

  // Actions
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if(!fName || !fEmail || !fDocument || !fClinic) return;
    
    const newUser: UserData = {
      id: Date.now(),
      name: fName,
      email: fEmail,
      document: fDocument,
      type: fType,
      clinic: fClinic,
      status: "Active"
    };
    
    saveUsers([newUser, ...users]);
    setIsCreateOpen(false);
    resetForm();
    showToast("Usuário cadastrado com sucesso!");
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!selectedUser) return;

    const updated = users.map(u => {
      if(u.id === selectedUser.id) {
        return { ...u, name: fName, email: fEmail, document: fDocument, type: fType, clinic: fClinic };
      }
      return u;
    });

    saveUsers(updated);
    setIsEditOpen(false);
    resetForm();
    showToast("Perfil de usuário atualizado.");
  };

  const toggleSuspend = (id: number) => {
    const updated = users.map(u => {
      if(u.id === id) {
        const nextStatus = u.status === "Suspended" ? "Active" : "Suspended";
        showToast(`Usuário ${u.name} ${nextStatus === "Active" ? "reativado" : "suspenso"}.`);
        return { ...u, status: nextStatus };
      }
      return u;
    });
    saveUsers(updated);
  };

  const handleDelete = (id: number) => {
    if(confirm("Deseja realmente apagar este usuário definitivamente?")) {
      const updated = users.filter(u => u.id !== id);
      saveUsers(updated);
      showToast("Usuário excluído.", "error");
    }
  };

  const openEditModal = (u: UserData) => {
    setSelectedUser(u);
    setFName(u.name);
    setFEmail(u.email);
    setFDocument(u.document);
    setFType(u.type);
    setFClinic(u.clinic);
    setIsEditOpen(true);
  };

  const openDetailsModal = (u: UserData) => {
    setSelectedUser(u);
    setIsDetailsOpen(true);
  };

  const resetForm = () => {
    setSelectedUser(null);
    setFName("");
    setFEmail("");
    setFDocument("");
    setFType("STAFF");
    setFClinic("");
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-xl relative">
      {/* Toast Alert */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-sm px-lg py-md rounded-xl shadow-lg border text-white transition-all duration-300 animate-slide-in ${
          toast.type === "success" ? "bg-emerald-600 border-emerald-500" : "bg-error border-error/50"
        }`}>
          <span className="material-symbols-outlined">{toast.type === "success" ? "check_circle" : "error"}</span>
          <span className="font-medium text-sm">{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div className="flex-1">
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Gestão Global de Usuários</h2>
          <p className="font-body-md text-on-surface-variant mt-xs">Monitore e gerencie todos os perfis cadastrados no ecossistema VitaFlow.</p>
        </div>
        <div className="flex gap-sm shrink-0">
          <button 
            onClick={() => { resetForm(); setIsCreateOpen(true); }}
            className="bg-primary text-white font-bold text-xs px-lg py-sm rounded-lg hover:bg-primary/90 transition-colors shadow-md flex items-center gap-sm"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            Novo Usuário Master
          </button>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-lg">
        {stats.map((s, i) => (
          <div key={i} className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/10 flex flex-col gap-sm transition-all duration-300">
            <div className="flex justify-between items-center">
              <span className={`material-symbols-outlined ${s.color}`}>{s.icon}</span>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{s.label}</span>
            </div>
            <div className="text-3xl font-bold text-on-surface">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-center gap-lg bg-surface-container-low/20 p-md rounded-2xl border border-outline-variant/10">
        <div className="relative flex-1 w-full md:w-auto">
          <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
          <input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-outline-variant/30 rounded-xl pl-11 pr-md py-sm font-body-sm text-on-surface outline-none focus:border-primary transition-all shadow-sm" 
            placeholder="Pesquisar por nome, e-mail ou CPF/CNPJ..." 
            type="text"
          />
        </div>
        <div className="flex items-center gap-sm w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <FilterButton active={filter === "ALL"} onClick={() => setFilter("ALL")} label="Todos" />
          <FilterButton active={filter === "ADMIN"} onClick={() => setFilter("ADMIN")} label="Donos (Admins)" />
          <FilterButton active={filter === "STAFF"} onClick={() => setFilter("STAFF")} label="Colaboradores" />
          <FilterButton active={filter === "USER"} onClick={() => setFilter("USER")} label="Usuários Finais" />
        </div>
      </div>

      {/* User Table */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-surface-container-low/30 border-b border-outline-variant/10">
                <th className="py-md px-lg font-bold text-[11px] text-on-surface-variant uppercase tracking-wider">Usuário</th>
                <th className="py-md px-lg font-bold text-[11px] text-on-surface-variant uppercase tracking-wider">CPF/CNPJ</th>
                <th className="py-md px-lg font-bold text-[11px] text-on-surface-variant uppercase tracking-wider">Perfil</th>
                <th className="py-md px-lg font-bold text-[11px] text-on-surface-variant uppercase tracking-wider">Unidade / Clínica</th>
                <th className="py-md px-lg font-bold text-[11px] text-on-surface-variant uppercase tracking-wider">Status</th>
                <th className="py-md px-lg font-bold text-[11px] text-on-surface-variant uppercase tracking-wider text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-xl text-center text-on-surface-variant font-medium">
                    Nenhum usuário encontrado para a sua busca.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u, index) => (
                  <tr key={u.id} className="hover:bg-surface-container-low/20 transition-colors group">
                    <td className="py-md px-lg">
                      <div className="flex items-center gap-md">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-on-surface text-sm">{u.name}</p>
                          <p className="text-[11px] text-on-surface-variant">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-md px-lg">
                      <p className="text-[12px] font-medium text-on-surface">{u.document}</p>
                    </td>
                    <td className="py-md px-lg">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter ${
                        u.type === 'ADMIN' ? 'bg-secondary/10 text-secondary border border-secondary/20' :
                        u.type === 'STAFF' ? 'bg-primary/10 text-primary border border-primary/20' :
                        'bg-surface-container-low text-on-surface-variant border border-outline-variant/20'
                      }`}>
                        {u.type === 'ADMIN' ? 'Dono' : u.type === 'STAFF' ? 'Colaborador' : 'Usuário'}
                      </span>
                    </td>
                    <td className="py-md px-lg">
                      <p className="text-sm font-medium text-on-surface">{u.clinic}</p>
                    </td>
                    <td className="py-md px-lg">
                      <span className={`inline-flex items-center gap-xs px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        u.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-surface-container-low text-on-surface-variant'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${u.status === 'Active' ? 'bg-emerald-500' : 'bg-outline-variant'}`}></div>
                        {u.status === 'Active' ? 'Ativo' : u.status === 'Suspended' ? 'Suspenso' : 'Inativo'}
                      </span>
                    </td>
                    <td className="py-md px-lg relative text-center">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setOpenDropdownId(openDropdownId === u.id ? null : u.id); }}
                        className="w-8 h-8 rounded-full inline-flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                      
                      {openDropdownId === u.id && (
                        <>
                          <div className="fixed inset-0 z-[5]" onClick={(e) => { e.stopPropagation(); setOpenDropdownId(null); }}></div>
                          <div className={`absolute right-16 w-48 bg-surface border border-outline-variant/30 rounded-xl shadow-xl z-10 py-xs animate-slide-in ${
                            index >= filteredUsers.length - 2 && filteredUsers.length > 2 ? 'bottom-10 origin-bottom-right' : 'top-10 origin-top-right'
                          }`}>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setOpenDropdownId(null); openDetailsModal(u); }}
                              className="w-full flex items-center gap-sm px-md py-sm text-sm text-on-surface hover:bg-surface-container-low transition-colors text-left"
                            >
                              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">visibility</span>
                              Ver Detalhes
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setOpenDropdownId(null); openEditModal(u); }}
                              className="w-full flex items-center gap-sm px-md py-sm text-sm text-on-surface hover:bg-surface-container-low transition-colors text-left"
                            >
                              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">edit</span>
                              Editar Perfil
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setOpenDropdownId(null); toggleSuspend(u.id); }}
                              className={`w-full flex items-center gap-sm px-md py-sm text-sm transition-colors text-left ${
                                u.status === "Suspended" ? "text-emerald-700 hover:bg-emerald-50" : "text-error hover:bg-error/10"
                              }`}
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                {u.status === "Suspended" ? "check_circle" : "block"}
                              </span>
                              {u.status === "Suspended" ? "Restaurar Acesso" : "Suspender Acesso"}
                            </button>
                            <div className="h-px bg-outline-variant/20 my-xs mx-md"></div>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setOpenDropdownId(null); handleDelete(u.id); }}
                              className="w-full flex items-center gap-sm px-md py-sm text-sm text-error hover:bg-error/10 transition-colors text-left"
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                              Excluir Usuário
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
            Exibindo <span className="font-bold text-on-surface">{filteredUsers.length}</span> de <span className="font-bold text-on-surface">{users.length}</span> usuários
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

      {/* MODAL: CREATE / EDIT USER */}
      {(isCreateOpen || isEditOpen) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm px-md">
          <div className="bg-surface border border-outline-variant/30 rounded-2xl p-xl shadow-xl w-full max-w-[500px] animate-slide-in">
            <div className="flex justify-between items-center mb-lg">
              <h3 className="font-bold text-lg text-on-surface flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary">{isCreateOpen ? "person_add" : "edit"}</span>
                {isCreateOpen ? "Cadastrar Novo Usuário" : "Editar Usuário"}
              </h3>
              <button 
                onClick={() => { setIsCreateOpen(false); setIsEditOpen(false); }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={isCreateOpen ? handleCreate : handleEdit} className="flex flex-col gap-md">
              <div className="flex flex-col gap-xs">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Nome Completo</label>
                <input type="text" required value={fName} onChange={e => setFName(e.target.value)} className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-md py-sm font-body-md outline-none focus:border-primary text-sm" placeholder="João da Silva"/>
              </div>

              <div className="grid grid-cols-2 gap-md">
                <div className="flex flex-col gap-xs">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">E-mail</label>
                  <input type="email" required value={fEmail} onChange={e => setFEmail(e.target.value)} className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-md py-sm font-body-md outline-none focus:border-primary text-sm" placeholder="joao@clinica.com"/>
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">CPF/CNPJ</label>
                  <input type="text" required value={fDocument} onChange={e => setFDocument(e.target.value)} className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-md py-sm font-body-md outline-none focus:border-primary text-sm" placeholder="000.000.000-00"/>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-md">
                <div className="flex flex-col gap-xs">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Tipo de Perfil</label>
                  <select value={fType} onChange={e => setFType(e.target.value as any)} className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-md py-sm font-body-md outline-none focus:border-primary text-sm">
                    <option value="ADMIN">Administrador (Dono)</option>
                    <option value="STAFF">Staff (Colaborador)</option>
                    <option value="USER">Usuário Final</option>
                  </select>
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Clínica</label>
                  <div className="relative">
                    <select required value={fClinic} onChange={e => setFClinic(e.target.value)} className="w-full appearance-none bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-md py-sm font-body-md outline-none focus:border-primary text-sm">
                      <option value="" disabled>Selecione uma clínica...</option>
                      {availableClinics.map((clinicName, i) => (
                        <option key={i} value={clinicName}>{clinicName}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[18px]">expand_more</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-md mt-lg border-t border-outline-variant/10 pt-md">
                <button type="button" onClick={() => { setIsCreateOpen(false); setIsEditOpen(false); }} className="px-lg py-sm rounded-lg font-bold text-xs text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer">Cancelar</button>
                <button type="submit" className="bg-primary text-white font-bold text-xs px-lg py-sm rounded-lg shadow-md hover:bg-primary/90 transition-colors flex items-center gap-xs cursor-pointer">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  {isCreateOpen ? "Criar Usuário" : "Salvar Alterações"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VIEW DETAILS */}
      {isDetailsOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm px-md">
          <div className="bg-surface border border-outline-variant/30 rounded-2xl p-xl shadow-xl w-full max-w-[450px] animate-slide-in">
            <div className="flex justify-between items-start mb-lg">
              <div className="flex gap-md items-center">
                 <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                   {selectedUser.name.charAt(0).toUpperCase()}
                 </div>
                 <div>
                   <h3 className="font-bold text-xl text-on-surface">{selectedUser.name}</h3>
                   <p className="text-sm text-on-surface-variant">{selectedUser.email}</p>
                 </div>
              </div>
              <button onClick={() => setIsDetailsOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-md flex flex-col gap-md">
              <div className="grid grid-cols-2 gap-sm">
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Documento</p>
                  <p className="font-medium text-sm text-on-surface">{selectedUser.document}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Status Atual</p>
                  <span className={`inline-flex items-center gap-xs px-2 py-0.5 rounded-full text-[10px] font-bold uppercase mt-1 ${selectedUser.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-surface-container-low text-on-surface-variant'}`}>
                    {selectedUser.status === 'Active' ? 'Ativo' : selectedUser.status === 'Suspended' ? 'Suspenso' : 'Inativo'}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-sm border-t border-outline-variant/10 pt-md">
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Perfil</p>
                  <p className="font-medium text-sm text-on-surface">{selectedUser.type === 'ADMIN' ? 'Dono' : selectedUser.type === 'STAFF' ? 'Colaborador' : 'Usuário'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Unidade/Clínica</p>
                  <p className="font-medium text-sm text-on-surface">{selectedUser.clinic}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-lg">
              <button onClick={() => setIsDetailsOpen(false)} className="px-lg py-sm bg-surface-container-low rounded-lg font-bold text-xs text-on-surface hover:bg-outline-variant/20 transition-colors cursor-pointer">Fechar Resumo</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function FilterButton({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`px-md py-sm rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-sm ${
        active 
          ? 'bg-primary text-white shadow-md' 
          : 'bg-white text-on-surface-variant hover:bg-surface-container-low border border-outline-variant/30'
      }`}
    >
      {label}
    </button>
  );
}
