"use client";

export default function AdminSettings() {
  const sections = [
    {
      title: "Configurações de Plataforma",
      icon: "settings_applications",
      fields: [
        { label: "Nome da Plataforma", value: "VitaOne", type: "text" },
        { label: "URL Base", value: "https://app.vitaone.com.br", type: "text" },
        { label: "E-mail de Suporte Global", value: "master@vitaone.com.br", type: "email" },
      ]
    },
    {
      title: "Segurança & Infraestrutura",
      icon: "security",
      fields: [
        { label: "Política de Senha", value: "Mínimo 8 caracteres, especial e número", type: "text" },
        { label: "Autenticação em Duas Etapas (2FA)", value: "Obrigatório para Admin Master", type: "toggle", checked: true },
        { label: "Backup Automático", value: "Diário às 03:00 AM", type: "text" },
      ]
    },
    {
      title: "Integrações Master (API Keys)",
      icon: "api",
      fields: [
        { label: "Stripe Public Key", value: "pk_test_********************", type: "password" },
        { label: "Twilio SID", value: "AC**************************", type: "password" },
        { label: "Google Cloud Console ID", value: "vitaone-2024", type: "text" },
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-xl">
      <div className="flex flex-col gap-xs">
        <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">Configurações Master</h1>
        <p className="font-body-md text-on-surface-variant">Gerencie os parâmetros globais, segurança e chaves de API da plataforma VitaOne.</p>
      </div>

      <div className="flex flex-col gap-lg">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden">
            <div className="px-lg py-md border-b border-outline-variant/10 bg-surface-container-low/20 flex items-center gap-md">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>{section.icon}</span>
              <h3 className="font-bold text-on-surface">{section.title}</h3>
            </div>
            <div className="p-lg grid grid-cols-1 md:grid-cols-2 gap-lg">
              {section.fields.map((field, fIdx) => (
                <div key={fIdx} className="flex flex-col gap-xs">
                  <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">{field.label}</label>
                  {field.type === "toggle" ? (
                    <div className="flex items-center gap-md mt-1">
                      <div className={`w-10 h-5 rounded-full relative p-0.5 transition-colors cursor-pointer ${field.checked ? 'bg-primary' : 'bg-outline-variant'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full transition-all ${field.checked ? 'ml-5' : 'ml-0'}`}></div>
                      </div>
                      <span className="text-sm font-medium text-on-surface">{field.value}</span>
                    </div>
                  ) : (
                    <input 
                      type={field.type} 
                      defaultValue={field.value}
                      className="w-full bg-white border border-outline-variant/30 rounded-xl px-md py-sm font-body-sm text-on-surface focus:border-primary outline-none transition-all"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-md pb-xl">
        <button className="px-lg py-sm rounded-xl font-bold text-sm text-on-surface-variant hover:bg-surface-container-low transition-colors">Descartar</button>
        <button className="px-lg py-sm rounded-xl font-bold text-sm bg-primary text-white hover:bg-primary/90 transition-all shadow-md">Salvar Configurações</button>
      </div>
    </div>
  );
}
