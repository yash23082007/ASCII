import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { ReactNode, CSSProperties } from "react";
import { useCallback, useRef, useState } from "react";

interface GlowButtonProps {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  id?: string;
  style?: CSSProperties;
}

const variantStyles = {
  primary: {
    background: "#fff",
    color: "#000",
    border: "none",
    boxShadow: "0 4px 20px rgba(255, 255, 255, 0.15), 0 0 40px rgba(255, 255, 255, 0.05)",
  },
  secondary: {
    background: "rgba(255, 255, 255, 0.06)",
    color: "var(--text-primary)",
    border: "1px solid var(--border-visible)",
    boxShadow: "none",
  },
  ghost: {
    background: "transparent",
    color: "var(--text-secondary)",
    border: "1px solid var(--border-muted)",
    boxShadow: "none",
  },
};

const sizeStyles = {
  sm: { padding: "0.5rem 1rem", fontSize: "var(--text-sm)" },
  md: { padding: "0.7rem 1.4rem", fontSize: "var(--text-base)" },
  lg: { padding: "0.9rem 1.8rem", fontSize: "var(--text-lg)" },
};

export function GlowButton({
  children, to, onClick, variant = "primary", size = "md", className = "", type = "button", disabled, id, style,
}: GlowButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMove = useCallback((e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  const spotGradient = variant === "primary"
    ? `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(0,0,0,0.08) 0%, transparent 60%)`
    : `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,255,255,0.08) 0%, transparent 60%)`;

  const baseStyle = {
    ...variantStyles[variant],
    ...sizeStyles[size],
    borderRadius: "var(--radius-full)",
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    position: "relative",
    overflow: "hidden",
    letterSpacing: "0.01em",
    transition: "box-shadow 0.2s ease",
    ...style,
  } as unknown as CSSProperties;

  const spotStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background: spotGradient,
    borderRadius: "inherit",
  };

  const content = (
    <motion.span
      ref={ref}
      id={id}
      style={baseStyle}
      className={className}
      onPointerMove={disabled ? undefined : handleMove}
      whileHover={disabled ? {} : { y: -1, scale: 1.015 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
    >
      <span style={spotStyle} />
      <span style={{ position: "relative", zIndex: 1, display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>{children}</span>
    </motion.span>
  );

  if (to) return <Link to={to} style={{ textDecoration: "none", display: "inline-flex" }}>{content}</Link>;
  return (
    <button type={type} onClick={onClick} disabled={disabled} style={{ background: "none", border: "none", padding: 0, display: "inline-flex" }}>
      {content}
    </button>
  );
}
