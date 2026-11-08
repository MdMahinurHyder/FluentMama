import { supabase } from "./supabase";

type Pusher = { push: (path: string) => void };

// After any login/signup: new users go to onboarding, returning users go to the app.
export async function routeAfterAuth(router: Pusher) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return router.push("/login");
  const { data } = await supabase.from("profiles").select("onboarding_completed").eq("id", user.id).maybeSingle();
  router.push(data?.onboarding_completed ? "/dashboard" : "/onboarding/step-1-level");
}

export async function signInWithGoogle() {
  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${window.location.origin}/auth/callback` },
  });
}
