"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { LogoMark } from "@/components/brand/Logo";

type Msg = { from: "bot" | "me"; text: string };

const QUICK = ["What is FluentMama?", "How do I sign up?", "Is it free?", "Can I learn in Bangla?"];

const ANSWERS: [RegExp, string][] = [
  [/sign ?up|register|account|join/i, "Choose “Create account”, add your name, email and a password (or use Google). Then answer three short questions so we can set your starting level."],
  [/free|price|cost|pay/i, "You can start learning for free. Paid plans are not part of this prototype."],
  [/bangla|bengali|বাংলা/i, "Yes. Our tutor explains grammar and vocabulary in both Bangla and English, based on your level."],
  [/login|password|forgot/i, "On the login page, use “Forgot password?” to reset it. If you signed up with Google, choose “Continue with Google”."],
  [/what|about|fluent/i, "FluentMama helps Bengali speakers learn spoken English through games, an AI tutor, speaking practice and lessons that adapt to you."],
];

function reply(q: string) {
  const hit = ANSWERS.find(([re]) => re.test(q));
  return hit ? hit[1] : "I can help with signing up, logging in, and what FluentMama offers. Try one of the quick questions below.";
}

export default function SupportBot() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: "Hi! I’m Mama, your FluentMama helper. What would you like to know?" }]);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, open]);

  function send(q: string) {
    const t = q.trim();
    if (!t) return;
    setMsgs((m) => [...m, { from: "me", text: t }, { from: "bot", text: reply(t) }]);
    setText("");
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="flex h-[480px] w-[340px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card"
            role="dialog"
            aria-label="FluentMama support chat"
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3">
              <LogoMark size={30} />
              <div className="flex-1">
                <p className="text-sm font-semibold text-ink">Mama, support assistant</p>
                <p className="text-xs text-muted">Usually replies instantly</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-muted hover:text-ink"><X size={18} /></button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {msgs.map((m, i) => (
                <div key={i} className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${m.from === "me" ? "ml-auto rounded-br-sm bg-brand text-white" : "rounded-bl-sm bg-canvas text-ink"}`}>
                  {m.text}
                </div>
              ))}
              <div ref={end} />
            </div>

            <div className="flex flex-wrap gap-2 px-4 pb-2">
              {QUICK.map((q) => (
                <button key={q} onClick={() => send(q)} className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink hover:bg-brand-soft">{q}</button>
              ))}
            </div>

            <form onSubmit={(e) => { e.preventDefault(); send(text); }} className="flex items-center gap-2 border-t border-line p-3">
              <input value={text} onChange={(e) => setText(e.target.value)} aria-label="Ask a question" placeholder="Ask us anything…" className="h-10 flex-1 rounded-lg border border-line px-3 text-sm focus:border-brand focus:outline-none" />
              <button type="submit" aria-label="Send" className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand text-white hover:bg-brand-dark"><Send size={16} /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={() => setOpen(!open)} aria-label={open ? "Close support chat" : "Open support chat"} className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-white shadow-card transition hover:scale-105">
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
