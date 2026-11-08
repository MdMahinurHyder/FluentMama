"use client";
import { useRouter } from "next/navigation";
import StepShell from "@/components/onboarding/StepShell";
import OptionCard from "@/components/onboarding/OptionCard";
import { useOnboarding } from "@/store/onboardingStore";

const GOALS = [
  { v: "Job interviews", d: "Speak clearly and confidently at work." },
  { v: "IELTS or study abroad", d: "Prepare for exams and university life." },
  { v: "Daily conversation", d: "Chat comfortably with friends and strangers." },
  { v: "Travel", d: "Handle trips, hotels and directions." },
];
const TIME = [
  { m: 10, n: "Casual", d: "10 minutes a day" },
  { m: 20, n: "Steady", d: "20 minutes a day" },
  { m: 40, n: "Keen", d: "40 minutes a day" },
  { m: 60, n: "Intense", d: "60 minutes a day" },
];

export default function Step2() {
  const router = useRouter();
  const { goal, minutes, set } = useOnboarding();
  return (
    <StepShell title="What do you want to learn, and how much time do you have?" subtitle="We use this to shape your daily missions."
      backHref="/onboarding/step-1-level" canContinue={Boolean(goal && minutes)} onContinue={() => router.push("/onboarding/step-3-hobbies")}>
      <div>
        <p className="mb-3 text-sm font-semibold text-ink">My main goal</p>
        <div role="radiogroup" aria-label="Goal" className="space-y-2.5">
          {GOALS.map((g) => <OptionCard key={g.v} title={g.v} desc={g.d} selected={goal === g.v} onClick={() => set({ goal: g.v })} />)}
        </div>
      </div>
      <div>
        <p className="mb-3 text-sm font-semibold text-ink">Time I can give each day</p>
        <div role="radiogroup" aria-label="Daily time" className="grid gap-2.5 sm:grid-cols-2">
          {TIME.map((t) => <OptionCard key={t.m} title={t.n} desc={t.d} selected={minutes === t.m} onClick={() => set({ minutes: t.m })} />)}
        </div>
      </div>
    </StepShell>
  );
}
