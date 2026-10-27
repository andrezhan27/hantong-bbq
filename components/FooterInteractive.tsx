'use client';
import { useState } from 'react';
import { Instagram, Facebook } from 'lucide-react';
import { legalLinks, navigation, restaurant } from '@/config/site';
import { useLanguage } from './LanguageProvider';
import { Dialog } from './Dialog';
import type { LegalContent, LegalDocument } from '@/lib/legal';
type Documents = Record<'pt' | 'en', Record<LegalDocument, LegalContent>>;
export function FooterLinks({ documents }: { documents: Documents }) {
  const { t, language } = useLanguage();
  const [document, setDocument] = useState<LegalDocument | null>(null);
  return <>
    <nav className="footer-nav" aria-label={t('footerNavigation')}>{navigation.map(item => <a href={item.href} key={item.href}>{t(item.key)}</a>)}<a href="#imprensa">{t('navPress')}</a></nav>
    <div className="footer-social"><a className="icon-button" href={restaurant.instagram} target="_blank" rel="noopener noreferrer" aria-label={t('instagramLabel')}><Instagram size={19} /></a><a className="icon-button" href={restaurant.facebook} target="_blank" rel="noopener noreferrer" aria-label={t('facebookLabel')}><Facebook size={19} /></a></div>
    <div className="footer-legal"><a href={legalLinks.complaints} target="_blank" rel="noopener noreferrer">{t('complaints')}</a>{(['terms', 'privacy'] as const).map(kind => {
      const content = documents[language][kind];
      return content.status === 'available'
        ? <a key={kind} href={content.url} target="_blank" rel="noopener noreferrer" aria-label={`${t(kind)} (${t('opensInNewTab')})`}>{t(kind)}</a>
        : <button key={kind} type="button" aria-haspopup="dialog" onClick={() => setDocument(kind)}>{t(kind)}</button>;
    })}</div>
    {document && <Dialog open onClose={() => setDocument(null)} title={t(document)}><p>{t('legalSoon')}</p><a className="text-link" href={restaurant.phoneHref}>{restaurant.phone}</a></Dialog>}
  </>;
}
