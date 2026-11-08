"use client";
import { usePathname } from "next/navigation";
import Logo from "@/components/brand/Logo";

const STEPS = ["step-1-level", "step-2-goals", "step-3-hobbies"];

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const current = Math.max(0, STEPS.findIndex((s) => pathname.includes(s)));
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-soft/70 via-canvas to-sky">
      <header className="mx-auto flex h-16 max-w-2xl items-center px-5"><Logo href="/onboarding/step-1-level" /></header>
      <main className="mx-auto max-w-2xl px-5 pb-16 pt-4">
        <div className="mb-5">
          <p className="mb-2 text-sm font-medium text-muted">Step {current + 1} of 3</p>
          <div className="flex gap-2" aria-hidden="true">
            {STEPS.map((s, i) => (
              <span key={s} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i <= current ? "bg-brand" : "bg-line"}`} />
            ))}
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
