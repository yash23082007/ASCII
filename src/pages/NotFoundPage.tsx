import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GlowButton } from "../components/ui/GlowButton";

export function NotFoundPage() {
  return (
    <div className="page" style={{ placeItems: "center", minHeight: "60vh", textAlign: "center" }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} style={{ display: "grid", gap: "var(--space-6)", placeItems: "center" }}>
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
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-2xl)" }}>404 — This frame got corrupted.</h1>
          <p style={{ fontSize: "var(--text-base)", color: "var(--text-secondary)", marginTop: "var(--space-2)" }}>The page you're looking for doesn't exist or was moved.</p>
        </div>
        <Link to="/studio">
          <GlowButton variant="primary" size="lg">Return to Studio →</GlowButton>
        </Link>
      </motion.div>
    </div>
  );
}
