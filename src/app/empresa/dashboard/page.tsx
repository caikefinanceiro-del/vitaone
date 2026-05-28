"use client";

import Link from "next/link";

export default function ClinicDashboard() {
  return (
    <div className="flex flex-col gap-xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Overview</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Performance clínica de hoje e alertas críticos.</p>
        </div>
        <div className="flex items-center gap-md">
          <div className="bg-surface-container-low px-md py-sm rounded-lg flex items-center gap-sm text-on-surface-variant border border-outline-variant/30">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            <span className="font-label-md">Out 24, 2023</span>
            <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
        {/* Daily Revenue */}
        <div className="bg-surface-container-lowest rounded-2xl p-lg shadow-sm border border-outline-variant/10 flex flex-col justify-between h-48 group hover:shadow-md transition-all">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary">payments</span>
              <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">Receita Diária</span>
            </div>
            <div className="bg-primary/10 text-primary px-sm py-xs rounded-full text-label-sm font-medium">
              +12% vs semana passada
            </div>
          </div>
          <div>
            <h3 className="font-display-lg text-display-lg text-on-surface">$8,450<span className="text-headline-sm font-normal text-on-surface-variant">.00</span></h3>
            <div className="flex justify-between mt-md border-t border-outline-variant/30 pt-md text-label-sm text-on-surface-variant font-medium">
              <span>PIX: $4,200</span>
              <span>Cartão: $3,150</span>
              <span>Dinheiro: $1,100</span>
            </div>
          </div>
        </div>

        {/* Occupation Rate */}
        <div className="bg-surface-container-lowest rounded-2xl p-lg shadow-sm border border-outline-variant/10 flex flex-col justify-between h-48">
          <div className="flex items-center gap-sm">
            <span className="material-symbols-outlined text-primary">event_available</span>
            <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">Taxa de Ocupação</span>
          </div>
          <div>
            <h3 className="font-display-lg text-display-lg text-on-surface">92<span className="text-headline-sm font-normal text-on-surface-variant">%</span></h3>
            <div className="w-full h-2 bg-surface-container-low rounded-full mt-md overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-secondary h-full rounded-full" style={{ width: "92%" }}></div>
            </div>
            <p className="text-label-sm text-on-surface-variant mt-sm text-right">Agenda quase cheia</p>
          </div>
        </div>

        {/* No-show Rate */}
        <div className="bg-surface-container-lowest rounded-2xl p-lg shadow-sm border border-outline-variant/10 flex flex-col justify-between h-48">
          <div className="flex items-center gap-sm">
            <span className="material-symbols-outlined text-primary">person_off</span>
            <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">No-show Rate</span>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="font-display-lg text-display-lg text-on-surface">3.2<span className="text-headline-sm font-normal text-on-surface-variant">%</span></h3>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">trending_down</span>
            </div>
          </div>
          <p className="text-label-sm text-on-surface-variant">Bem abaixo da meta (5%)</p>
        </div>
      </div>

      {/* Grid: Charts & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
        {/* Main Content Area (Spans 2) */}
        <div className="lg:col-span-2 flex flex-col gap-xl">
          {/* Revenue by Professional */}
          <div className="bg-surface-container-lowest rounded-2xl p-lg shadow-sm border border-outline-variant/10 min-h-[400px]">
            <div className="flex items-center justify-between mb-lg">
              <h3 className="font-headline-md text-on-surface">Receita por Profissional</h3>
              <Link href="#" className="text-primary font-label-md flex items-center gap-xs hover:underline">
                Relatório Completo <span className="material-symbols-outlined text-[18px]">trending_flat</span>
              </Link>
            </div>
            <div className="flex flex-col gap-md">
              {[
                { name: "Dra. Ana Silva", role: "Dermatologista", val: "$4,200", p: 85 },
                { name: "Dr. Roberto Costa", role: "Procedimentos", val: "$3,150", p: 65 },
                { name: "Dra. Juliana Lima", role: "Estética", val: "$1,100", p: 40 },
              ].map((prof, i) => (
                <div key={i} className="flex flex-col gap-xs">
                  <div className="flex justify-between items-center text-body-sm">
                    <span className="font-medium text-on-surface">{prof.name} <span className="font-normal text-on-surface-variant">- {prof.role}</span></span>
                    <span className="font-bold text-primary">{prof.val}</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container-low rounded-full">
                    <div className="bg-primary h-full rounded-full" style={{ width: `${prof.p}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Column: Critical Alerts */}
        <div className="flex flex-col gap-xl">
          <div className="bg-surface-container-lowest rounded-2xl p-lg shadow-sm border border-outline-variant/10 flex flex-col gap-lg">
            <div className="flex items-center gap-sm text-error">
              <span className="material-symbols-outlined">warning</span>
              <h3 className="font-headline-sm text-on-surface">Estoque Crítico</h3>
            </div>
            
            <div className="flex flex-col gap-md">
              {[
                { name: "Botox 100U", supplier: "Allergan", stock: 2, color: "bg-error" },
                { name: "Hyaluronic Acid", supplier: "Juvederm Voluma", stock: 5, color: "bg-error/70" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-md p-md rounded-xl bg-surface border border-outline-variant/30">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant">
                    <span className="material-symbols-outlined">vaccines</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-body-sm font-medium text-on-surface">{item.name}</p>
                    <p className="font-label-sm text-on-surface-variant">Fornecedor: {item.supplier}</p>
                  </div>
                  <div className={`px-sm py-xs rounded-full ${item.color} text-on-primary font-label-sm`}>
                    {item.stock} un
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-md border border-outline-variant text-on-surface rounded-xl font-label-md hover:bg-surface-container-low transition-colors">
              Fazer Pedido de Compra
            </button>
          </div>

          <div className="bg-primary-container rounded-2xl p-lg shadow-sm text-on-primary-container flex flex-col gap-md relative overflow-hidden">
            <div className="z-10">
              <h3 className="font-headline-sm">Novidade!</h3>
              <p className="font-body-sm mt-xs opacity-90">O módulo de Automação WhatsApp está ativo para o seu plano PRO.</p>
              <button className="mt-md px-md py-sm bg-white/20 hover:bg-white/30 rounded-lg font-label-md transition-colors">
                Configurar Fluxo
              </button>
            </div>
            <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[120px] opacity-10 pointer-events-none">forum</span>
          </div>
        </div>
      </div>
    </div>
  );
}
