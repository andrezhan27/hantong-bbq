import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import { LanguageProvider, SkipLink } from '@/components/LanguageProvider';
import { Navbar } from '@/components/Navbar';
import { isIndexable, metadataBase, siteUrl } from '@/config/seo';
import './globals.css';
const sans = Manrope({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-serif', display: 'swap' });
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
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-PT"><body className={`${sans.variable} ${serif.variable}`}><LanguageProvider><SkipLink /><Navbar />{children}</LanguageProvider></body></html>;
}
