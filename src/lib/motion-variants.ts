import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, filter: "blur(6px)" },
  visible: {
    opacity: 1, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const asciiMorph: Variants = {
  initial: { opacity: 0.3, filter: "blur(2px)" },
  animate: {
    opacity: [0.3, 1, 0.8, 1],
    filter: ["blur(2px)", "blur(0px)", "blur(1px)", "blur(0px)"],
    transition: { duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 4 },
  },
};
