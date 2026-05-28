import { type ReactNode } from "react";

interface Props {
  title?: string;
  subtitle?: string;
  icon?: string;
  children?: ReactNode;
  className?: string;
}

export function Card({ title, subtitle, icon, children, className = "" }: Props) {
  return (
    <div className={`bg-surface-container-lowest p-lg rounded-xl shadow-card ${className}`}>
      {(title || icon) && (
        <div className="flex items-center gap-sm mb-md">
          {icon && <span className="material-symbols-outlined text-[20px] text-on-surface-variant">{icon}</span>}
          <div>
            {title && <h3 className="font-label-md text-label-md uppercase tracking-wide text-on-surface-variant">{title}</h3>}
            {subtitle && <p className="font-body-sm text-body-sm text-on-surface-variant">{subtitle}</p>}
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
