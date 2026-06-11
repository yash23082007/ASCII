import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  animated?: boolean;
  linkTo?: string;
}

const sizes = {
  sm: { icon: 28, text: "var(--text-sm)", gap: "0.4rem" },
  md: { icon: 34, text: "var(--text-base)", gap: "0.5rem" },
  lg: { icon: 44, text: "var(--text-lg)", gap: "0.6rem" },
};

export function Logo({ size = "md", showText = true, animated = true, linkTo }: LogoProps) {
  const s = sizes[size];
  const [revealed, setRevealed] = useState(!animated);

  useEffect(() => {
    if (animated) {
      const t = setTimeout(() => setRevealed(true), 300);
      return () => clearTimeout(t);
    }
  }, [animated]);

  const content = (
    <motion.div
      style={{ display: "flex", alignItems: "center", gap: s.gap, cursor: linkTo ? "pointer" : "default" }}
      initial={animated ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* SVG Logo Mark */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 40 40"
        fill="none"
        style={{ flexShrink: 0 }}
      >
        {/* Outer frame */}
        <rect
          x="2" y="2" width="36" height="36" rx="6"
          stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none"
        />
        {/* Inner bracket [ */}
        <path
          d="M10 12 L10 28 L16 28"
          stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"
          style={{ filter: "drop-shadow(0 0 4px rgba(255,255,255,0.3))" }}
        />
        {/* Cursor > */}
        <path
          d="M18 17 L24 20 L18 23"
          stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"
        />
        {/* Underscore _ */}
        <motion.line
          x1="26" y1="27" x2="32" y2="27"
          stroke="#fff" strokeWidth="2" strokeLinecap="round"
          animate={animated ? { opacity: [1, 0, 1] } : {}}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Inner bracket ] */}
        <path
          d="M32 12 L32 28 L26 28"
          stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
        />
      </svg>

      {/* Text */}
      {showText && (
        <div style={{ overflow: "hidden", display: "flex", alignItems: "baseline", gap: "0.3rem" }}>
          <motion.span
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
              fontSize: s.text,
              color: "var(--text-primary)",
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
            }}
            initial={animated ? { width: 0, opacity: 0 } : false}
            animate={revealed ? { width: "auto", opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            ASCII Vision
          </motion.span>
          <motion.span
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 400,
              fontSize: s.text,
              color: "var(--text-muted)",
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
            }}
            initial={animated ? { opacity: 0 } : false}
            animate={revealed ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            Studio
          </motion.span>
        </div>
      )}
    </motion.div>
  );

  if (linkTo) {
    return <Link to={linkTo} style={{ textDecoration: "none", display: "inline-flex" }}>{content}</Link>;
  }

  return content;
}
