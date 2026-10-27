import { assets } from '@/config/assets';
import { T } from './LanguageProvider';
import { MenuButton } from './Buttons';
import { ImageMarquee } from './ImageMarquee';
import { Reveal } from './Motion';
export function MenuSection() {
  return <section id="menu" className="menu-section" aria-labelledby="menu-heading">
    <Reveal className="section-intro wrap"><span className="eyebrow"><T k="menuLabel" /></span><h2 id="menu-heading"><T k="menuHeading" /></h2><p><T k="menuBody" /></p></Reveal>
    <div className="marquee-rows"><ImageMarquee images={assets.marqueeRows[0]} row={0} /><ImageMarquee images={assets.marqueeRows[1]} row={1} /></div>
    <div className="menu-bottom"><MenuButton variant="dark" /></div>
  </section>;
}
