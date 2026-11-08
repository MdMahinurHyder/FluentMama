"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, ChevronDown, Flame, LogOut, Menu, Zap } from "lucide-react";
import { LogoMark } from "@/components/brand/Logo";
import { displayName, initials, useProfile } from "./ProfileProvider";

export default function Topbar({ onMenu }: { onMenu: () => void }) {
  const { profile, signOut } = useProfile();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const name = displayName(profile);

  useEffect(() => {
    const onDown = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-line bg-white/80 px-4 backdrop-blur lg:px-8">
      <div className="flex items-center gap-3 lg:hidden">
        <button onClick={onMenu} aria-label="Open menu" className="flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-canvas"><Menu size={22} /></button>
        <LogoMark size={30} />
      </div>
      <div className="hidden lg:block" />

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden items-center gap-1.5 rounded-full bg-[#FFF1CC] px-3 py-1.5 text-sm font-semibold text-[#7A5200] sm:flex" title="Day streak">
          <Flame size={16} /> 7
        </div>
        <div className="hidden items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1.5 text-sm font-semibold text-brand-dark sm:flex" title="Experience points">
          <Zap size={16} /> 1,240 XP
        </div>
        <button aria-label="Notifications" className="flex h-10 w-10 items-center justify-center rounded-full text-muted hover:bg-canvas hover:text-ink"><Bell size={20} /></button>

        <div ref={ref} className="relative" onKeyDown={(e) => e.key === "Escape" && setOpen(false)}>
          <button
            onClick={() => setOpen(!open)}
            aria-haspopup="menu"
            aria-expanded={open}
            className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-2 transition hover:bg-canvas"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">{initials(name)}</span>
            <span className="hidden text-left leading-tight md:block">
              <span className="block max-w-[140px] truncate text-sm font-semibold text-ink">{name}</span>
              <span className="block text-xs text-muted">{profile.english_level ?? "Learner"}</span>
            </span>
            <ChevronDown size={16} className={`text-muted transition-transform ${open ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                role="menu"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-line bg-white shadow-card"
              >
                <div className="border-b border-line px-4 py-3">
                  <p className="truncate text-sm font-semibold text-ink">{name}</p>
                  <p className="truncate text-xs text-muted">{profile.email}</p>
                  <p className="mt-2 inline-block rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-medium text-brand-dark">{profile.english_level ?? "Learner"}</p>
                </div>
                <button role="menuitem" onClick={signOut} className="flex w-full items-center gap-2.5 px-4 py-3 text-sm font-medium text-ink hover:bg-canvas">
                  <LogOut size={16} /> Log out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
