'use client';
import { useEffect, useId, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { trapDialogFocus } from '@/lib/dialog-focus';
export function Dialog({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const { t } = useLanguage();
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !open) return;
    const previous = document.activeElement as HTMLElement | null;
    dialog.showModal();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { dialog.close(); document.body.style.overflow = oldOverflow; previous?.focus(); };
  }, [open]);
  return <dialog ref={ref} className="content-dialog" aria-labelledby={titleId} aria-modal="true" onKeyDown={trapDialogFocus} onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="dialog-inner">
      <button className="icon-button dialog-close" type="button" aria-label={t('close')} onClick={onClose}><X size={22} /></button>
      <span className="eyebrow">Han Tong</span>
      <h2 id={titleId}>{title}</h2>
      {children}
    </div>
  </dialog>;
}
