"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProfileProvider } from "@/components/layout/ProfileProvider";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <ProfileProvider>
      <div className="flex h-screen overflow-hidden bg-canvas">
        {/* Desktop sidebar: stays mounted while pages change */}
        <motion.aside
          initial={false}
          animate={{ width: collapsed ? 76 : 248 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="hidden shrink-0 lg:block"
        >
          <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
        </motion.aside>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
                className="fixed inset-0 z-30 bg-ink/40 lg:hidden"
              />
              <motion.aside
                initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="fixed inset-y-0 left-0 z-40 w-[248px] lg:hidden"
              >
                <Sidebar onNavigate={() => setMobileOpen(false)} />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar onMenu={() => setMobileOpen(true)} />
          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-6xl px-5 py-8 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </ProfileProvider>
  );
}
