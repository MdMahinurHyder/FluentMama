import { ClipboardCheck, GraduationCap, Home, Map as MapIcon, MessagesSquare, Mic, Swords, type LucideIcon } from "lucide-react";

export type NavItem = { href: string; label: string; desc: string; icon: LucideIcon };

export const NAV: NavItem[] = [
  { href: "/dashboard", label: "Home", desc: "Your plan for today", icon: Home },
  { href: "/tutor", label: "AI Tutor", desc: "Ask anything in Bangla or English", icon: GraduationCap },
  { href: "/conversations", label: "Conversations", desc: "Practice real-life situations", icon: MessagesSquare },
  { href: "/arena", label: "Challenge Arena", desc: "Timed quizzes and friend duels", icon: Swords },
  { href: "/worlds", label: "Learning Worlds", desc: "Unlock new missions as you improve", icon: MapIcon },
  { href: "/mistakes", label: "Mistakes", desc: "Fix the errors you repeat most", icon: ClipboardCheck },
  { href: "/voice", label: "Voice Coach", desc: "Improve your pronunciation and accent", icon: Mic },
];
