import 'server-only';
import { cache } from 'react';
import type { Language } from '@/config/translations';
import { restaurant } from '@/config/site';
import { getSupabaseServerClient } from './supabase';

export type LegalDocument = 'terms' | 'privacy';
export type LegalContent = { status: 'available'; url: string } | { status: 'pending' };
export interface LegalContentProvider {
  getContent(document: LegalDocument, language: Language): Promise<LegalContent>;
}

// Database URLs are untrusted. Only ordinary web links may reach footer anchors.
function legalUrl(value: unknown): string | null {
  if (typeof value !== 'string' || !value.trim()) return null;
  try {
    const parsed = new URL(value.trim());
    return ['https:', 'http:'].includes(parsed.protocol) && !parsed.username && !parsed.password ? parsed.href : null;
  } catch { return null; }
}

// Deduplicate the four PT/EN footer reads; Next's fetch cache refreshes every five minutes.
const getRestaurantLegalLinks = cache(async () => {
  try {
    const supabase = getSupabaseServerClient();
    if (!supabase) return null;
    const { data, error } = await supabase.from('restaurants')
      .select('privacy_policy_url,terms_and_conditions_url')
      .eq('id', restaurant.id)
      .abortSignal(AbortSignal.timeout(5000))
      .maybeSingle();
    if (error) {
      console.warn('[legal] Supabase restaurant links unavailable; showing placeholder dialogs.', error.code);
      return null;
    }
    if (!data) return null;
    return { privacy: legalUrl(data.privacy_policy_url), terms: legalUrl(data.terms_and_conditions_url) };
  } catch {
    console.warn('[legal] Unable to read Supabase restaurant links; showing placeholder dialogs.');
    return null;
  }
});

export const legalContentProvider: LegalContentProvider = {
  async getContent(document) {
    // The supplied schema has one URL per document, shared by both interface languages.
    const links = await getRestaurantLegalLinks();
    const url = links?.[document];
    return url ? { status: 'available', url } : { status: 'pending' };
  },
};
