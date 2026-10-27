import type { MetadataRoute } from 'next';
import { isIndexable, siteUrl } from '@/config/seo';
export default function robots(): MetadataRoute.Robots {
  return isIndexable && siteUrl ? { rules: { userAgent: '*', allow: '/' }, sitemap: `${siteUrl}/sitemap.xml` } : { rules: { userAgent: '*', disallow: '/' } };
}
