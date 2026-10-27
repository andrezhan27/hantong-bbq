import type { Metadata } from 'next';
import { ReservationFrame } from '@/components/ReservationFrame';
import { T } from '@/components/LanguageProvider';
import { reservationPageUrl } from '@/config/site';
import { siteUrl } from '@/config/seo';

const title = 'Reservar mesa — Han Tong Korean BBQ';
const description = 'Reserve a sua mesa no Han Tong — Korean BBQ, na Estrada da Luz 110A, em Lisboa.';
export const metadata: Metadata = {
  title,
  description,
  ...(siteUrl ? { alternates: { canonical: reservationPageUrl } } : {}),
  openGraph: {
    title, description, type: 'website', siteName: 'Han Tong', locale: 'pt_PT',
    ...(siteUrl ? { url: `${siteUrl}${reservationPageUrl}` } : {}),
  },
  twitter: { card: 'summary_large_image', title, description },
};

export default function ReservationPage() {
  return <>
    <main id="main" className="reservation-page" tabIndex={-1}>
      <h1 className="sr-only"><T k="reservationTitle" /></h1>
      <ReservationFrame />
    </main>
  </>;
}
