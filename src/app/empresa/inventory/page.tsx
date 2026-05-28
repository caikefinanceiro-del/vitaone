"use client";

export default function InventoryManagement() {
  return (
    <div className="flex flex-col gap-lg">
      {/* Page Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-md shrink-0">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Gestão de Estoque</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Gerencie o estoque central, acompanhe validades e trate alertas de reposição.</p>
        </div>
        <div className="flex flex-wrap items-center gap-sm">
          <button className="flex items-center gap-sm px-md py-sm rounded-lg border border-secondary text-secondary hover:bg-secondary/10 transition-colors font-label-md text-label-md">
            <span className="material-symbols-outlined text-[18px]">tune</span>
            Configurar Alertas
          </button>
          <button className="flex items-center gap-sm px-md py-sm rounded-lg border border-secondary text-secondary hover:bg-secondary/10 transition-colors font-label-md text-label-md">
            <span className="material-symbols-outlined text-[18px]">sync_alt</span>
            Ajustar Estoque
          </button>
          <button className="flex items-center gap-sm px-md py-sm rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm font-label-md text-label-md shadow-md">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Adicionar Item
          </button>
        </div>
      </div>

      {/* Dashboard Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-lg flex-1 min-h-0">
        {/* Main Inventory Table Area */}
        <div className="xl:col-span-8 2xl:col-span-9 flex flex-col gap-md bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex-1 border border-outline-variant/10">
          {/* Toolbar / Filters */}
          <div className="p-lg border-b border-surface-container-highest bg-white shrink-0 flex flex-col md:flex-row gap-md justify-between items-center">
            {/* Search */}
            <div className="relative w-full md:w-72">
              <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
              <input 
                className="w-full pl-[36px] pr-sm py-sm border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-body-sm transition-colors bg-surface-container-lowest" 
                placeholder="Pesquisar produto, lote..." 
                type="text"
              />
            </div>
            {/* Filters */}
            <div className="flex items-center gap-sm w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <span className="font-label-sm text-label-sm text-on-surface-variant shrink-0 uppercase tracking-wider">Filtrar por:</span>
              <select className="px-sm py-[6px] border border-outline-variant rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary bg-white min-w-[120px]">
                <option>Categorias</option>
                <option>Injetáveis</option>
                <option>Consumíveis</option>
              </select>
              <select className="px-sm py-[6px] border border-outline-variant rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary bg-white min-w-[110px]">
                <option>Status</option>
                <option>Estoque Baixo</option>
                <option>Vencidos</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="flex-1 overflow-auto bg-white">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="sticky top-0 bg-surface-container-lowest z-10 shadow-sm">
                <tr>
                  <th className="py-md px-lg font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Produto</th>
                  <th className="py-md px-lg font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Categoria</th>
                  <th className="py-md px-lg font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Lote</th>
                  <th className="py-md px-lg font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Validade</th>
                  <th className="py-md px-lg font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-right">Qtd</th>
                  <th className="py-md px-lg font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-center">Status</th>
                  <th className="py-md px-md text-center"></th>
                </tr>
              </thead>
              <tbody className="font-body-sm text-body-sm text-on-surface divide-y divide-surface-container-highest">
                {[
                  { name: "Botox 100U", brand: "Allergan", cat: "Injetáveis", batch: "BX-99281", expiry: "Out 2025", qty: "145 un", status: "Healthy", color: "success" },
                  { name: "Juvederm Voluma", brand: "Allergan", cat: "Injetáveis", batch: "JV-77320", expiry: "Jan 2025", qty: "12 un", status: "Low Stock", color: "warning" },
                  { name: "Lidocaína 2%", brand: "Hospira", cat: "Consumíveis", batch: "LD-11029", expiry: "Dez 2024", qty: "210 un", status: "Healthy", color: "success" },
                  { name: "Dysport 300U", brand: "Galderma", cat: "Injetáveis", batch: "DY-44912", expiry: "Ago 2023", qty: "4 un", status: "Expired", color: "error" },
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-surface-container-low transition-colors group">
                    <td className="py-sm px-lg">
                      <div className="font-medium text-on-surface">{item.name}</div>
                      <div className="text-on-surface-variant text-[12px]">{item.brand}</div>
                    </td>
                    <td className="py-sm px-lg text-on-surface-variant">{item.cat}</td>
                    <td className="py-sm px-lg font-mono text-[13px] text-on-surface-variant">{item.batch}</td>
                    <td className={`py-sm px-lg ${item.status === 'Expired' ? 'text-error font-medium' : 'text-on-surface'}`}>{item.expiry}</td>
                    <td className={`py-sm px-lg text-right font-medium ${item.status === 'Low Stock' ? 'text-warning' : item.status === 'Expired' ? 'text-error' : ''}`}>{item.qty}</td>
                    <td className="py-sm px-lg text-center">
                      <span className={`inline-flex items-center px-[8px] py-[4px] rounded-full text-[11px] font-semibold bg-${item.color}/10 text-${item.color}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-sm px-md text-center">
                      <button className="text-on-surface-variant hover:text-primary">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar: Critical Alerts */}
        <div className="xl:col-span-4 2xl:col-span-3 flex flex-col gap-md">
          <div className="bg-white rounded-xl shadow-sm p-lg border border-outline-variant/10 flex-1">
            <div className="flex items-center justify-between mb-lg">
              <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-sm">
                <span className="material-symbols-outlined text-warning" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                Alertas Críticos
              </h3>
              <span className="bg-error text-white font-label-sm text-label-sm px-[6px] py-[2px] rounded-full">3</span>
            </div>
            
            <div className="flex flex-col gap-sm">
              <div className="p-md rounded-lg border border-error/20 bg-error/5 flex items-start gap-md">
                <span className="material-symbols-outlined text-error text-[20px]">error</span>
                <div className="flex-1">
                  <h4 className="font-label-md text-on-surface mb-xs">Produto Vencido</h4>
                  <p className="font-body-sm text-[13px] text-on-surface-variant mb-sm">
                    <strong className="text-error">Dysport 300U</strong> venceu em Ago 2023.
                  </p>
                  <button className="text-[12px] font-semibold text-secondary uppercase hover:underline">Descartar</button>
                </div>
              </div>

              <div className="p-md rounded-lg border border-warning/20 bg-warning/5 flex items-start gap-md">
                <span className="material-symbols-outlined text-warning text-[20px]">inventory_2</span>
                <div className="flex-1">
                  <h4 className="font-label-md text-on-surface mb-xs">Estoque Baixo</h4>
                  <p className="font-body-sm text-[13px] text-on-surface-variant mb-sm">
                    <strong className="text-on-surface">Juvederm Voluma</strong> está abaixo do limite mínimo.
                  </p>
                  <button className="text-[12px] font-semibold text-primary uppercase hover:underline">Repor Agora</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}