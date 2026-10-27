import { assets } from '@/config/assets';
import { T } from './LanguageProvider';
import { MenuButton } from './Buttons';
import { RestaurantImage } from './RestaurantImage';
import { Reveal } from './Motion';
// Column spans mirror the packed desktop (12-column) and tablet (6-column) grids.
const collageSpans = [
  [7, 4], [5, 2], [3, 2], [4, 2], [5, 2],
  [3, 2], [4, 2], [5, 2], [7, 4], [5, 2],
] as const;
const collageSizes = collageSpans.map(([desktop, tablet]) => {
  const maximumWidth = Math.ceil(104.5 * desktop - 6);
  return `(min-width: 1360px) ${maximumWidth}px, (min-width: 864px) ${Math.ceil(desktop / 12 * 100)}vw, (min-width: 541px) ${Math.ceil(tablet / 6 * 100)}vw, calc(100vw - 40px)`;
});
export function SpaceSection() {
  return <section id="espaco" className="space-section" aria-labelledby="space-heading"><div className="wrap">
    <Reveal className="space-intro"><div><span className="eyebrow"><T k="spaceLabel" /></span><h2 id="space-heading"><T k="spaceHeading" /></h2></div><div className="space-intro-aside"><p><T k="spaceBody" /></p><MenuButton /></div></Reveal>
    <div className="collage-container"><div className="collage">
      {assets.collage.map((asset, index) => <figure className={`collage-photo collage-photo-${index + 1}`} key={asset.id}>
        <RestaurantImage asset={asset} sizes={collageSizes[index] ?? '100vw'} />
      </figure>)}
    </div></div>
    <div className="space-caption"><span>Han Tong — Korean BBQ</span><span><T k="spaceCaption" /></span></div>
  </div></section>;
}
