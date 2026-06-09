import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../../lib/motion-variants";

const nodes = [
  { label: "Browser Client", row: 0, col: 0 },
  { label: "Next.js Frontend", row: 1, col: 0 },
  { label: "FastAPI Backend", row: 1, col: 2 },
  { label: "Media Processor", row: 2, col: 0 },
  { label: "Auth + Projects", row: 2, col: 2 },
  { label: "ASCII Engine + ML", row: 3, col: 0 },
  { label: "Celery Workers", row: 4, col: 0 },
  { label: "PostgreSQL + S3", row: 4, col: 2 },
];

const connections = [
  [0, 1], [1, 2], [2, 3], [2, 4], [3, 5], [5, 6], [6, 7],
];

export function ArchDiagram() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)", padding: "var(--space-6)" }}
    >
      {nodes.map((node, i) => (
        <motion.div
          key={node.label}
          variants={fadeUp}
          className="glass-card"
          style={{
            padding: "var(--space-3) var(--space-4)", textAlign: "center",
            fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)",
            color: "var(--text-secondary)", cursor: "default",
            gridColumn: node.col + 1,
          }}
          whileHover={{ y: -2, color: "var(--accent-glow)", borderColor: "var(--border-accent)" }}
        >
          {node.label}
        </motion.div>
      ))}
    </motion.div>
  );
}
