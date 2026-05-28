import { type ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({ variant = "primary", size = "md", className = "", children, ...props }: Props) {
  const base = "rounded-lg font-label-md transition-all flex items-center justify-center gap-xs";
  const variants = {
    primary: "bg-primary text-on-primary shadow-sm hover:opacity-90",
    secondary: "border border-secondary text-secondary hover:bg-secondary/5",
    ghost: "text-primary hover:bg-primary/5",
  };
  const sizes = {
    sm: "px-md py-xs text-label-sm",
    md: "px-lg py-sm text-label-md",
    lg: "px-xl py-md text-label-md",
  };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}
