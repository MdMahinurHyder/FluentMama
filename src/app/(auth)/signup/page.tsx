"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Field from "@/components/auth/Field";
import GoogleButton from "@/components/auth/GoogleButton";
import { supabase, supabaseReady, NOT_READY_MESSAGE } from "@/lib/supabase";
import { routeAfterAuth, signInWithGoogle } from "@/lib/auth";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setInfo("");
    if (!supabaseReady) return setError(NOT_READY_MESSAGE);
    if (password.length < 8) return setError("Use at least 8 characters for your password.");
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } });
    setLoading(false);
    if (error) return setError(error.message);
    if (data.session) return routeAfterAuth(router);
    setInfo("Account created. Check your email to confirm it, then log in.");
  }

  async function onGoogle() {
    setError("");
    if (!supabaseReady) return setError(NOT_READY_MESSAGE);
    const { error } = await signInWithGoogle();
    if (error) setError(error.message);
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-7 shadow-card">
      <h1 className="text-center text-2xl font-bold text-ink">Create your account</h1>
      <p className="mt-1 text-center text-sm text-muted">It takes less than a minute.</p>

      <div className="mt-6"><GoogleButton onClick={onGoogle} /></div>

      <div className="my-5 flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-line" />or sign up with email<span className="h-px flex-1 bg-line" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Full name" value={name} onChange={setName} autoComplete="name" />
        <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" autoComplete="email" />
        <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="At least 8 characters" autoComplete="new-password" />
        {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        {info && <p role="status" className="rounded-lg bg-brand-soft px-3 py-2 text-sm text-brand-dark">{info}</p>}
        <button type="submit" disabled={loading} className="h-11 w-full rounded-lg bg-brand font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60">
          {loading ? "Creating account…" : "Create my account"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-muted">
        Already have an account? <Link href="/login" className="font-semibold text-brand hover:underline">Log in</Link>
      </p>
    </div>
  );
}
