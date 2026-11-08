"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Camera, Dumbbell, Film, Gamepad2, Laptop, Music, Palette, Plane, Trophy, TreePine, UtensilsCrossed } from "lucide-react";
import StepShell from "@/components/onboarding/StepShell";
import { useOnboarding } from "@/store/onboardingStore";
import { supabase } from "@/lib/supabase";

const HOBBIES = [
  { n: "Cricket & sports", i: Trophy }, { n: "Music", i: Music }, { n: "Movies & series", i: Film },
  { n: "Gaming", i: Gamepad2 }, { n: "Travel", i: Plane }, { n: "Cooking", i: UtensilsCrossed },
  { n: "Reading", i: BookOpen }, { n: "Technology", i: Laptop }, { n: "Art & design", i: Palette },
  { n: "Photography", i: Camera }, { n: "Fitness", i: Dumbbell }, { n: "Nature", i: TreePine },
];

export default function Step3() {
  const router = useRouter();
  const { level, confidence, goal, minutes, hobbies, toggleHobby } = useOnboarding();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function finish() {
    setError(""); setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return router.push("/login"); }
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      email: user.email,
      full_name: user.user_metadata?.full_name ?? user.user_metadata?.name ?? null,
      english_level: level,
      speaking_confidence: confidence,
      goal,
      daily_minutes: minutes,
      hobbies,
      onboarding_completed: true,
    });
    if (error) { setLoading(false); return setError(error.message); }
    router.push("/dashboard");
  }

  return (
    <StepShell title="What do you enjoy?" subtitle="Pick a few. Your lessons will use examples from things you like."
      backHref="/onboarding/step-2-goals" canContinue={hobbies.length > 0} onContinue={finish} continueLabel="Finish and start learning" loading={loading} error={error}>
      <div role="group" aria-label="Hobbies" className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {HOBBIES.map(({ n, i: Icon }) => {
          const on = hobbies.includes(n);
          return (
            <button key={n} type="button" aria-pressed={on} onClick={() => toggleHobby(n)}
              className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-3.5 text-left text-sm font-medium transition ${on ? "border-brand bg-brand-soft text-brand-dark ring-2 ring-brand/30" : "border-line bg-white text-ink hover:border-brand/50"}`}>
              <Icon size={18} className={on ? "text-brand" : "text-muted"} />{n}
            </button>
          );
        })}
      </div>
    </StepShell>
  );
}
