import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { connection } from 'next/server';
import localFont from 'next/font/local';
import { LanguageProvider, SkipLink } from '@/components/LanguageProvider';
import { Navbar } from '@/components/Navbar';
import { PromotionBanner } from '@andrezhan27/intelis-restaurant-ui';
import { restaurant } from '@/config/site';
import { isIndexable, metadataBase, siteUrl } from '@/config/seo';
import './globals.css';
const sans = localFont({ src: './fonts/manrope-latin.woff2', weight: '200 800', variable: '--font-sans', display: 'swap' });
const serif = localFont({ src: './fonts/cormorant-garamond-latin.woff2', weight: '300 700', variable: '--font-serif', display: 'swap', adjustFontFallback: 'Times New Roman' });
const description = 'Barbecue coreano em Lisboa, para grelhar à mesa e partilhar bons momentos. Visite o Han Tong na Estrada da Luz 110A.';
export const metadata: Metadata = {
  title: 'Han Tong — Korean BBQ em Lisboa', description,
  metadataBase,
  ...(siteUrl ? { alternates: { canonical: '/' } } : {}),
  openGraph: { title: 'Han Tong — Korean BBQ', description, locale: 'pt_PT', type: 'website', siteName: 'Han Tong', ...(siteUrl ? { url: siteUrl } : {}) },
  twitter: { card: 'summary_large_image', title: 'Han Tong — Korean BBQ em Lisboa', description },
  robots: { index: isIndexable, follow: isIndexable },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#141412' };
async function RestaurantPromotions() {
  // Fetch the live snapshot at request time, outside static prerendering.
  await connection();
  return <PromotionBanner restaurantId={restaurant.id} supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL} supabasePublishableKey={process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY} />;
}
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-PT"><body className={`${sans.variable} ${serif.variable}`}><LanguageProvider><SkipLink /><Suspense fallback={null}><RestaurantPromotions /></Suspense><Navbar />{children}</LanguageProvider></body></html>;
}
