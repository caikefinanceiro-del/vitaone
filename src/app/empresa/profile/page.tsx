"use client";

import { useAuth } from "@/lib/use-auth";

export default function UserProfile() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-xl">
      {/* Profile Hero */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden">
        <div className="h-32 bg-primary/10 relative">
          <div className="absolute -bottom-12 left-8">
            <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md">
              <img 
                src={user?.avatar || "https://lh3.googleusercontent.com/a/default-user=s96-c"} 
                className="w-full h-full object-cover" 
                alt="Profile"
              />
            </div>
          </div>
        </div>
        <div className="pt-16 pb-8 px-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-headline-lg text-on-surface font-bold">{user?.name || "Usuário"}</h2>
              <p className="font-body-md text-on-surface-variant">{user?.role === 'admin_master' ? 'Administrador Geral' : 'Gerente de Unidade'}</p>
            </div>
            <button className="px-md py-sm bg-primary text-white rounded-lg font-bold text-xs hover:bg-primary/90 transition-colors shadow-sm">
              Editar Perfil
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Personal Info - Span 7 */}
        <section className="md:col-span-7 bg-surface-container-lowest rounded-xl shadow-sm p-lg border border-outline-variant/10">
          <h3 className="font-headline-sm text-on-surface mb-lg font-bold">Informações Pessoais</h3>
          <div className="space-y-md">
            <div>
              <label className="block font-label-sm text-on-surface-variant mb-xs font-bold uppercase tracking-wider text-[10px]">Nome Completo</label>
              <input className="w-full bg-surface-container-low/30 border border-outline-variant/30 rounded-lg px-md py-sm font-body-sm text-on-surface outline-none focus:border-primary transition-colors" type="text" defaultValue={user?.name}/>
            </div>
            <div>
              <label className="block font-label-sm text-on-surface-variant mb-xs font-bold uppercase tracking-wider text-[10px]">E-mail</label>
              <input className="w-full bg-surface-container-low/30 border border-outline-variant/30 rounded-lg px-md py-sm font-body-sm text-on-surface outline-none focus:border-primary transition-colors" type="email" defaultValue={user?.email}/>
            </div>
            <div className="pt-md mt-md border-t border-outline-variant/30">
              <h4 className="font-bold text-on-surface text-sm mb-md">Alterar Senha</h4>
              <div className="space-y-sm">
                <input className="w-full bg-surface-container-low/30 border border-outline-variant/30 rounded-lg px-md py-sm font-body-sm text-on-surface outline-none focus:border-primary transition-colors" type="password" placeholder="Senha atual"/>
                <input className="w-full bg-surface-container-low/30 border border-outline-variant/30 rounded-lg px-md py-sm font-body-sm text-on-surface outline-none focus:border-primary transition-colors" type="password" placeholder="Nova senha"/>
              </div>
              <button className="mt-md text-primary font-bold text-xs hover:underline">Atualizar Senha</button>
            </div>
          </div>
        </section>

        {/* Security & Activity - Span 5 */}
        <section className="md:col-span-5 flex flex-col gap-gutter">
          <div className="bg-surface-container-lowest rounded-xl shadow-sm p-lg border border-outline-variant/10">
            <h3 className="font-headline-sm text-on-surface mb-lg font-bold">Segurança</h3>
            <div className="space-y-md">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-on-surface text-sm">2FA</p>
                  <p className="text-[11px] text-on-surface-variant">Proteção adicional à conta.</p>
                </div>
                <span className="px-2 py-1 bg-error/10 text-error rounded text-[10px] font-bold uppercase">Inativo</span>
              </div>
              <div className="flex justify-between items-center pt-md border-t border-outline-variant/10">
                <div>
                  <p className="font-bold text-on-surface text-sm">Último Acesso</p>
                  <p className="text-[11px] text-on-surface-variant">IP: 187.54.32.10</p>
                </div>
                <span className="text-[10px] text-outline font-medium">Hoje, 14:22</span>
              </div>
            </div>
          </div>

          <div className="bg-secondary/5 rounded-xl p-lg border border-secondary/10">
            <h3 className="font-headline-sm text-secondary mb-md font-bold">Suporte Direto</h3>
            <p className="text-[12px] text-on-surface-variant leading-relaxed mb-lg">
              Precisa de ajuda com sua conta? Nosso time de sucesso do cliente está disponível.
            </p>
            <button className="w-full py-sm bg-secondary text-white rounded-lg font-bold text-xs hover:bg-secondary/90 transition-colors shadow-sm">
              Falar com Consultor
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
