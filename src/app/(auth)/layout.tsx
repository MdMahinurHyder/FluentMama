import Link from "next/link";
import { Check } from "lucide-react";
import Logo from "@/components/brand/Logo";
import SupportBot from "@/components/chatbot/SupportBot";

const BENEFITS = [
  "Practice speaking with an AI partner that corrects you kindly",
  "Get grammar and vocabulary explained in Bangla and English",
  "Climb levels, keep your streak and challenge your friends",
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-soft/70 via-canvas to-sky">
      <header className="border-b border-line/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Logo href="/login" />
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/login" className="rounded-lg px-4 py-2 font-medium text-ink hover:bg-canvas">Log in</Link>
            <Link href="/signup" className="rounded-lg bg-brand px-4 py-2 font-semibold text-white hover:bg-brand-dark">Sign up free</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-12 lg:grid-cols-[420px_1fr] lg:py-16">
        {children}
        <section className="hidden max-w-md lg:block">
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-ink">
            Speak English with confidence, starting in the language you know.
          </h2>
          <p className="mt-4 text-muted">Your lessons, streak and mistakes are saved, so you can pick up right where you stopped.</p>
          <ul className="mt-8 space-y-4">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-ink">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand"><Check size={13} strokeWidth={3} /></span>
                {b}
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SupportBot />
    </div>
  );
}
