export default function OptionCard({ title, desc, selected, onClick, right }: {
  title: string; desc?: string; selected: boolean; onClick: () => void; right?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={`flex w-full items-center justify-between gap-4 rounded-xl border bg-white px-4 py-3.5 text-left transition ${
        selected ? "border-brand bg-brand-soft ring-2 ring-brand/30" : "border-line hover:border-brand/50"
      }`}
    >
      <span>
        <span className="block text-sm font-semibold text-ink">{title}</span>
        {desc && <span className="mt-0.5 block text-sm text-muted">{desc}</span>}
      </span>
      {right}
    </button>
  );
}
