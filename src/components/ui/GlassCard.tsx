import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  accent?: boolean;
  hover?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
}

export function GlassCard({ children, className = "", accent = false, hover = false, style, onClick, onMouseEnter, onMouseLeave }: GlassCardProps) {
  const base = accent ? "glass-card-accent" : "glass-card";
  return (
    <motion.div
      className={`${base} ${className}`}
      style={style}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
