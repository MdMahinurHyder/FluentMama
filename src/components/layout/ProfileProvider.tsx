"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { LogoMark } from "@/components/brand/Logo";

export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  english_level: string | null;
  goal: string | null;
  daily_minutes: number | null;
  hobbies: string[] | null;
  onboarding_completed: boolean;
};

type ProfileCtx = { profile: Profile; signOut: () => Promise<void> };
const Ctx = createContext<ProfileCtx | null>(null);

export function useProfile() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useProfile must be used inside ProfileProvider");
  return c;
}

export function displayName(p: Profile) {
  return p.full_name?.trim() || p.email?.split("@")[0] || "Learner";
}

export function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("") || "U";
}

// Guards the whole app area: must be logged in and must have finished onboarding.
export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.replace("/login"); return; }
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      if (!alive) return;
      if (!data || !data.onboarding_completed) { router.replace("/onboarding/step-1-level"); return; }
      setProfile(data as Profile);
    })();
    return () => { alive = false; };
  }, [router]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  }, [router]);

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas">
        <div className="animate-pulse"><LogoMark size={48} /></div>
      </div>
    );
  }
  return <Ctx.Provider value={{ profile, signOut }}>{children}</Ctx.Provider>;
}
