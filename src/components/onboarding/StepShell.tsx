"use client";
import Link from "next/link";

type Props = {
  title: string;
  subtitle: string;
  backHref?: string;
  canContinue: boolean;
  onContinue: () => void;
  continueLabel?: string;
  loading?: boolean;
  error?: string;
  children: React.ReactNode;
};

export default function StepShell({ title, subtitle, backHref, canContinue, onContinue, continueLabel = "Continue", loading, error, children }: Props) {
  return (
    <div className="rounded-2xl border border-line bg-white p-7 shadow-card sm:p-9">
      <h1 className="text-2xl font-bold tracking-tight text-ink">{title}</h1>
      <p className="mt-1.5 text-sm text-muted">{subtitle}</p>
      <div className="mt-7 space-y-7">{children}</div>
      {error && <p role="alert" className="mt-6 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <div className="mt-8 flex items-center justify-between">
        {backHref ? <Link href={backHref} className="rounded-lg px-4 py-2.5 text-sm font-medium text-muted hover:bg-canvas hover:text-ink">Back</Link> : <span />}
        <button type="button" onClick={onContinue} disabled={!canContinue || loading}
          className="h-11 rounded-lg bg-brand px-7 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-line disabled:text-muted">
          {loading ? "Saving…" : continueLabel}
        </button>
      </div>
    </div>
  );
}
