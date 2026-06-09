import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface GlowButtonProps {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

const variants = {
  primary: {
    background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
    color: "#fff",
    boxShadow: "0 8px 24px rgba(99, 102, 241, 0.25)",
  },
  secondary: {
    background: "rgba(255,255,255,0.04)",
    color: "var(--text-primary)",
    border: "1px solid var(--border-visible)",
  },
  ghost: {
    background: "transparent",
    color: "var(--text-secondary)",
    border: "1px solid var(--border-muted)",
  },
};

const sizes = {
  sm: { padding: "0.5rem 1rem", fontSize: "var(--text-sm)" },
  md: { padding: "0.75rem 1.25rem", fontSize: "var(--text-base)" },
  lg: { padding: "1rem 1.75rem", fontSize: "var(--text-lg)" },
};

export function GlowButton({
  children, to, onClick, variant = "primary", size = "md", className = "", type = "button", disabled,
}: GlowButtonProps) {
  const style = { ...variants[variant], ...sizes[size], borderRadius: "var(--radius-full)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.5rem", border: variant === "primary" ? "none" : "1px solid var(--border-muted)", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1 };

  const content = (
    <motion.span
      style={style as React.CSSProperties}
      className={className}
      whileHover={disabled ? {} : { y: -1, scale: 1.01 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      transition={{ duration: 0.16 }}
    >
      {children}
    </motion.span>
  );

  if (to) return <Link to={to} style={{ textDecoration: "none", display: "inline-flex" }}>{content}</Link>;
  return (
    <button type={type} onClick={onClick} disabled={disabled} style={{ background: "none", border: "none", padding: 0, display: "inline-flex" }}>
      {content}
    </button>
  );
}
