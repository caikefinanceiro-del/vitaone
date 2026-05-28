"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/use-auth";

export default function LoginPage() {
  const { login, setUser } = useAuth();
  const router = useRouter();
  
  // Login State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isFirstLogin, setIsFirstLogin] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Signup State
  const [signupStep, setSignupStep] = useState(1);
  const [signupData, setSignupData] = useState({
    nome: "",
    documento: "",
    email: "",
    segmento: "",
    senha: "",
    confirmarSenha: ""
  });
  const [signupError, setSignupError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isFirstLogin && !acceptedTerms) {
      setLoginError("Você precisa aceitar os Termos e Políticas de Uso.");
      return;
    }

    if (!loginEmail || !loginPassword) {
      setLoginError("Por favor, preencha todos os campos.");
      return;
    }

    setLoginError("");

    const error = await login(loginEmail, loginPassword);
    if (error) setLoginError(error);
  };

  const handleSignupNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupData.nome || !signupData.documento || !signupData.email || !signupData.segmento) {
      setSignupError("Preencha todos os dados da empresa.");
      return;
    }
    setSignupError("");
    setSignupStep(2);
  };

  const handleSignupComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupData.senha || !signupData.confirmarSenha) {
      setSignupError("Preencha e confirme sua senha.");
      return;
    }
    if (signupData.senha !== signupData.confirmarSenha) {
      setSignupError("As senhas não coincidem.");
      return;
    }
    setSignupError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signupData.email, password: signupData.senha, nome: signupData.nome, segmento: signupData.segmento }),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        router.push(data.redirectTo);
      } else {
        setSignupError(data.message || "Erro ao criar conta.");
      }
    } catch {
      setSignupError("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Lado Esquerdo - Imagem Orgânica com Dispositivos e Cadastro */}
      <div className="hidden lg:flex lg:w-[55%] relative bg-primary-container/10 overflow-hidden flex-col justify-end">
        <Image 
          src="/vitaone_devices_bg.png" 
          alt="VitaOne Background with Devices" 
          fill 
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover"
        />
        
        {/* Texto Comercial Atraente (Top Left) */}
        <div className="absolute top-0 left-0 w-full p-[48px] pt-[64px] z-10 bg-gradient-to-b from-primary/60 to-transparent">
          <div className="text-white max-w-[500px]">
            <h2 className="font-display-lg text-[42px] leading-tight font-bold mb-md drop-shadow-md">
              Gestão clínica <br/><span className="text-primary-fixed">inteligente</span> e premium.
            </h2>
            <p className="font-body-lg text-white/95 drop-shadow-md">
              Centralize prontuários, faturamento e agendamentos em uma interface veloz, segura e disponível em qualquer dispositivo.
            </p>
          </div>
        </div>

        {/* Overlay do Cadastro (Glassmorphism) */}
        <div className="relative z-10 w-full p-xl flex justify-center bg-gradient-to-t from-primary/95 via-primary/80 to-transparent pt-[120px]">
          <div className="w-full max-w-[672px] bg-surface/95 backdrop-blur-md p-lg rounded-2xl border border-surface-variant shadow-lg mt-32">
            
            <div className="mb-md">
              <h2 className="font-headline-sm text-primary font-bold">Ainda não tem uma conta?</h2>
              <p className="font-body-sm text-on-surface-variant">O VitaOne oferece um plano Free para a gestão da sua clínica. Faça o seu cadastro gratuito.</p>
            </div>

            {signupError && (
              <div className="mb-md bg-error-container text-on-error-container p-xs rounded text-body-sm flex items-center gap-xs">
                <span className="material-symbols-outlined text-[16px]">error</span>
                {signupError}
              </div>
            )}

            {signupStep === 1 ? (
              <form onSubmit={handleSignupNext} className="space-y-sm">
                <div className="grid grid-cols-2 gap-sm">
                  <div>
                    <label className="font-label-sm text-on-surface">Nome da Clínica ou Profissional</label>
                    <input 
                      type="text" 
                      value={signupData.nome}
                      onChange={(e) => setSignupData({...signupData, nome: e.target.value})}
                      className="w-full bg-surface border border-outline-variant rounded-lg px-sm py-xs font-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-label-sm text-on-surface">CNPJ / CPF</label>
                    <input 
                      type="text" 
                      value={signupData.documento}
                      onChange={(e) => setSignupData({...signupData, documento: e.target.value})}
                      className="w-full bg-surface border border-outline-variant rounded-lg px-sm py-xs font-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-label-sm text-on-surface">E-mail Corporativo</label>
                    <input 
                      type="email" 
                      value={signupData.email}
                      onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                      className="w-full bg-surface border border-outline-variant rounded-lg px-sm py-xs font-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-label-sm text-on-surface">Segmento</label>
                    <div className="relative">
                      <select 
                        value={signupData.segmento}
                        onChange={(e) => setSignupData({...signupData, segmento: e.target.value})}
                        className="w-full appearance-none bg-surface border border-outline-variant rounded-lg px-sm py-xs font-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer"
                      >
                        <option value="">Selecione...</option>
                        <option value="odontologia">Odontologia</option>
                        <option value="estetica">Clínica de Estética</option>
                        <option value="dermatologia">Dermatologia</option>
                        <option value="fisioterapia">Fisioterapia</option>
                        <option value="psicologia">Psicologia</option>
                        <option value="multidisciplinar">Clínica Multidisciplinar</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-sm top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[16px]">expand_more</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-xs">
                  <button type="submit" className="bg-primary text-on-primary font-label-md px-lg py-sm rounded-lg shadow-sm hover:opacity-90 transition-opacity flex items-center gap-xs">
                    Prosseguir
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSignupComplete} className="space-y-sm">
                <div className="grid grid-cols-2 gap-sm">
                  <div>
                    <label className="font-label-sm text-on-surface">Crie uma Senha</label>
                    <input 
                      type="password" 
                      value={signupData.senha}
                      onChange={(e) => setSignupData({...signupData, senha: e.target.value})}
                      className="w-full bg-surface border border-outline-variant rounded-lg px-sm py-xs font-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-label-sm text-on-surface">Confirme a Senha</label>
                    <input 
                      type="password" 
                      value={signupData.confirmarSenha}
                      onChange={(e) => setSignupData({...signupData, confirmarSenha: e.target.value})}
                      className="w-full bg-surface border border-outline-variant rounded-lg px-sm py-xs font-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center pt-xs">
                  <button type="button" onClick={() => setSignupStep(1)} className="text-primary font-label-sm hover:underline flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                    Voltar
                  </button>
                  <button type="submit" className="bg-primary text-on-primary font-label-md px-lg py-sm rounded-lg shadow-sm hover:opacity-90 transition-opacity flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    Criar Conta e Acessar
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Lado Direito - Formulário de Login */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center items-center p-md sm:p-xl bg-surface">
        <div className="w-full max-w-[400px]">
          {/* Header */}
          <div className="flex flex-col items-center lg:items-start mb-xl text-center lg:text-left">
            <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container mb-md">
              <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
            </div>
            <h1 className="font-display-lg text-headline-lg font-bold text-primary">VitaOne</h1>
            <p className="font-body-md text-on-surface-variant mt-xs">Acesse sua conta para continuar</p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleLogin} className="space-y-md">
            {loginError && (
              <div className="bg-error-container text-on-error-container p-sm rounded-lg text-body-sm flex items-center gap-xs">
                <span className="material-symbols-outlined text-[20px]">error</span>
                {loginError}
              </div>
            )}

            <div className="space-y-xs">
              <label className="font-label-md text-on-surface">E-mail</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant">mail</span>
                <input 
                  type="email" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-lg pl-[44px] pr-md py-sm font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/70"
                  placeholder="exemplo@clinica.com.br"
                />
              </div>
            </div>

            <div className="space-y-xs">
              <div className="flex justify-between items-center">
                <label className="font-label-md text-on-surface">Senha</label>
                <button type="button" className="font-label-sm text-primary hover:underline">Esqueceu a senha?</button>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant">lock</span>
                <input 
                  type="password" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-lg pl-[44px] pr-md py-sm font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/70"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {isFirstLogin && (
              <div className="flex items-start gap-sm pt-xs">
                <input 
                  type="checkbox" 
                  id="terms" 
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary"
                />
                <label htmlFor="terms" className="font-body-sm text-on-surface-variant cursor-pointer leading-tight">
                  Li e concordo com os <a href="#" className="text-primary hover:underline">Termos de Uso</a> e <a href="#" className="text-primary hover:underline">Políticas de Privacidade</a>.
                </label>
              </div>
            )}

            <div className="pt-sm">
              <button 
                type="submit" 
                className="w-full bg-primary text-on-primary font-label-md py-md rounded-lg shadow-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-xs"
              >
                <span className="material-symbols-outlined text-[20px]">login</span>
                Entrar na Plataforma
              </button>
            </div>
          </form>

          {/* Atalho de Staff para teste */}
          <div className="mt-lg pt-lg border-t border-outline-variant text-center lg:text-left">
            <p className="font-body-sm text-on-surface-variant">
              Acesso administrativo ou Staff? <button type="button" onClick={() => { setLoginEmail("caike.financeiro@gmail.com"); setLoginPassword("142536Drade@"); setIsFirstLogin(true); }} className="text-primary hover:underline font-medium">Preencher dados de admin</button>
            </p>
          </div>

          <div className="mt-xl text-center lg:text-left">
            <p className="font-label-sm text-on-surface-variant">© {new Date().getFullYear()} VitaOne. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
