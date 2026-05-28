"use client";

export default function ModulePlaceholder({
  title,
  description,
  modulePath,
}: {
  title: string;
  description: string;
  modulePath: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-20 h-20 rounded-2xl bg-primary-container/10 flex items-center justify-center mb-xl">
        <span className="material-symbols-outlined text-[48px] text-primary-container">
          construction
        </span>
      </div>
      <h2 className="font-headline-lg text-headline-lg text-on-surface mb-md">{title}</h2>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-[450px] mb-xl">
        {description}
      </p>
      <div className="bg-surface-container-lowest rounded-xl p-lg border border-outline-variant/30 max-w-[600px] w-full">
        <p className="font-label-md text-label-md text-on-surface-variant uppercase mb-md">Próximos passos</p>
        <ul className="text-left space-y-sm">
          <li className="flex items-start gap-md text-body-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px] text-primary-container mt-0.5">check_circle</span>
            Protótipo disponível em: <code className="text-primary bg-surface-container-high px-1 rounded">{modulePath}/code.html</code>
          </li>
          <li className="flex items-start gap-md text-body-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px] text-secondary mt-0.5">pending</span>
            Implementação de dados reais pendente
          </li>
          <li className="flex items-start gap-md text-body-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px] text-secondary mt-0.5">pending</span>
            Conectar com API endpoints
          </li>
        </ul>
      </div>
    </div>
  );
}
