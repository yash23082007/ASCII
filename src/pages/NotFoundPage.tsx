import { motion } from "framer-motion";
import { GlowButton } from "../components/ui/GlowButton";

export function NotFoundPage() {
  return (
    <div className="page" style={{ placeItems: "center", minHeight: "70vh", textAlign: "center", paddingTop: "var(--space-8)" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{ display: "grid", gap: "var(--space-6)", placeItems: "center" }}
      >
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-lg)", lineHeight: 1.6, color: "var(--accent-glow)", letterSpacing: "0.05em" }}>
          <motion.div
            animate={{ x: [0, -3, 3, -2, 2, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 4 }}
          >
            <div>@ @ @ # * * * + + = - : . .</div>
            <div>@ @ @ # * * *</div>
            <div style={{ letterSpacing: "1.5em" }}>@ @ @ @ @ @ @ @</div>
            <div>+ + + + + + + + + + + + + +</div>
            <div style={{ letterSpacing: "0.6em" }}>* * * &nbsp; * * *</div>
            <div>- - - - - - - - - - - - - -</div>
          </motion.div>
        </div>

        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-2xl)", color: "var(--text-primary)", margin: 0 }}>
            404 — Frame Corrupted
          </h1>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", marginTop: "var(--space-2)", marginBottom: 0 }}>
            The requested console index could not be located on this client branch.
          </p>
        </div>

        <GlowButton to="/studio" variant="primary" size="lg">
          Return to Studio →
        </GlowButton>
      </motion.div>
    </div>
  );
}
