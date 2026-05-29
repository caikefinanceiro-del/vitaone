"use client";

import { useState } from "react";
import * as XLSX from "xlsx";

export default function AdminMasterDashboard() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);

    try {
      // 1. Aba Resumo Executivo
      const resumoData = [
        { Metrica: "Monthly Recurring Revenue (MRR)", Valor: "$1,240,000", Crescimento: "+12.4%" },
        { Metrica: "Clinic Churn Rate", Valor: "0.8%", Crescimento: "-0.2%" },
        { Metrica: "Active Clinics", Valor: "842", Crescimento: "+42 nessa semana" },
        { Metrica: "Stripe Volume", Valor: "$4,200,000", Crescimento: "-" },
        { Metrica: "WhatsApp Msgs", Valor: "1,200,000", Crescimento: "-" },
      ];
      const sheetResumo = XLSX.utils.json_to_sheet(resumoData);
      sheetResumo["!cols"] = [{ wch: 35 }, { wch: 15 }, { wch: 20 }];

      // 2. Aba Clínicas Ativas (Tenants)
      const clinicasData = [
        { ID: "t_aesthetics_lux", Nome: "Aesthetics Beverly Hills", Plano: "Premium", Regiao: "US-West", Status: "Ativa", DataCadastro: "2025-10-01" },
        { ID: "t_dental_care", Nome: "Dental Care Co.", Plano: "Standard", Regiao: "US-East", Status: "Ativa", DataCadastro: "2025-11-15" },
        { ID: "t_derma_clinic", Nome: "Derma Clinic", Plano: "Premium", Regiao: "EU-Central", Status: "Bloqueada", DataCadastro: "2025-12-05" },
        { ID: "t_vet_health", Nome: "Vet Health & Spa", Plano: "Basic", Regiao: "BR-South", Status: "Ativa", DataCadastro: "2026-01-20" },
        { ID: "t_physio_pro", Nome: "Physio Pro Center", Plano: "Premium", Regiao: "US-East", Status: "Ativa", DataCadastro: "2026-02-10" },
      ];
      const sheetClinicas = XLSX.utils.json_to_sheet(clinicasData);
      sheetClinicas["!cols"] = [{ wch: 20 }, { wch: 30 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 20 }];

      // 3. Aba Faturamento Stripe
      const stripeData = [
        { TransacaoID: "pi_3OQ...", Clinica: "Aesthetics Beverly Hills", Valor: "$1,250.00", Status: "Succeeded", Data: "2026-05-28 14:30:00" },
        { TransacaoID: "pi_3OR...", Clinica: "Dental Care Co.", Valor: "$450.00", Status: "Succeeded", Data: "2026-05-28 13:15:00" },
        { TransacaoID: "pi_3OS...", Clinica: "Derma Clinic", Valor: "$1,250.00", Status: "Failed (Insufficient Funds)", Data: "2026-05-28 11:00:00" },
        { TransacaoID: "pi_3OT...", Clinica: "Vet Health & Spa", Valor: "$150.00", Status: "Succeeded", Data: "2026-05-28 09:45:00" },
      ];
      const sheetStripe = XLSX.utils.json_to_sheet(stripeData);
      sheetStripe["!cols"] = [{ wch: 20 }, { wch: 30 }, { wch: 15 }, { wch: 25 }, { wch: 25 }];

      // 4. Aba Consumo Twilio
      const twilioData = [
        { Clinica: "Aesthetics Beverly Hills", Tipo: "WhatsApp Template", Quantidade: 45020, Custo: "$450.20", Periodo: "Maio 2026" },
        { Clinica: "Dental Care Co.", Tipo: "WhatsApp Session", Quantidade: 12050, Custo: "$120.50", Periodo: "Maio 2026" },
        { Clinica: "Vet Health & Spa", Tipo: "SMS", Quantidade: 500, Custo: "$15.00", Periodo: "Maio 2026" },
        { Clinica: "Physio Pro Center", Tipo: "WhatsApp Template", Quantidade: 32000, Custo: "$320.00", Periodo: "Maio 2026" },
      ];
      const sheetTwilio = XLSX.utils.json_to_sheet(twilioData);
      sheetTwilio["!cols"] = [{ wch: 30 }, { wch: 25 }, { wch: 15 }, { wch: 15 }, { wch: 15 }];

      // Criar a pasta de trabalho (Workbook) e anexar as 4 planilhas
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, sheetResumo, "Resumo_Executivo");
      XLSX.utils.book_append_sheet(workbook, sheetClinicas, "Clinicas_Ativas");
      XLSX.utils.book_append_sheet(workbook, sheetStripe, "Faturamento_Stripe");
      XLSX.utils.book_append_sheet(workbook, sheetTwilio, "Consumo_Twilio");

      // Gerar e baixar o arquivo .xlsx
      const dataAtual = new Date().toISOString().split('T')[0];
      XLSX.writeFile(workbook, "VitaOne_Dashboard_Relatorio_" + dataAtual + ".xlsx");
      
    } catch (error) {
      console.error("Erro ao exportar planilha:", error);
    } finally {
      // Simular um pequeno tempo de carregamento para UX
      setTimeout(() => {
        setIsExporting(false);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col gap-xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Overview</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Métricas mestre e saúde do sistema para VitaOne.</p>
        </div>
        <button 
          onClick={handleExport}
          disabled={isExporting}
          className="flex items-center gap-sm px-md py-sm border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-low transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className={`material-symbols-outlined text-[18px] ${isExporting ? 'animate-spin' : ''}`}>
            {isExporting ? 'sync' : 'download'}
          </span>
          {isExporting ? 'Gerando...' : 'Exportar Relatório'}
        </button>
      </div>

      {/* Bento Grid: KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
        {/* MRR Card */}
        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm ambient-shadow flex flex-col justify-between h-48 relative overflow-hidden group border border-outline-variant/10">
          <div className="flex justify-between items-start z-10 relative">
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Monthly Recurring Revenue</p>
              <h3 className="font-display-lg text-display-lg text-primary mt-sm">$1.24M</h3>
            </div>
            <div className="bg-primary-container/10 px-sm py-xs rounded-full flex items-center gap-xs text-primary-container">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span className="font-label-md text-label-md">12.4%</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-24 flex items-end gap-1 px-lg pb-md opacity-20 group-hover:opacity-40 transition-opacity">
            <div className="w-full h-[20%] bg-primary-container rounded-t-sm"></div>
            <div className="w-full h-[25%] bg-primary-container rounded-t-sm"></div>
            <div className="w-full h-[40%] bg-primary-container rounded-t-sm"></div>
            <div className="w-full h-[35%] bg-primary-container rounded-t-sm"></div>
            <div className="w-full h-[60%] bg-primary-container rounded-t-sm"></div>
            <div className="w-full h-[80%] bg-primary-container rounded-t-sm"></div>
            <div className="w-full h-[100%] bg-primary rounded-t-sm"></div>
          </div>
        </div>

        {/* Churn Card */}
        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm ambient-shadow flex flex-col justify-between h-48 relative overflow-hidden border border-outline-variant/10">
          <div className="flex justify-between items-start z-10">
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Clinic Churn Rate</p>
              <h3 className="font-display-lg text-display-lg text-on-surface mt-sm">0.8%</h3>
            </div>
            <div className="bg-primary-container/10 px-sm py-xs rounded-full flex items-center gap-xs text-primary-container">
              <span className="material-symbols-outlined text-[14px]">trending_down</span>
              <span className="font-label-md text-label-md">0.2%</span>
            </div>
          </div>
          <div className="w-full h-16 flex items-center relative mt-auto">
            <div className="absolute w-full h-px bg-outline-variant top-1/2 -translate-y-1/2 border-dashed border-b"></div>
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
              <path className="opacity-70" d="M0,20 Q25,30 50,15 T100,25" fill="none" stroke="#115e59" strokeWidth="2"></path>
            </svg>
          </div>
        </div>

        {/* Total Clinics Card */}
        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm ambient-shadow flex flex-col justify-between h-48 border border-outline-variant/10">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Active Clinics</p>
              <h3 className="font-display-lg text-display-lg text-on-surface mt-sm">842</h3>
            </div>
            <div className="w-10 h-10 bg-surface-container-low rounded-full flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined">domain</span>
            </div>
          </div>
          <div className="flex items-center gap-sm mt-auto">
            <div className="flex -space-x-3">
              <div className="w-8 h-8 rounded-full bg-tertiary-fixed border-2 border-surface-container-lowest flex items-center justify-center text-label-sm">C1</div>
              <div className="w-8 h-8 rounded-full bg-secondary-container border-2 border-surface-container-lowest flex items-center justify-center text-label-sm">C2</div>
              <div className="w-8 h-8 rounded-full bg-primary-fixed border-2 border-surface-container-lowest flex items-center justify-center text-label-sm">C3</div>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant ml-sm">+42 onboards essa semana</p>
          </div>
        </div>
      </div>

      {/* API & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant/10">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-lg">Volume de API e Transações</h3>
          <div className="flex gap-xl h-64">
            <div className="flex-1 flex flex-col">
              <p className="font-label-md text-on-surface-variant mb-sm">Stripe Volume ($4.2M)</p>
              <div className="flex-1 bg-surface-container-low rounded-lg p-sm flex items-end gap-1">
                <div className="w-full bg-primary-container/80 h-[85%] rounded-sm"></div>
                <div className="w-full bg-primary h-[100%] rounded-sm"></div>
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <p className="font-label-md text-on-surface-variant mb-sm">WhatsApp Msgs (1.2M)</p>
              <div className="flex-1 bg-surface-container-low rounded-lg p-sm flex items-end gap-1">
                <div className="w-full bg-secondary-container h-[65%] rounded-sm"></div>
                <div className="w-full bg-secondary h-[90%] rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-outline-variant/10">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-lg">Atividade Recente</h3>
          <div className="flex flex-col gap-md">
            <div className="flex gap-md items-start">
              <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center shrink-0 mt-1 text-primary shadow-sm">
                <span className="material-symbols-outlined">rocket_launch</span>
              </div>
              <div>
                <p className="font-body-sm text-on-surface"><span className="font-medium">Aesthetics Beverly Hills</span> upgrade Premium.</p>
                <p className="font-label-sm text-on-surface-variant">Há 2 horas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
