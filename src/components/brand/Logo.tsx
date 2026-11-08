import Link from "next/link";

// Speech bubble (talking) containing a sound wave (spoken English) on a violet tile.
export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <rect width="48" height="48" rx="12" fill="#6B3FD4" />
      <path d="M12 14a5 5 0 0 1 5-5h14a5 5 0 0 1 5 5v11a5 5 0 0 1-5 5H24l-7 6v-6a5 5 0 0 1-5-5z" fill="#fff" />
      <rect x="17.2" y="15.5" width="3.6" height="8" rx="1.8" fill="#6B3FD4" />
      <rect x="22.2" y="12.5" width="3.6" height="14" rx="1.8" fill="#6B3FD4" />
      <rect x="27.2" y="14.5" width="3.6" height="10" rx="1.8" fill="#6B3FD4" />
    </svg>
  );
}

export default function Logo({ href = "/", withText = true }: { href?: string; withText?: boolean }) {
  return (
    <Link href={href} className="flex items-center gap-2.5" aria-label="FluentMama home">
      <LogoMark />
      {withText && <span className="text-xl font-bold tracking-tight text-ink">FluentMama</span>}
    </Link>
  );
}
