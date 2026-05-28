"use client";

import { useState } from "react";

export default function UserManagement() {
  const [filter, setFilter] = useState("ALL");

  const users = [
    { id: 1, name: "Carlos Oliveira", email: "carlos@clinicaaura.com", type: "ADMIN", clinic: "Aura Aesthetics", status: "Active", document: "123.456.789-00" },
    { id: 2, name: "Dra. Mariana Silva", email: "mariana@lumina.com", type: "STAFF", clinic: "Lumina Wellness", status: "Active", document: "987.654.321-11" },
    { id: 3, name: "João Pedro Santos", email: "joao.pedro@gmail.com", type: "USER", clinic: "Aura Aesthetics", status: "Active", document: "456.123.789-22" },
    { id: 4, name: "Roberto Menezes", email: "roberto@revive.com", type: "ADMIN", clinic: "Revive MedSpa", status: "Suspended", document: "12.345.678/0001-99" },
    { id: 5, name: "Ana Beatriz", email: "ana.b@gmail.com", type: "USER", clinic: "Lumina Wellness", status: "Inactive", document: "789.456.123-33" },
    { id: 6, name: "Ricardo Souza", email: "ricardo.staff@aura.com", type: "STAFF", clinic: "Aura Aesthetics", status: "Active", document: "321.654.987-44" },
  ];

  const filteredUsers = filter === "ALL" ? users : users.filter(u => u.type === filter);

  const stats = [
    { label: "Total de Usuários", value: "1.2k", icon: "groups", color: "text-primary" },
    { label: "Admins (Donos)", value: "384", icon: "admin_panel_settings", color: "text-secondary" },
    { label: "Colaboradores", value: "2.1k", icon: "badge", color: "text-primary" },
    { label: "Usuários Finais", value: "8.5k", icon: "person", color: "text-emerald-600" },
  ];

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div className="flex-1">
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Gestão Global de Usuários</h2>
          <p className="font-body-md text-on-surface-variant mt-xs">Monitore e gerencie todos os perfis cadastrados no ecossistema VitaFlow.</p>
        </div>
        <div className="flex gap-sm shrink-0">
          <button className="bg-primary text-white font-bold text-xs px-lg py-sm rounded-lg hover:bg-primary/90 transition-colors shadow-md flex items-center gap-sm">
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            Novo Usuário Master
          </button>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-lg">
        {stats.map((s, i) => (
          <div key={i} className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/10 flex flex-col gap-sm">
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
          <input className="w-full bg-white border border-outline-variant/30 rounded-xl pl-11 pr-md py-sm font-body-sm text-on-surface outline-none focus:border-primary transition-all" placeholder="Pesquisar por nome, e-mail ou CPF/CNPJ..." type="text"/>
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
          <table className="w-full text-left border-collapse">
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
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-surface-container-low/10 transition-colors group">
                  <td className="py-md px-lg">
                    <div className="flex items-center gap-md">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                        {u.name.charAt(0)}
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
                      {u.status === 'Active' ? 'Ativo' : 'Suspenso'}
                    </span>
                  </td>
                  <td className="py-md px-lg">
                    <div className="flex items-center justify-center gap-sm">
                      <button className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </button>
                      <button className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-error/10 hover:text-error transition-colors">
                        <span className="material-symbols-outlined text-[18px]">block</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FilterButton({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`px-md py-sm rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
        active 
          ? 'bg-primary text-white shadow-md' 
          : 'bg-white text-on-surface-variant hover:bg-surface-container-low border border-outline-variant/30'
      }`}
    >
      {label}
    </button>
  );
}
