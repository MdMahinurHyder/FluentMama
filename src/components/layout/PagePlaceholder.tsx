import { NAV } from "@/lib/nav";

// Temporary page body. The full feature screens are built in the next step.
export default function PagePlaceholder({ href }: { href: string }) {
  const item = NAV.find((n) => n.href === href)!;
  const Icon = item.icon;
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-ink">{item.label}</h1>
      <p className="mt-1.5 text-muted">{item.desc}</p>
      <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-brand/40 bg-white px-6 py-20 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand"><Icon size={28} /></span>
        <p className="mt-5 text-lg font-semibold text-ink">This screen is coming soon</p>
        <p className="mt-1 max-w-sm text-sm text-muted">We are building {item.label} next. Your sidebar, profile and page transitions already work.</p>
      </div>
    </div>
  );
}
