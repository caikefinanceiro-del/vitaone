"use client";

import { useState, useEffect } from "react";

type FilterPeriod = "1h" | "3h" | "6h" | "today" | "custom";

interface LogEntry {
  id: string;
  timestamp: string;
  service: string;
  tenantId: string;
  code: string;
  status: "Falhou" | "Alerta" | "Sucesso";
}

const INITIAL_LOGS: LogEntry[] = [
  { id: "1", timestamp: "Out 24, 14:32:01", service: "Stripe_Webhook", tenantId: "t_aesthetics_lux", code: "ERR_RATE_LIMIT", status: "Falhou" },
  { id: "2", timestamp: "Out 24, 14:28:15", service: "Twilio_API", tenantId: "t_dental_care", code: "WARN_HIGH_LATENCY", status: "Alerta" },
  { id: "3", timestamp: "Out 24, 14:15:22", service: "Database_Query", tenantId: "t_derma_clinic", code: "TIMEOUT_EXCEPTION", status: "Falhou" },
  { id: "4", timestamp: "Out 24, 13:50:04", service: "Pinecone_Search", tenantId: "global", code: "INDEX_SYNC_OK", status: "Sucesso" },
  { id: "5", timestamp: "Out 24, 13:45:11", service: "Stripe_Webhook", tenantId: "t_vet_health", code: "ERR_PAYMENT_DECLINED", status: "Falhou" },
];

