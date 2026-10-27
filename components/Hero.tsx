import { assets } from '@/config/assets';
import { T } from './LanguageProvider';
import { RestaurantImage } from './RestaurantImage';
import { MenuButton, ReservationButton } from './Buttons';
import { HeroVisual, Reveal } from './Motion';
export function Hero() {
  return <section id="inicio" className="hero" aria-labelledby="hero-title" style={{ '--hero-position-desktop': assets.heroFocalPoint.desktop, '--hero-position-mobile': assets.heroFocalPoint.mobile } as React.CSSProperties}>
    <HeroVisual><RestaurantImage asset={assets.hero} priority sizes="100vw" className="hero-photo" /></HeroVisual>
    <div className="hero-shade" />
    <div className="hero-content wrap"><Reveal>
      <h1 id="hero-title">Han Tong<span className="hero-name-dot" aria-hidden="true">.</span></h1>
      <div className="hero-subtitle">Korean BBQ</div>
      <p className="hero-description"><T k="heroBody" /></p>
      <div className="hero-actions"><ReservationButton /><MenuButton /></div>
    </Reveal></div>
    <div className="hero-bottom wrap"><span><T k="heroLocation" /></span></div>
  </section>;
}
