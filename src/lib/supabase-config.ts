// The live backend that already holds the app's real users, balances and the
// Telegram bot. Pinned on purpose (not read from VITE_* env) so this project's
// own environment can never redirect the app to a different, empty database.
// These are publishable/anon values — safe to ship in the client bundle.

export const SUPABASE_PROJECT_ID = "iqosbhbbyzqozfgpthyj";

export const SUPABASE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co`;

export const SUPABASE_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlxb3NiaGJieXpxb3pmZ3B0aHlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1NzgyNTMsImV4cCI6MjEwNDE1NDI1M30.7oNaInWRGvZXfnwc_zGTghRDuGuV84Rhj4Fi_zx48uA";
