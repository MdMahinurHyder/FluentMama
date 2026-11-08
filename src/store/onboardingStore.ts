import { create } from "zustand";

type State = {
  level: string;
  confidence: number;
  goal: string;
  minutes: number;
  hobbies: string[];
  set: (p: Partial<Omit<State, "set" | "toggleHobby">>) => void;
  toggleHobby: (h: string) => void;
};

export const useOnboarding = create<State>()((set) => ({
  level: "",
  confidence: 0,
  goal: "",
  minutes: 0,
  hobbies: [],
  set: (p) => set(p),
  toggleHobby: (h) =>
    set((s) => ({ hobbies: s.hobbies.includes(h) ? s.hobbies.filter((x) => x !== h) : [...s.hobbies, h] })),
}));
