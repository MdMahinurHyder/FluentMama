"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { routeAfterAuth } from "@/lib/auth";

// Google sends the user back here. We wait for the session, then route them.
export default function AuthCallback() {
  const router = useRouter();
  useEffect(() => {
    supabase.auth.getSession().then(() => routeAfterAuth(router));
  }, [router]);
  return <p className="p-10 text-center text-sm text-muted">Signing you in…</p>;
}
