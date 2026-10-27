import Image from 'next/image';
import { assets } from '@/config/assets';
import { legalLinks } from '@/config/site';
import { legalContentProvider } from '@/lib/legal';
import { T } from './LanguageProvider';
import { FooterLinks } from './FooterInteractive';
export async function Footer() {
  const [ptTerms, ptPrivacy, enTerms, enPrivacy] = await Promise.all([
    legalContentProvider.getContent('terms', 'pt'), legalContentProvider.getContent('privacy', 'pt'),
    legalContentProvider.getContent('terms', 'en'), legalContentProvider.getContent('privacy', 'en'),
  ]);
  return <footer className="footer"><div className="wrap">
    <div className="footer-main"><a className="footer-brand" href="#inicio"><Image src={assets.logo} alt="Han Tong — Korean BBQ" width={88} height={88} sizes="88px" /><span><T k="footerLine" /></span></a><FooterLinks documents={{ pt: { terms: ptTerms, privacy: ptPrivacy }, en: { terms: enTerms, privacy: enPrivacy } }} /></div>
    <div className="footer-bottom"><span><T k="copyright" /></span><span><T k="poweredBy" /> <a href={legalLinks.intelis} target="_blank" rel="noopener noreferrer">Intelis<span aria-hidden="true"> ↗</span></a>.</span></div>
  </div></footer>;
}
