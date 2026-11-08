"use client";
import { motion } from "framer-motion";

// Re-mounts on every page change, so only the content area transitions
// while the sidebar and top bar stay still.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}
