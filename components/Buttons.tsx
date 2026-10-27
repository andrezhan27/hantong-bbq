'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Phone } from 'lucide-react';
import { menuPdfUrl, reservationPageUrl, restaurant } from '@/config/site';
import { useLanguage } from './LanguageProvider';
import { Dialog } from './Dialog';
export function ReservationButton({ compact = false, onNavigate }: { compact?: boolean; onNavigate?: () => void }) {
  const { t } = useLanguage();
  return <div className={`reservation-action ${compact ? 'compact' : ''}`}>
    <Link href={reservationPageUrl} className="button button-primary" onClick={onNavigate}>
      {t('reserve')}
    </Link>
  </div>;
}
export function MenuButton({ variant = 'outline' }: { variant?: 'outline' | 'dark' }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const className = `button button-${variant}`;
  if (menuPdfUrl) return <a href={menuPdfUrl} target="_blank" rel="noopener noreferrer" className={className}>{t('viewMenu')}<ArrowUpRight size={17} aria-hidden="true" /></a>;
  return <>
    <button type="button" className={className} onClick={() => setOpen(true)} aria-haspopup="dialog">{t('viewMenu')}<ArrowUpRight size={17} aria-hidden="true" /></button>
    {open && <Dialog open={open} onClose={() => setOpen(false)} title={t('menuSoonTitle')}>
      <p>{t('menuSoonBody')}</p><a className="button button-primary" href={restaurant.phoneHref}><Phone size={17} aria-hidden="true" />{t('callUs')} · {restaurant.phone}</a>
    </Dialog>}
  </>;
}
