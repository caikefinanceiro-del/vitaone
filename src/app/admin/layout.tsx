"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TopAppBar } from "@/components/TopAppBar";
import { ADMIN_NAV } from "@/lib/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background text-on-background font-body-md overflow-hidden">
      <Sidebar items={ADMIN_NAV} className="hidden md:flex" />

      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[260px] bg-surface shadow-xl animate-slide-in">
            <Sidebar items={ADMIN_NAV} className="flex w-full" isMobile={true} />
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <TopAppBar onMenuToggle={() => setMobileSidebarOpen((v) => !v)} />
        <div className="flex-1 overflow-y-auto p-md md:p-xl">{children}</div>
      </main>
    </div>
  );
}
