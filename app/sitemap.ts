import type { MetadataRoute } from 'next';
import { isIndexable, siteUrl } from '@/config/seo';
import { reservationPageUrl } from '@/config/site';
export default function sitemap(): MetadataRoute.Sitemap {
  return isIndexable && siteUrl ? [
    { url: siteUrl, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}${reservationPageUrl}`, changeFrequency: 'monthly', priority: 0.8 },
  ] : [];
}
