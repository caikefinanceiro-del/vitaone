"use client";

export default function SupplierPerformance() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary">Performance de Fornecedores</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Monitore métricas de entrega, confiabilidade e custos da sua cadeia de suprimentos.</p>
        </div>
        <div className="flex items-center gap-sm">
          <div className="relative bg-surface-container-lowest border border-outline-variant rounded-lg flex items-center px-3 py-2">
            <span className="material-symbols-outlined text-on-surface-variant text-[18px] mr-2">calendar_month</span>
            <select className="bg-transparent border-none p-0 font-body-sm text-body-sm text-on-surface focus:ring-0 cursor-pointer pr-6 outline-none">
              <option>Últimos 30 Dias</option>
              <option>Este Trimestre</option>
              <option>Este Ano</option>
            </select>
          </div>
          <button className="bg-primary text-white font-label-md text-label-md px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-md">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Exportar Relatório
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/10 flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">local_shipping</span>
            </div>
            <span className="font-label-sm text-label-sm px-2 py-1 bg-primary/10 text-primary rounded-md flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_down</span> -0.5d
            </span>
          </div>
          <div>
            <p className="font-body-sm text-on-surface-variant mb-1 uppercase tracking-wider text-[10px]">Tempo Médio Entrega</p>
            <h3 className="font-headline-md text-on-surface font-bold">2.4 <span className="text-body-sm font-normal">dias</span></h3>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/10 flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined">verified</span>
            </div>
            <span className="font-label-sm text-label-sm px-2 py-1 bg-surface-container text-on-surface-variant rounded-md">Estável</span>
          </div>
          <div>
            <p className="font-body-sm text-on-surface-variant mb-1 uppercase tracking-wider text-[10px]">Acurácia de Pedidos</p>
            <h3 className="font-headline-md text-on-surface font-bold">98.2%</h3>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/10 flex flex-col justify-between h-36 border-l-4 border-error">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center text-error">
              <span className="material-symbols-outlined">warning</span>
            </div>
            <span className="font-label-sm text-label-sm px-2 py-1 bg-error/10 text-error rounded-md flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +1
            </span>
          </div>
          <div>
            <p className="font-body-sm text-on-surface-variant mb-1 uppercase tracking-wider text-[10px]">Incidentes de Qualidade</p>
            <h3 className="font-headline-md text-on-surface font-bold">2 <span className="text-body-sm font-normal">este mês</span></h3>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/10 flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">payments</span>
            </div>
          </div>
          <div>
            <p className="font-body-sm text-on-surface-variant mb-1 uppercase tracking-wider text-[10px]">Gasto Total Suprimentos</p>
            <h3 className="font-headline-md text-on-surface font-bold">R$ 18.400</h3>
          </div>
        </div>
      </div>

      {/* Main Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Table Section */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 overflow-hidden flex flex-col">
          <div className="p-lg border-b border-outline-variant/30 flex justify-between items-center bg-surface-bright/50">
            <h3 className="font-headline-sm text-primary font-bold">Visão Geral de Fornecedores</h3>
            <button className="text-secondary font-bold text-label-sm hover:underline">Ver Todos</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-surface-container-low/30 border-b border-outline-variant/30">
                  <th className="py-4 px-lg font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Fornecedor</th>
                  <th className="py-4 px-lg font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Lead Time</th>
                  <th className="py-4 px-lg font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">On-time %</th>
                  <th className="py-4 px-lg font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Qualidade</th>
                  <th className="py-4 px-lg font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Status</th>
                </tr>
              </thead>
              <tbody className="text-body-sm">
                {[
                  { name: "Allergan Aesthetics", time: "1.8 dias", ontimer: "99.1%", quality: "4.9 / 5", status: "Preferencial", color: "primary" },
                  { name: "Galderma", time: "2.1 dias", ontimer: "97.5%", quality: "4.7 / 5", status: "Preferencial", color: "primary" },
                  { name: "Merz Aesthetics", time: "3.5 dias", ontimer: "92.0%", quality: "3.8 / 5", status: "Em Revisão", color: "secondary" },
                  { name: "Evolus", time: "2.8 dias", ontimer: "95.4%", quality: "4.2 / 5", status: "Ativo", color: "outline-variant" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-outline-variant/10 hover:bg-surface-container-low/20 transition-colors">
                    <td className="py-4 px-lg font-bold text-on-surface">{row.name}</td>
                    <td className="py-4 px-lg text-on-surface-variant">{row.time}</td>
                    <td className="py-4 px-lg text-on-surface font-medium">{row.ontimer}</td>
                    <td className={`py-4 px-lg font-bold ${row.color === 'primary' ? 'text-primary' : row.color === 'secondary' ? 'text-secondary' : 'text-on-surface'}`}>{row.quality}</td>
                    <td className="py-4 px-lg">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-${row.color}/10 text-${row.color} font-bold text-[11px]`}>
                        <span className={`w-1.5 h-1.5 rounded-full bg-${row.color}`}></span> {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column Widgets */}
        <div className="flex flex-col gap-gutter">
          {/* Reliability Ranking */}
          <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/10">
            <h3 className="font-headline-sm text-primary font-bold mb-2">Ranking de Confiabilidade</h3>
            <p className="font-body-sm text-on-surface-variant mb-6 text-[13px]">Pontuação baseada em velocidade, acurácia e qualidade.</p>
            <div className="space-y-4">
              {[
                { n: 1, name: "Allergan", score: "98/100", color: "bg-primary" },
                { n: 2, name: "Galderma", score: "94/100", color: "bg-primary/40" },
                { n: 3, name: "Evolus", score: "88/100", color: "bg-outline-variant/30" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-sm hover:bg-surface-container-low transition-colors rounded-lg group">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${item.color} ${item.n === 1 ? 'text-white' : 'text-on-surface'} flex items-center justify-center font-bold text-xs`}>{item.n}</div>
                    <div>
                      <p className="font-bold text-on-surface text-[14px]">{item.name}</p>
                      <p className="text-[11px] text-on-surface-variant font-medium uppercase tracking-tighter">Score: {item.score}</p>
                    </div>
                  </div>
                  {item.n === 1 && <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Cost Variance */}
          <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/10 flex-1">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-headline-sm text-primary font-bold">Variação de Custos</h3>
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">info</span>
            </div>
            <p className="font-body-sm text-on-surface-variant mb-6 text-[13px]">Flutuações de preços para itens-chave entre fornecedores.</p>
            <div className="space-y-6">
              {[
                { name: "Botox Cosmetic (100u)", range: "R$ 540 - R$ 565", p: 70, offset: 10, diff: "+2.1%", trend: "up" },
                { name: "Juvederm Voluma", range: "R$ 320 - R$ 335", p: 40, offset: 40, diff: "-0.5%", trend: "down" },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-bold text-on-surface text-[14px]">{item.name}</p>
                    <p className="text-[12px] font-bold text-on-surface">{item.range}</p>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${item.p}%`, marginLeft: `${item.offset}%` }}></div>
                  </div>
                  <p className={`text-[11px] font-bold mt-2 text-right ${item.trend === 'up' ? 'text-error' : 'text-primary'}`}>{item.diff} vs mês anterior</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Chart Section */}
      <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/10 h-[320px] flex flex-col">
        <h3 className="font-headline-sm text-primary font-bold mb-2">Tendências de Lead Time</h3>
        <p className="font-body-sm text-on-surface-variant mb-6 text-[13px]">Prazos de entrega nos últimos 6 meses para os top 3 fornecedores (em dias).</p>
        <div className="flex-1 flex items-end justify-between px-8 pb-8 border-l border-b border-outline-variant/30 relative">
          {/* Simple simulated line chart using divs and transforms could be complex, using a placeholder visual */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
            <span className="material-symbols-outlined text-[120px]">show_chart</span>
          </div>
          <div className="w-full flex justify-around text-label-sm text-on-surface-variant">
            <span>Jan</span><span>Fev</span><span>Mar</span><span>Abr</span><span>Mai</span><span>Jun</span>
          </div>
        </div>
      </div>
    </div>
  );
}