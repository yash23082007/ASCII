import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SpinBorderPanelProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function SpinBorderPanel({ children, className = "", style }: SpinBorderPanelProps) {
  return (
    <motion.div
      className={className}
      style={{
        position: "relative", borderRadius: "var(--radius-xl)",
        padding: "var(--space-16) var(--space-12)",
        background: "var(--bg-raised)",
        overflow: "hidden",
        ...style,
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        style={{
          position: "absolute", inset: -1, borderRadius: "inherit",
          background: "conic-gradient(from var(--angle, 0deg), transparent 0deg, var(--accent-primary) 60deg, var(--accent-secondary) 120deg, transparent 180deg)",
          animation: "spin-border 4s linear infinite",
          zIndex: 0, pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1, borderRadius: "inherit" }}>
        {children}
      </div>
    </motion.div>
  );
}