export default function SystemHealthPage() {
  const [activeFilter, setActiveFilter] = useState<FilterPeriod>("1h");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  // Simulated metrics state
  const [metrics, setMetrics] = useState({
    twilioVol: 1248.5,
    stripeVol: 482.1,
    latency: 142,
    activeClinics: 342
  });

  // Polling simulation every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        twilioVol: +(prev.twilioVol + (Math.random() * 10 - 3)).toFixed(1), // Mostly goes up, sometimes down
        stripeVol: +(prev.stripeVol + (Math.random() * 5 - 1)).toFixed(1),
        latency: Math.floor(prev.latency + (Math.random() * 20 - 10)), // Fluctuates +/- 10ms
        activeClinics: prev.activeClinics // Usually stable
      }));
      setLastUpdated(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 5) return "Agora mesmo";
    if (seconds < 60) return `Há ${seconds}s`;
    return `Há ${Math.floor(seconds / 60)}m`;
  };

  // Simple auto-update for the "last updated" text
  const [timeAgoStr, setTimeAgoStr] = useState("Agora mesmo");
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgoStr(formatTimeAgo(lastUpdated));
    }, 1000);
    return () => clearInterval(interval);
  }, [lastUpdated]);

  return (
    <div className="flex flex-col gap-xl relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-md gap-md">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-sm">
            Saúde Global do Sistema
            <span className="flex items-center gap-1 text-xs bg-surface-container-low px-2 py-1 rounded-full text-on-surface-variant font-medium border border-outline-variant/30">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              {timeAgoStr}
            </span>
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Monitoramento em tempo real de todos os tenants e APIs conectadas (Atualiza a cada 30s).</p>
        </div>
      </div>

      {/* FILTERS BAR */}
      <div className="bg-surface-container-lowest rounded-xl p-sm shadow-sm border border-surface-variant flex flex-col md:flex-row md:items-center justify-between gap-md">
        <div className="flex items-center flex-wrap gap-xs">
          {(["1h", "3h", "6h", "today"] as FilterPeriod[]).map((period) => (
            <button
              key={period}
              onClick={() => setActiveFilter(period)}
              className={`px-4 py-1.5 rounded-lg font-label-md text-label-md transition-colors ${
                activeFilter === period 
                  ? "bg-primary text-white shadow-sm" 
                  : "bg-transparent text-on-surface hover:bg-surface-container-low"
              }`}
            >
              {period === "today" ? "Do dia" : period}
            </button>
          ))}
          
          <button
            onClick={() => setActiveFilter("custom")}
            className={`px-4 py-1.5 rounded-lg font-label-md text-label-md transition-colors flex items-center gap-1 ${
              activeFilter === "custom" 
                ? "bg-primary text-white shadow-sm" 
                : "bg-transparent text-on-surface hover:bg-surface-container-low"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">calendar_month</span>
            Período
          </button>
        </div>

        {activeFilter === "custom" && (
          <div className="flex items-center gap-sm animate-slide-in">
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-surface border border-outline-variant/50 rounded-lg px-2 py-1 text-sm outline-none focus:border-primary"
            />
            <span className="text-on-surface-variant text-sm">até</span>
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-surface border border-outline-variant/50 rounded-lg px-2 py-1 text-sm outline-none focus:border-primary"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-lg mt-sm">
        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-surface-variant flex flex-col justify-between h-40 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-4xl">chat</span>
          </div>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant relative z-10">WhatsApp Twilio Vol</span>
          <div className="relative z-10">
            <div className="font-headline-md text-headline-md text-on-surface">{metrics.twilioVol.toLocaleString('en-US')}k</div>
            <div className="text-primary font-label-md flex items-center gap-1">+8.4% <span className="material-symbols-outlined text-[14px]">trending_up</span></div>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-surface-variant flex flex-col justify-between h-40 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-4xl">payments</span>
          </div>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant relative z-10">Stripe Volume</span>
          <div className="relative z-10">
            <div className="font-headline-md text-headline-md text-on-surface">${metrics.stripeVol.toLocaleString('en-US')}k</div>
            <div className="text-primary font-label-md flex items-center gap-1">+12.1% <span className="material-symbols-outlined text-[14px]">trending_up</span></div>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-surface-variant flex flex-col justify-between h-40 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-4xl">speed</span>
          </div>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant relative z-10">Latência Global API</span>
          <div className="relative z-10">
            <div className="font-headline-md text-headline-md text-on-surface">{metrics.latency}ms</div>
            <div className={`font-label-md flex items-center gap-1 ${metrics.latency > 150 ? 'text-error' : 'text-secondary'}`}>
              {metrics.latency > 150 ? '+5ms' : '-2ms'} 
              <span className="material-symbols-outlined text-[14px]">
                {metrics.latency > 150 ? 'trending_up' : 'trending_down'}
              </span>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-surface-variant flex flex-col justify-between h-40 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-4xl">store</span>
          </div>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant relative z-10">Clínicas Ativas</span>
          <div className="relative z-10">
            <div className="font-headline-md text-headline-md text-on-surface">{metrics.activeClinics}</div>
            <div className="text-on-surface-variant font-label-sm">Estável em 4 regiões</div>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant overflow-hidden">
        <div className="p-lg border-b border-surface-variant flex justify-between items-center bg-surface-bright">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Logs de Anomalias Recentes</h3>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="font-label-md text-label-md text-primary hover:bg-primary-container/20 px-4 py-2 rounded-lg transition-colors border border-primary/20"
          >
            Ver Todos os Logs
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest border-b border-surface-variant font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                <th className="p-md font-medium">Timestamp</th>
                <th className="p-md font-medium">Serviço</th>
                <th className="p-md font-medium">ID do Tenant</th>
                <th className="p-md font-medium">Código do Evento</th>
                <th className="p-md font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-body-sm text-on-surface divide-y divide-surface-variant">
              {INITIAL_LOGS.slice(0, 2).map((log) => (
                <tr key={log.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="p-md text-on-surface-variant">{log.timestamp}</td>
                  <td className="p-md font-medium">{log.service}</td>
                  <td className="p-md">{log.tenantId}</td>
                  <td className="p-md font-mono text-xs"><span className="bg-surface p-1 rounded border border-outline-variant/30">{log.code}</span></td>
                  <td className="p-md">
                    <span className={`px-2 py-1 rounded-full font-label-sm ${
                      log.status === "Falhou" ? "bg-error/10 text-error" :
                      log.status === "Alerta" ? "bg-warning/10 text-warning-dark" :
                      "bg-secondary/10 text-secondary"
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FULL LOGS MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4 md:p-8 animate-fade-in">
          <div className="bg-surface border border-outline-variant/30 rounded-2xl shadow-2xl w-full max-w-[900px] max-h-[90vh] flex flex-col animate-slide-in">
            <div className="flex justify-between items-center p-xl border-b border-outline-variant/20 bg-surface-container-lowest rounded-t-2xl">
              <div>
                <h3 className="font-bold text-xl text-on-surface flex items-center gap-sm">
                  <span className="material-symbols-outlined text-primary">terminal</span>
                  Logs Completos do Sistema
                </h3>
                <p className="text-sm text-on-surface-variant mt-1">Mostrando registros detalhados para o período: {activeFilter}</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="overflow-y-auto flex-1 p-0 bg-surface">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-surface-container-lowest shadow-sm z-10">
                  <tr className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                    <th className="p-md font-medium border-b border-outline-variant/20">Timestamp</th>
                    <th className="p-md font-medium border-b border-outline-variant/20">Serviço</th>
                    <th className="p-md font-medium border-b border-outline-variant/20">ID do Tenant</th>
                    <th className="p-md font-medium border-b border-outline-variant/20">Código do Evento</th>
                    <th className="p-md font-medium border-b border-outline-variant/20">Status</th>
                  </tr>
                </thead>
                <tbody className="font-body-sm text-body-sm text-on-surface divide-y divide-surface-variant">
                  {INITIAL_LOGS.map((log) => (
                    <tr key={log.id} className="hover:bg-surface-container-low transition-colors">
                      <td className="p-md text-on-surface-variant whitespace-nowrap">{log.timestamp}</td>
                      <td className="p-md font-medium">{log.service}</td>
                      <td className="p-md">{log.tenantId}</td>
                      <td className="p-md font-mono text-xs"><span className="bg-surface-container-lowest p-1 rounded border border-outline-variant/30">{log.code}</span></td>
                      <td className="p-md">
                        <span className={`px-2 py-1 rounded-full font-label-sm ${
                          log.status === "Falhou" ? "bg-error/10 text-error" :
                          log.status === "Alerta" ? "bg-warning/10 text-[#B36B00]" :
                          "bg-secondary/10 text-secondary"
                        }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {/* Mocking extra rows for scrolling effect */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <tr key={`mock-${i}`} className="hover:bg-surface-container-low transition-colors opacity-70">
                      <td className="p-md text-on-surface-variant whitespace-nowrap">Out 24, {12 - i}:{(i * 14).toString().padStart(2, '0')}:11</td>
                      <td className="p-md font-medium">Internal_Job</td>
                      <td className="p-md">system</td>
                      <td className="p-md font-mono text-xs"><span className="bg-surface-container-lowest p-1 rounded border border-outline-variant/30">CRON_OK</span></td>
                      <td className="p-md">
                        <span className="px-2 py-1 rounded-full font-label-sm bg-secondary/10 text-secondary">
                          Sucesso
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-md border-t border-outline-variant/20 bg-surface-container-lowest rounded-b-2xl flex justify-between items-center">
              <span className="text-xs text-on-surface-variant">Exibindo {INITIAL_LOGS.length + 8} eventos</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded border border-outline-variant/30 text-sm text-on-surface-variant opacity-50 cursor-not-allowed">Anterior</button>
                <button className="px-3 py-1 rounded border border-outline-variant/30 text-sm hover:bg-surface-container-low">Próxima</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

