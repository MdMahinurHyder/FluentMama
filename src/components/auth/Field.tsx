"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  right?: React.ReactNode;
  autoComplete?: string;
};

export default function Field({ label, type = "text", value, onChange, placeholder, right, autoComplete }: Props) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-ink">{label}</label>
        {right}
      </div>
      <div className="relative">
        <input
          id={id}
          type={isPassword && show ? "text" : type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink placeholder:text-muted/70 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}
