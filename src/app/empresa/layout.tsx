"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TopAppBar } from "@/components/TopAppBar";
import { EMPRESA_NAV } from "@/lib/navigation";

export default function EmpresaLayout({ children }: { children: React.ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background text-on-background font-body-md overflow-hidden">
      <Sidebar items={EMPRESA_NAV} className="hidden md:flex" />

      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[260px] bg-surface shadow-xl animate-slide-in">
            <Sidebar items={EMPRESA_NAV} className="flex w-full" isMobile={true} />
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <TopAppBar onMenuToggle={() => setMobileSidebarOpen((v) => !v)} />
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-md md:p-xl">
          <div className="w-full max-w-7xl mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}
