'use client';
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { translations, type Language, type TranslationKey } from '@/config/translations';
type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void; t: (key: TranslationKey) => string };
const LanguageContext = createContext<LanguageContextValue | null>(null);
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, updateLanguage] = useState<Language>('pt');
  useEffect(() => {
    try {
      const saved = localStorage.getItem('han-tong-language');
      if (saved === 'pt' || saved === 'en') {
        // The initial render always matches the server. Restore only after hydration.
        const frame = requestAnimationFrame(() => updateLanguage(saved));
        return () => cancelAnimationFrame(frame);
      }
    } catch { /* Browsers with storage disabled still support switching. */ }
  }, []);
  useEffect(() => { document.documentElement.lang = language === 'pt' ? 'pt-PT' : 'en'; }, [language]);
  const setLanguage = useCallback((next: Language) => {
    updateLanguage(next);
    try { localStorage.setItem('han-tong-language', next); } catch { /* Optional persistence. */ }
  }, []);
  return <LanguageContext.Provider value={{ language, setLanguage, t: key => translations[language][key] }}>{children}</LanguageContext.Provider>;
}
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage requires LanguageProvider');
  return context;
}
export function T({ k }: { k: TranslationKey }) { return useLanguage().t(k); }
export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();
  return <div className="language-toggle" role="group" aria-label={t('languageLabel')}>
    <button type="button" lang="pt-PT" aria-label={t('switchPortuguese')} aria-pressed={language === 'pt'} onClick={() => setLanguage('pt')}>PT</button>
    <span aria-hidden="true">/</span>
    <button type="button" lang="en" aria-label={t('switchEnglish')} aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
  </div>;
}
export function SkipLink() { return <a href="#main" className="skip-link"><T k="skip" /></a>; }
