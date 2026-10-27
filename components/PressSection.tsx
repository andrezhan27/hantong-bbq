import { ArrowUpRight } from 'lucide-react';
import { pressLinks } from '@/config/site';
import { T } from './LanguageProvider';
import { RestaurantImage } from './RestaurantImage';
export function PressSection() {
  return <section id="imprensa" className="press-section" aria-labelledby="press-heading"><div className="wrap">
    <div className="press-heading"><span className="eyebrow"><T k="pressLabel" /></span><h2 id="press-heading"><T k="pressHeading" /></h2></div>
    <div className="press-grid">{pressLinks.map(link => <a href={link.url} target="_blank" rel="noopener noreferrer" className="press-card" key={link.name}>
      <div className="press-card-image"><RestaurantImage asset={link.image} sizes="(min-width: 1360px) 403px, (min-width: 900px) 30vw, (min-width: 601px) 38vw, calc(100vw - 40px)" /></div>
      <div className="press-card-body"><div className="press-card-meta"><span className="press-brand">{link.name}</span><span className="press-kind"><T k={link.type === 'listing' ? 'listing' : 'article'} /></span></div><h3>{link.title}</h3><span className="press-action"><T k={link.type === 'listing' ? 'viewCorner' : 'readArticle'} /><ArrowUpRight size={17} aria-hidden="true" /></span></div>
    </a>)}</div>
  </div></section>;
}
