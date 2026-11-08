"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Field from "@/components/auth/Field";
import GoogleButton from "@/components/auth/GoogleButton";
import { supabase, supabaseReady, NOT_READY_MESSAGE } from "@/lib/supabase";
import { routeAfterAuth, signInWithGoogle } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!supabaseReady) return setError(NOT_READY_MESSAGE);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setLoading(false); return setError(error.message); }
    await routeAfterAuth(router);
  }

  async function onGoogle() {
    setError("");
    if (!supabaseReady) return setError(NOT_READY_MESSAGE);
    const { error } = await signInWithGoogle();
    if (error) setError(error.message);
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-7 shadow-card">
      <h1 className="text-center text-2xl font-bold text-ink">Welcome back</h1>
      <p className="mt-1 text-center text-sm text-muted">Log in to continue your English journey.</p>

      <div className="mt-6"><GoogleButton onClick={onGoogle} /></div>

      <div className="my-5 flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-line" />or log in with email<span className="h-px flex-1 bg-line" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" autoComplete="email" />
        <Field label="Password" type="password" value={password} onChange={setPassword} autoComplete="current-password"
          right={<Link href="/login" className="text-xs font-medium text-brand hover:underline">Forgot password?</Link>} />
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 accent-[#6B3FD4]" />
          Remember me
        </label>
        {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <button type="submit" disabled={loading} className="h-11 w-full rounded-lg bg-brand font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60">
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-muted">
        New to FluentMama? <Link href="/signup" className="font-semibold text-brand hover:underline">Create an account</Link>
      </p>
    </div>
  );
}
