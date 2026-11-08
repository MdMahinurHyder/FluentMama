"use client";
import Link from "next/link";
import { Flame, TrendingUp, Zap } from "lucide-react";
import { displayName, useProfile } from "@/components/layout/ProfileProvider";
import { NAV } from "@/lib/nav";

// DEMO DATA: replaced by real progress tables in Phase 2.
const DEMO = { streak: 7, xp: 1240, minutesToday: 12 };
const MISSIONS = [
  { title: "Vocabulary battle", desc: "Learn and use 10 new words", done: 8, total: 10, href: "/arena", icon: NAV[3].icon },
  { title: "Grammar puzzle", desc: "Fix 5 sentences with tenses", done: 2, total: 5, href: "/mistakes", icon: NAV[5].icon },
  { title: "Speaking practice", desc: "One short voice exercise", done: 0, total: 1, href: "/voice", icon: NAV[6].icon },
];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

function Ring({ pct }: { pct: number }) {
  const r = 22, c = 2 * Math.PI * r;
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">
      <circle cx="28" cy="28" r={r} fill="none" stroke="#E3DDF2" strokeWidth="6" />
      <circle cx="28" cy="28" r={r} fill="none" stroke="#6B3FD4" strokeWidth="6" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} transform="rotate(-90 28 28)" />
    </svg>
  );
}

export default function Dashboard() {
  const { profile } = useProfile();
  const first = displayName(profile).split(" ")[0];
  const goalMin = profile.daily_minutes ?? 20;
  const pct = Math.min(100, Math.round((DEMO.minutesToday / goalMin) * 100));
  const todayIdx = (new Date().getDay() + 6) % 7;
  const hobby = profile.hobbies?.[0];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink">{greeting()}, {first}</h1>
          <p className="mt-1.5 text-muted">
            {profile.goal ? `You are working toward: ${profile.goal.toLowerCase()}.` : "Here is your plan for today."}
          </p>
        </div>
        <Link href="/arena" className="rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark">Continue today&apos;s mission</Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF1CC] text-[#7A5200]"><Flame size={24} /></span>
          <div><p className="text-2xl font-bold text-ink">{DEMO.streak} days</p><p className="text-sm text-muted">Current streak</p></div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand"><Zap size={24} /></span>
          <div><p className="text-2xl font-bold text-ink">{DEMO.xp.toLocaleString()} XP</p><p className="text-sm text-muted">Experience points</p></div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky text-brand-dark"><TrendingUp size={24} /></span>
          <div><p className="text-2xl font-bold text-ink">{profile.english_level ?? "Beginner"}</p><p className="text-sm text-muted">Your level</p></div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5">
          <Ring pct={pct} />
          <div><p className="text-2xl font-bold text-ink">{DEMO.minutesToday}/{goalMin} min</p><p className="text-sm text-muted">Today&apos;s goal</p></div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          {/* Missions */}
          <section className="rounded-2xl border border-line bg-white">
            <h2 className="px-6 pb-2 pt-5 text-lg font-bold text-ink">Today&apos;s plan</h2>
            <ul className="divide-y divide-line">
              {MISSIONS.map(({ title, desc, done, total, href, icon: Icon }) => (
                <li key={title}>
                  <Link href={href} className="flex items-center gap-4 px-6 py-4 transition hover:bg-canvas">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand"><Icon size={20} /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-ink">{title}</span>
                      <span className="block text-sm text-muted">{desc}</span>
                      <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-line"><span className="block h-full rounded-full bg-brand" style={{ width: `${(done / total) * 100}%` }} /></span>
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-brand">{done === 0 ? "Start" : done >= total ? "Done" : "Continue"}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Explore */}
          <section>
            <h2 className="mb-4 text-lg font-bold text-ink">Explore FluentMama</h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {NAV.slice(1).map(({ href, label, desc, icon: Icon }) => (
                <Link key={href} href={href} className="group rounded-2xl border border-line bg-white p-5 transition hover:border-brand/50 hover:shadow-card">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand transition group-hover:bg-brand group-hover:text-white"><Icon size={22} /></span>
                  <p className="mt-4 font-semibold text-ink">{label}</p>
                  <p className="mt-1 text-sm leading-snug text-muted">{desc}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Right column */}
        <aside className="space-y-6">
          <section className="rounded-2xl bg-brand p-6 text-white">
            <h2 className="text-lg font-bold">A gentle suggestion</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/90">Present Perfect is still tricky for you. A ten-minute review will make Advanced Grammar much easier.</p>
            <Link href="/mistakes" className="mt-5 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brand-dark transition hover:bg-brand-soft">Review together</Link>
          </section>

          <section className="rounded-2xl border border-line bg-white p-6">
            <h2 className="text-lg font-bold text-ink">This week</h2>
            <div className="mt-4 flex justify-between">
              {DAYS.map((d, i) => {
                const done = i <= todayIdx && i > todayIdx - DEMO.streak;
                return (
                  <div key={d} className="flex flex-col items-center gap-2">
                    <span className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${done ? "bg-brand text-white" : i === todayIdx ? "border-2 border-brand text-brand" : "bg-canvas text-muted"}`}>{done ? "✓" : ""}</span>
                    <span className="text-xs text-muted">{d}</span>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-white p-6">
            <h2 className="text-lg font-bold text-ink">Made for your interests</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {(profile.hobbies ?? []).map((h) => <span key={h} className="rounded-full bg-brand-soft px-3 py-1.5 text-sm font-medium text-brand-dark">{h}</span>)}
            </div>
            {hobby && (
              <Link href="/conversations" className="mt-4 block text-sm font-semibold text-brand hover:underline">Practice a conversation about {hobby.toLowerCase()}</Link>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}
