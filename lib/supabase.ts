import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

/** Stateless, publishable-key client for public restaurant content on the server. */
export function getSupabaseServerClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!url || !key) return null;
  if (client) return client;
  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: {
      fetch: (input, init) => fetch(input, { ...init, next: { revalidate: 300 } }),
    },
  });
  return client;
}
