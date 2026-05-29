"use client";

import { useState } from "react";
import * as XLSX from "xlsx";

type PeriodKey = "30d" | "trimestre" | "ytd";

const MOCK_METRICS = {
  "30d": {
    label: "Últimos 30 Dias",
    mrr: "R$ 142.5K", mrrGrowth: "+12.4% vs mês anterior",
    arpu: "R$ 371,09", arpuGrowth: "+4.2% (Upsell pro/premium)",
    ltv: "R$ 48.2K", ltvDesc: "Estável em todos os tiers",
    churn: "0.8%", churnDesc: "Abaixo da meta (1.5%)",
    tiers: [
      { label: "Premium", percentage: 65, value: "R$ 92.6K", color: "bg-secondary" },
      { label: "Pro", percentage: 25, value: "R$ 35.6K", color: "bg-primary" },
      { label: "Essential", percentage: 10, value: "R$ 14.2K", color: "bg-outline-variant" },
    ],
    bars: [40, 45, 42, 55, 60, 68]
  },
  "trimestre": {
    label: "Este Trimestre",
    mrr: "R$ 410.2K", mrrGrowth: "+8.1% vs tri anterior",
    arpu: "R$ 390,50", arpuGrowth: "+6.5% (Upsell pro/premium)",
    ltv: "R$ 51.5K", ltvDesc: "Crescimento leve",
    churn: "0.75%", churnDesc: "Abaixo da meta (1.5%)",
    tiers: [
      { label: "Premium", percentage: 70, value: "R$ 287.1K", color: "bg-secondary" },
      { label: "Pro", percentage: 22, value: "R$ 90.2K", color: "bg-primary" },
      { label: "Essential", percentage: 8, value: "R$ 32.8K", color: "bg-outline-variant" },
    ],
    bars: [55, 60, 68, 70, 75, 80]
  },
  "ytd": {
    label: "Ano Corrente (YTD)",
    mrr: "R$ 1.2M", mrrGrowth: "+24.0% vs ano anterior",
    arpu: "R$ 410,00", arpuGrowth: "+11.2% (Ajuste anual)",
    ltv: "R$ 55.0K", ltvDesc: "Histórico máximo atingido",
    churn: "0.6%", churnDesc: "Excelente retenção",
    tiers: [
      { label: "Premium", percentage: 75, value: "R$ 900.0K", color: "bg-secondary" },
      { label: "Pro", percentage: 18, value: "R$ 216.0K", color: "bg-primary" },
      { label: "Essential", percentage: 7, value: "R$ 84.0K", color: "bg-outline-variant" },
    ],
    bars: [30, 40, 42, 50, 58, 68]
  }
};

