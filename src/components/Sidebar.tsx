"use client";

import { useAuth } from "@/lib/use-auth";
import { usePathname, useRouter } from "next/navigation";
import type { NavItem } from "@/lib/navigation";
import { useSidebar } from "@/lib/sidebar-context";

export function Sidebar({ items, className = "hidden md:flex", isMobile = false }: { items: NavItem[]; className?: string; isMobile?: boolean }) {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const { isCollapsed: contextCollapsed, toggleCollapse } = useSidebar();
  const isCollapsed = isMobile ? false : contextCollapsed;

  const isAdmin = pathname.startsWith("/admin");

  return (
    <aside 
      className={`flex flex-col h-full bg-surface border-r border-outline-variant flex-shrink-0 z-50 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-[80px]" : "w-[260px]"
      } ${className}`}
    >
      <div className={`py-xl flex items-center justify-between transition-all duration-300 ${
        isCollapsed ? "px-sm flex-col gap-sm" : "px-lg"
      }`}>
        <div className="flex items-center gap-md overflow-hidden">
          <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>health_and_safety</span>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col transition-all duration-300 ease-in-out opacity-100 whitespace-nowrap">
              <h1 className="font-headline-sm text-headline-sm font-bold text-primary leading-tight">VitaFlow</h1>
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                {isAdmin ? "Admin Master" : "Clinic Management"}
              </p>
            </div>
          )}
        </div>
        
        {!isMobile && (
          <button
            onClick={toggleCollapse}
            className={`w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low text-on-surface-variant hover:text-primary transition-all duration-200 border border-outline-variant/30 ${
              isCollapsed ? "mt-xs" : ""
            }`}
            title={isCollapsed ? "Expandir menu" : "Recolher menu"}
          >
            <span className="material-symbols-outlined text-lg">
              {isCollapsed ? "chevron_right" : "chevron_left"}
            </span>
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-sm py-sm flex flex-col gap-xs">
        {items.map((item) => {
          const isActive = pathname === item.href || (item.href.split("/").length > 2 && pathname.startsWith(item.href));
          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              title={isCollapsed ? item.label : undefined}
              className={`w-full flex items-center rounded-lg font-body-md text-body-md transition-all text-left border-l-4 ${
                isCollapsed 
                  ? "justify-center py-md px-0 border-l-0" 
                  : "gap-md px-lg py-md border-l-4"
              } ${
                isActive
                  ? "bg-primary-container/10 text-primary font-medium border-primary"
                  : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary border-transparent"
              }`}
            >
              <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                {item.icon}
              </span>
              {!isCollapsed && <span className="truncate whitespace-nowrap">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className={`p-sm border-t border-outline-variant/50 space-y-xs mt-auto ${isCollapsed ? "flex flex-col items-center" : ""}`}>
        <button
          onClick={() => router.push(isAdmin ? "/admin/settings" : "/empresa/settings")}
          title={isCollapsed ? "Configurações" : undefined}
          className={`w-full flex items-center rounded-lg font-body-md text-body-md transition-all text-left ${
            isCollapsed ? "justify-center py-md px-0" : "gap-md px-lg py-md"
          } text-on-surface-variant hover:bg-surface-container-low hover:text-primary`}
        >
          <span className="material-symbols-outlined">settings</span>
          {!isCollapsed && <span className="truncate whitespace-nowrap">Configurações</span>}
        </button>
        <button
          onClick={logout}
          title={isCollapsed ? "Sair" : undefined}
          className={`w-full flex items-center rounded-lg font-body-md text-body-md transition-all text-left ${
            isCollapsed ? "justify-center py-md px-0" : "gap-md px-lg py-md"
          } text-on-surface-variant hover:bg-surface-container-low hover:text-error`}
        >
          <span className="material-symbols-outlined">logout</span>
          {!isCollapsed && <span className="truncate whitespace-nowrap">Sair</span>}
        </button>
      </div>
    </aside>
  );
}

