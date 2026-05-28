import { type InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: string;
}

export function Input({ label, icon, className = "", ...props }: Props) {
  return (
    <div className="space-y-xs">
      {label && <label className="font-label-md text-on-surface block">{label}</label>}
      <div className="relative">
        {icon && (
          <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant">
            {icon}
          </span>
        )}
        <input
          className={`w-full bg-surface border border-outline-variant rounded-lg ${icon ? "pl-[44px]" : "px-md"} pr-md py-sm font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/70 ${className}`}
          {...props}
        />
      </div>
    </div>
  );
}
