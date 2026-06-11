import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../../lib/motion-variants";

const nodes = [
  { label: "Browser Client", col: 1 },
  { label: "React + Vite Frontend", col: 1 },
  { label: "FastAPI Backend", col: 2 },
  { label: "Media Processor", col: 1 },
  { label: "Auth + Projects", col: 2 },
  { label: "ASCII Engine + ML", col: 1 },
  { label: "Celery Workers", col: 1 },
  { label: "PostgreSQL + S3", col: 2 },
];

export function ArchDiagram() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "var(--space-3)",
        padding: "var(--space-6)",
      }}
    >
      {nodes.map((node) => (
        <motion.div
          key={node.label}
          variants={fadeUp}
          className="glass-card"
          style={{
            padding: "var(--space-3) var(--space-4)",
            textAlign: "center",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--text-secondary)",
            cursor: "default",
            gridColumn: node.col,
            transition: "all 0.2s ease",
            letterSpacing: "0.04em",
          }}
          whileHover={{
            y: -2,
            borderColor: "var(--border-accent)",
            color: "var(--text-primary)",
            boxShadow: "var(--glow-sm)",
          }}
        >
          {node.label}
        </motion.div>
      ))}

      {/* Connecting lines — decorative */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 1,
        height: "70%",
        background: "linear-gradient(to bottom, var(--border-muted), transparent)",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        opacity: 0.4,
      }} />
    </motion.div>
  );
}
