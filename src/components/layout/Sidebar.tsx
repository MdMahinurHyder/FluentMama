"use client";
import { useId } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Logo, { LogoMark } from "@/components/brand/Logo";
import { NAV } from "@/lib/nav";

type Props = { collapsed?: boolean; onToggle?: () => void; onNavigate?: () => void };

export default function Sidebar({ collapsed = false, onToggle, onNavigate }: Props) {
  const pathname = usePathname();
  const pillId = useId();

  return (
    <div className="flex h-full flex-col border-r border-line bg-white">
      <div className={`flex h-16 shrink-0 items-center ${collapsed ? "justify-center" : "px-5"}`}>
        {collapsed ? (
          <Link href="/dashboard" aria-label="FluentMama home"><LogoMark /></Link>
        ) : (
          <Logo href="/dashboard" />
        )}
      </div>

      <nav aria-label="Main" className="mt-2 flex-1 space-y-1 px-3">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              title={collapsed ? label : undefined}
              aria-current={active ? "page" : undefined}
              className={`relative flex h-11 items-center gap-3 rounded-xl text-sm font-medium transition-colors ${
                collapsed ? "justify-center" : "px-3"
              } ${active ? "text-brand-dark" : "text-muted hover:bg-canvas hover:text-ink"}`}
            >
              {active && (
                <motion.span
                  layoutId={`${pillId}-active`}
                  className="absolute inset-0 rounded-xl bg-brand-soft"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <Icon size={20} className="relative shrink-0" />
              {!collapsed && <span className="relative truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {onToggle && (
        <div className="border-t border-line p-3">
          <button
            onClick={onToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={`flex h-10 w-full items-center gap-3 rounded-xl text-sm font-medium text-muted transition hover:bg-canvas hover:text-ink ${collapsed ? "justify-center" : "px-3"}`}
          >
            {collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
            {!collapsed && "Collapse"}
          </button>
        </div>
      )}
    </div>
  );
}
