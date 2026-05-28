"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/use-auth";

export function TopAppBar({ onMenuToggle }: { onMenuToggle?: () => void }) {
  const { user } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const notifications = [
    { id: 1, title: "Estoque Baixo", message: "Botox (100u) atingiu o nível crítico.", time: "5 min atrás", type: "error" },
    { id: 2, title: "Novo Agendamento", message: "Mariana Silva agendou Limpeza de Pele.", time: "15 min atrás", type: "info" },
    { id: 3, title: "Pagamento Confirmado", message: "Sinal do paciente João Pedro recebido.", time: "1h atrás", type: "success" },
  ];

  const helpLinks = [
    { label: "Centro de Ajuda", icon: "help_center" },
    { label: "Documentação da API", icon: "menu_book" },
    { label: "Suporte via WhatsApp", icon: "chat" },
    { label: "Atalhos do Teclado", icon: "keyboard" },
  ];

  return (
    <header className="z-40 shadow-sm bg-surface flex justify-between items-center w-full px-lg py-sm h-16 sticky top-0 border-b border-outline-variant/30">
      <div className="flex-1 flex items-center">
        {onMenuToggle && (
          <button 
            onClick={onMenuToggle}
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low mr-sm"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        )}
      </div>
      <div className="flex items-center gap-md">
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setHelpOpen(false);
            }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors relative ${notificationsOpen ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
          </button>

          {notificationsOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setNotificationsOpen(false)}></div>
              <div className="absolute right-0 mt-2 w-80 bg-surface border border-outline-variant/30 rounded-xl shadow-xl z-50 overflow-hidden animate-slide-in">
                <div className="p-md border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low/30">
                  <h3 className="font-bold text-on-surface text-sm">Notificações</h3>
                  <button className="text-[10px] font-bold text-primary hover:underline uppercase">Limpar tudo</button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-md border-b border-outline-variant/10 hover:bg-surface-container-low/20 cursor-pointer transition-colors group">
                      <div className="flex gap-md">
                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                          n.type === 'error' ? 'bg-error' : n.type === 'success' ? 'bg-emerald-500' : 'bg-primary'
                        }`}></div>
                        <div className="flex-1">
                          <p className="font-bold text-on-surface text-xs group-hover:text-primary transition-colors">{n.title}</p>
                          <p className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">{n.message}</p>
                          <p className="text-[10px] text-outline mt-2 font-medium">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full py-sm text-center text-primary font-bold text-xs hover:bg-primary/5 transition-colors">
                  Ver todas as notificações
                </button>
              </div>
            </>
          )}
        </div>

        {/* Help Dropdown */}
        <div className="relative">
          <button 
            onClick={() => {
              setHelpOpen(!helpOpen);
              setNotificationsOpen(false);
            }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors relative ${helpOpen ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
          >
            <span className="material-symbols-outlined">help_outline</span>
          </button>

          {helpOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setHelpOpen(false)}></div>
              <div className="absolute right-0 mt-2 w-64 bg-surface border border-outline-variant/30 rounded-xl shadow-xl z-50 overflow-hidden animate-slide-in">
                <div className="p-md border-b border-outline-variant/30 bg-surface-container-low/30">
                  <h3 className="font-bold text-on-surface text-sm">Ajuda e Suporte</h3>
                </div>
                <div className="py-xs">
                  {helpLinks.map((link, i) => (
                    <button key={i} className="w-full flex items-center gap-md px-md py-sm hover:bg-surface-container-low/50 text-on-surface transition-colors group">
                      <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-[20px]">{link.icon}</span>
                      <span className="text-xs font-medium">{link.label}</span>
                    </button>
                  ))}
                </div>
                <div className="p-md border-t border-outline-variant/30 bg-surface-container-low/10">
                  <p className="text-[10px] text-on-surface-variant">Versão do Sistema: 2.4.0-stable</p>
                </div>
              </div>
            </>
          )}
        </div>

        <Link 
          href="/empresa/profile"
          className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant ml-sm cursor-pointer hover:opacity-80 transition-all"
        >
          <img 
            alt="User avatar" 
            className="w-full h-full object-cover" 
            src={user?.avatar || "https://lh3.googleusercontent.com/a/default-user=s96-c"} 
          />
        </Link>
      </div>
    </header>
  );
}