export default function RevenuePage() {
  const [period, setPeriod] = useState<PeriodKey>("30d");
  const [isExporting, setIsExporting] = useState(false);

  const metrics = MOCK_METRICS[period];

  const handleExport = () => {
    setIsExporting(true);

    try {
      // 1. Aba Visão Geral Financeira
      const overviewData = [
        { Indicador: "MRR Total", Valor: metrics.mrr, Detalhe: metrics.mrrGrowth },
        { Indicador: "Ticket Médio (ARPU)", Valor: metrics.arpu, Detalhe: metrics.arpuGrowth },
        { Indicador: "Lifetime Value (LTV)", Valor: metrics.ltv, Detalhe: metrics.ltvDesc },
        { Indicador: "Churn Líquido", Valor: metrics.churn, Detalhe: metrics.churnDesc },
      ];
      const sheetOverview = XLSX.utils.json_to_sheet(overviewData);
      sheetOverview["!cols"] = [{ wch: 30 }, { wch: 20 }, { wch: 40 }];

      // 2. Aba LTV e ARPU por Tier
      const tierData = metrics.tiers.map(t => ({
        Tier: t.label,
        Participacao_Receita: t.percentage + "%",
        Receita_Absoluta: t.value,
        ARPU_Medio_Estimado: t.label === "Premium" ? "R$ 450,00" : t.label === "Pro" ? "R$ 280,00" : "R$ 150,00"
      }));
      const sheetTiers = XLSX.utils.json_to_sheet(tierData);
      sheetTiers["!cols"] = [{ wch: 20 }, { wch: 25 }, { wch: 25 }, { wch: 25 }];

      // 3. Aba Previsão de Crescimento (Simulada)
      const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
      const forecastData = metrics.bars.map((val, idx) => ({
        Mes: months[idx],
        MRR_Realizado: "R$ " + val + ".000",
        Variacao_Mensal: idx > 0 ? "+" + Math.floor(Math.random() * 5 + 1) + "%" : "-"
      }));
      // Adds projection rows
      forecastData.push({ Mes: "Jul (Proj)", MRR_Realizado: "R$ 75.000 (Prev)", Variacao_Mensal: "Tendencia Alta" });
      forecastData.push({ Mes: "Ago (Proj)", MRR_Realizado: "R$ 82.000 (Prev)", Variacao_Mensal: "Tendencia Alta" });
      forecastData.push({ Mes: "Set (Proj)", MRR_Realizado: "R$ 90.000 (Prev)", Variacao_Mensal: "Tendencia Alta" });
      
      const sheetForecast = XLSX.utils.json_to_sheet(forecastData);
      sheetForecast["!cols"] = [{ wch: 20 }, { wch: 25 }, { wch: 25 }];

      // Criar a pasta de trabalho (Workbook)
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, sheetOverview, "Visao_Geral_" + period);
      XLSX.utils.book_append_sheet(workbook, sheetTiers, "Tiers_e_ARPU");
      XLSX.utils.book_append_sheet(workbook, sheetForecast, "Projecao_Crescimento");

      // Gerar e baixar
      const dataAtual = new Date().toISOString().split('T')[0];
      XLSX.writeFile(workbook, "VitaOne_Receita_Financeira_" + dataAtual + ".xlsx");
      
    } catch (error) {
      console.error("Erro ao exportar planilha:", error);
    } finally {
      setTimeout(() => {
        setIsExporting(false);
      }, 500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">Inteligência de Receita</h1>
          <p className="font-body-md text-on-surface-variant mt-xs text-body-lg">Métricas avançadas, previsões de crescimento e análise de saúde financeira.</p>
        </div>
        <div className="flex gap-sm">
          <select 
            value={period} 
            onChange={(e) => setPeriod(e.target.value as PeriodKey)}
            className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-md py-sm text-xs font-bold focus:border-primary outline-none text-on-surface shadow-sm cursor-pointer"
          >
            <option value="30d">Últimos 30 Dias</option>
            <option value="trimestre">Este Trimestre</option>
            <option value="ytd">Ano Corrente (YTD)</option>
          </select>
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="bg-surface-container-lowest border border-outline-variant/30 text-on-surface font-bold text-xs px-md py-sm rounded-lg hover:bg-surface-container-low transition-colors flex items-center gap-xs shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className={"material-symbols-outlined text-[18px] " + (isExporting ? "animate-spin" : "")}>
              {isExporting ? "sync" : "download"}
            </span>
            {isExporting ? "Gerando..." : "Exportar Relatório"}
          </button>
        </div>
      </div>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
        {/* MRR Card */}
        <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/10 transition-all duration-300">
          <div className="flex justify-between items-start mb-md">
            <h3 className="font-bold text-[11px] text-on-surface-variant uppercase tracking-widest">MRR Total</h3>
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
          </div>
          <div className="text-4xl font-bold text-on-surface mb-xs">{metrics.mrr}</div>
          <div className="flex items-center gap-xs text-emerald-600 font-bold text-xs">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            <span>{metrics.mrrGrowth}</span>
          </div>
        </div>

        {/* ARPU Card */}
        <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/10 transition-all duration-300">
          <div className="flex justify-between items-start mb-md">
            <h3 className="font-bold text-[11px] text-on-surface-variant uppercase tracking-widest">Ticket Médio (ARPU)</h3>
            <span className="material-symbols-outlined text-primary">analytics</span>
          </div>
          <div className="text-4xl font-bold text-on-surface mb-xs">{metrics.arpu}</div>
          <div className="flex items-center gap-xs text-emerald-600 font-bold text-xs">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            <span>{metrics.arpuGrowth}</span>
          </div>
        </div>

        {/* LTV Card */}
        <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/10 transition-all duration-300">
          <div className="flex justify-between items-start mb-md">
            <h3 className="font-bold text-[11px] text-on-surface-variant uppercase tracking-widest">Lifetime Value (LTV)</h3>
            <span className="material-symbols-outlined text-primary">monetization_on</span>
          </div>
          <div className="text-4xl font-bold text-on-surface mb-xs">{metrics.ltv}</div>
          <div className="flex items-center gap-xs text-on-surface-variant font-bold text-xs">
            <span className="material-symbols-outlined text-[16px]">horizontal_rule</span>
            <span>{metrics.ltvDesc}</span>
          </div>
        </div>

        {/* Churn Card */}
        <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/10 transition-all duration-300">
          <div className="flex justify-between items-start mb-md">
            <h3 className="font-bold text-[11px] text-on-surface-variant uppercase tracking-widest">Churn Líquido</h3>
            <span className="material-symbols-outlined text-error">heart_broken</span>
          </div>
          <div className="text-4xl font-bold text-on-surface mb-xs">{metrics.churn}</div>
          <div className="flex items-center gap-xs text-emerald-600 font-bold text-xs">
            <span className="material-symbols-outlined text-[16px]">trending_down</span>
            <span>{metrics.churnDesc}</span>
          </div>
        </div>
      </div>

      {/* Charts & Distribution Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
        {/* Forecast Chart (Spans 8) */}
        <div className="lg:col-span-8 bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/10 flex flex-col min-h-[400px]">
          <div className="flex justify-between items-center mb-xl">
            <div>
              <h2 className="font-bold text-on-surface">Crescimento de MRR & Previsão</h2>
              <p className="text-xs text-on-surface-variant mt-1">Realizado vs Projeção ({metrics.label})</p>
            </div>
            <div className="flex gap-lg">
              <span className="flex items-center gap-xs text-[10px] font-bold text-on-surface-variant uppercase tracking-widest"><div className="w-3 h-3 bg-primary rounded-sm"></div> Realizado</span>
              <span className="flex items-center gap-xs text-[10px] font-bold text-on-surface-variant uppercase tracking-widest"><div className="w-3 h-3 bg-primary/20 border border-primary/40 border-dashed rounded-sm"></div> Projeção</span>
            </div>
          </div>
          
          <div className="flex-1 relative mt-md flex items-end gap-sm md:gap-lg pt-lg border-b border-outline-variant/20">
            {/* Y-Axis Simulation */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-0">
              {[150, 100, 50, 0].map((val) => (
                <div key={val} className="border-t border-outline-variant/10 w-full h-0 relative">
                  <span className="absolute -top-3 -left-10 text-[10px] font-bold text-outline-variant/60">{val}k</span>
                </div>
              ))}
            </div>
            {/* Bars Simulation */}
            {metrics.bars.map((h, i) => (
              <div key={i} className="flex-1 bg-primary rounded-t-lg transition-all duration-500 hover:opacity-80 group relative" style={{ height: h + "%" }}>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-inverse-surface text-white text-[10px] font-bold py-1 px-2 rounded-md transition-all whitespace-nowrap shadow-lg">
                  Mês {i+1}: R$ {h}K
                </div>
              </div>
            ))}
            {/* Forecast Bars */}
            {[75, 82, 90].map((h, i) => (
              <div key={"proj"+i} className="flex-1 bg-primary/10 border-t-2 border-x-2 border-primary/30 border-dashed rounded-t-lg transition-all duration-500 hover:bg-primary/20" style={{ height: h + "%" }}></div>
            ))}
          </div>
          <div className="flex justify-between mt-sm px-2">
            {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul*", "Ago*", "Set*"].map(m => (
              <span key={m} className="text-[10px] font-bold text-on-surface-variant uppercase">{m}</span>
            ))}
          </div>
        </div>

        {/* Revenue by Tier (Spans 4) */}
        <div className="lg:col-span-4 bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/10 flex flex-col">
          <h2 className="font-bold text-on-surface mb-lg">Receita por Tier</h2>
          <div className="flex-1 flex flex-col justify-center gap-xl">
            {metrics.tiers.map((tier, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-xs">
                  <span className="font-bold text-xs text-on-surface flex items-center gap-xs">
                    <div className={"w-2 h-2 rounded-full " + tier.color}></div>
                    {tier.label}
                  </span>
                  <span className="font-bold text-xs text-on-surface-variant">{tier.percentage}% ({tier.value})</span>
                </div>
                <div className="w-full bg-surface-container-low rounded-full h-2">
                  <div className={tier.color + " h-2 rounded-full transition-all duration-1000"} style={{ width: tier.percentage + "%" }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-xl pt-lg border-t border-outline-variant/10">
            <div className="flex items-center gap-sm bg-primary/5 p-md rounded-xl">
              <span className="material-symbols-outlined text-primary text-[20px]">lightbulb</span>
              <p className="text-[11px] text-on-surface-variant italic leading-relaxed">
                A expansão do tier <span className="font-bold text-primary">Premium</span> representa {metrics.tiers[0].percentage}% do novo MRR captado neste período.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
