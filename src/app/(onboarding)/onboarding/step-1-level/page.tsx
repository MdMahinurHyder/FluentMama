"use client";
import { useRouter } from "next/navigation";
import StepShell from "@/components/onboarding/StepShell";
import OptionCard from "@/components/onboarding/OptionCard";
import { useOnboarding } from "@/store/onboardingStore";

const LEVELS = [
  { v: "Beginner", d: "I know a few words and simple phrases." },
  { v: "Elementary", d: "I can handle simple everyday situations." },
  { v: "Intermediate", d: "I can hold a conversation but make many mistakes." },
  { v: "Advanced", d: "I speak well and want to sound more natural." },
];
const CONFIDENCE = ["Very nervous", "A little nervous", "Okay", "Fairly confident", "Very confident"];

export default function Step1() {
  const router = useRouter();
  const { level, confidence, set } = useOnboarding();
  return (
    <StepShell title="How well do you speak English today?" subtitle="Pick the one that sounds most like you. You can change it later."
      canContinue={Boolean(level && confidence)} onContinue={() => router.push("/onboarding/step-2-goals")}>
      <div role="radiogroup" aria-label="English level" className="space-y-2.5">
        {LEVELS.map((l) => <OptionCard key={l.v} title={l.v} desc={l.d} selected={level === l.v} onClick={() => set({ level: l.v })} />)}
      </div>
      <div>
        <p className="mb-3 text-sm font-semibold text-ink">How do you feel when you speak English out loud?</p>
        <div role="radiogroup" aria-label="Speaking confidence" className="grid grid-cols-5 gap-2">
          {CONFIDENCE.map((c, i) => (
            <button key={c} type="button" role="radio" aria-checked={confidence === i + 1} onClick={() => set({ confidence: i + 1 })}
              className={`rounded-xl border px-1.5 py-3 text-xs font-medium leading-tight transition ${confidence === i + 1 ? "border-brand bg-brand text-white" : "border-line bg-white text-ink hover:border-brand/50"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>
    </StepShell>
  );
}
