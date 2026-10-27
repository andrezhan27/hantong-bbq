// Server-side deployment metadata. These are supplied by Vercel, not invented domains.
function toOrigin(value: string | undefined): string | undefined {
  if (!value?.trim()) return undefined;
  try {
    const parsed = new URL(value.includes('://') ? value.trim() : `https://${value.trim()}`);
    if (!['http:', 'https:'].includes(parsed.protocol)) return undefined;
    return parsed.origin;
  } catch { return undefined; }
}

const productionOrigin = toOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL);
const deploymentOrigin = toOrigin(process.env.VERCEL_URL);
export const siteUrl = toOrigin(process.env.NEXT_PUBLIC_SITE_URL) ?? productionOrigin ?? deploymentOrigin;
export const isIndexable = Boolean(siteUrl) && (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'production');
export const metadataBase = new URL(
  (process.env.VERCEL_ENV === 'preview' ? deploymentOrigin ?? siteUrl : siteUrl ?? deploymentOrigin)
  ?? 'http://localhost:3000',
);
