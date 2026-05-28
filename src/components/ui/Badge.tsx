interface Props {
  variant?: "success" | "warning" | "error" | "info" | "neutral";
  children: string;
}

const styles = {
  success: "bg-success-container text-on-success-container",
  warning: "bg-warning-container text-on-warning-container",
  error: "bg-error-container text-on-error-container",
  info: "bg-primary-container/10 text-primary-container",
  neutral: "bg-surface-variant text-on-surface-variant",
};

export function Badge({ variant = "neutral", children }: Props) {
  return (
    <span className={`px-3 py-1 rounded-full font-label-md text-label-md font-bold ${styles[variant]}`}>
      {children}
    </span>
  );
}
