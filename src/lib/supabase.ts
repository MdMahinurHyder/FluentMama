import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseReady = Boolean(url && key);

// Placeholder values keep the app from crashing before .env.local is filled in.
export const supabase = createClient(url || "http://localhost:54321", key || "missing-key");

export const NOT_READY_MESSAGE =
  "Supabase keys are missing. Copy .env.local.example to .env.local, add your keys, then restart npm run dev.";
