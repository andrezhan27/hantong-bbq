'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { navigation } from '@/config/site';
import { assets } from '@/config/assets';
import { trapDialogFocus } from '@/lib/dialog-focus';
import { LanguageToggle, useLanguage } from './LanguageProvider';
import { ReservationButton } from './Buttons';
export function Navbar() {
  const { t } = useLanguage();
  const isHome = usePathname() === '/';
  const sectionHref = (hash: string) => isHome ? hash : `/${hash}`;
  const [scrolled, setScrolled] = useState(false), [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 36);
    const closeMenu = () => setOpen(false);
    update(); window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('popstate', closeMenu);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('popstate', closeMenu); };
  }, []);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    dialog.showModal();
    const trigger = triggerRef.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnDesktop = () => { if (window.innerWidth >= 900) setOpen(false); };
    window.addEventListener('resize', closeOnDesktop);
    return () => { dialog.close(); document.body.style.overflow = previous; trigger?.focus(); window.removeEventListener('resize', closeOnDesktop); };
  }, [open]);
  return <>
    <header className={`navbar ${scrolled || !isHome ? 'is-scrolled' : ''}`}>
      <div className="nav-inner">
        <Link href={sectionHref('#inicio')} className="brand" aria-label={t('backHome')}><Image src={assets.logo} alt="Han Tong" width={64} height={64} sizes="64px" /><span className="brand-wordmark"><strong>Han Tong</strong><span>Korean BBQ</span></span></Link>
        <nav className="desktop-nav" aria-label={t('navigation')}>{navigation.map(item => <Link key={item.href} href={sectionHref(item.href)}>{t(item.key)}</Link>)}</nav>
        <div className="nav-actions"><LanguageToggle /><div className="nav-reserve"><ReservationButton compact /></div>
          <button ref={triggerRef} className="icon-button mobile-menu-button" type="button" aria-label={t('openNavigation')} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(true)}><Menu size={25} /></button>
        </div>
      </div>
    </header>
    <dialog ref={dialogRef} id="mobile-navigation" className="mobile-dialog" aria-label={t('navigation')} aria-modal="true" onKeyDown={trapDialogFocus} onCancel={() => setOpen(false)} onClick={e => { if (e.target === e.currentTarget) setOpen(false); }}>
      <div className="mobile-dialog-inner">
        <div className="mobile-dialog-top"><Image src={assets.logo} alt="Han Tong" width={70} height={70} /><button className="icon-button" type="button" aria-label={t('closeNavigation')} onClick={() => setOpen(false)}><X size={27} /></button></div>
        <nav aria-label={t('navigation')}>{navigation.map((item, index) => <Link key={item.href} href={sectionHref(item.href)} onClick={() => setOpen(false)}><span className="mobile-link-number">0{index + 1}</span>{t(item.key)}<ArrowUpRight size={25} /></Link>)}</nav>
        <ReservationButton onNavigate={() => setOpen(false)} />
      </div>
    </dialog>
  </>;
}
