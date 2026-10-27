'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { PhotoAsset } from '@/config/assets';
import { RestaurantImage } from './RestaurantImage';
import { useLanguage } from './LanguageProvider';
export function ImageMarquee({ images, row }: { images: readonly PhotoAsset[]; row: 0 | 1 }) {
  const { t } = useLanguage();
  const container = useRef<HTMLDivElement>(null), group = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);
  const [geometry, setGeometry] = useState({ distance: 1780, copies: 3 });
  const reduced = useReducedMotion();
  useEffect(() => {
    const element = container.current, firstGroup = group.current;
    if (!element || !firstGroup) return;
    let visible = false;
    function updateRunning() { setRunning(visible && !document.hidden); }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; updateRunning(); });
    observer.observe(element);
    const resize = new ResizeObserver(() => {
      const distance = firstGroup.getBoundingClientRect().width;
      if (distance > 0) setGeometry({ distance, copies: Math.max(2, Math.ceil(element.clientWidth / distance) + 2) });
    });
    resize.observe(firstGroup); resize.observe(element);
    document.addEventListener('visibilitychange', updateRunning);
    return () => { observer.disconnect(); resize.disconnect(); document.removeEventListener('visibilitychange', updateRunning); };
  }, []);
  const style = {
    '--marquee-distance': `${geometry.distance}px`,
    '--marquee-duration': `${geometry.distance / 42}s`,
    '--marquee-offset': row === 1 ? '155px' : '0px',
    animationPlayState: running && !reduced ? 'running' : 'paused',
  } as CSSProperties;
  return <div ref={container} className={`marquee-row marquee-row-${row + 1}`} role="region" aria-label={t(row === 0 ? 'marqueeOne' : 'marqueeTwo')} tabIndex={reduced ? 0 : undefined}>
    <div className="marquee-track" style={style}>
      {Array.from({ length: geometry.copies }, (_, copy) => <div ref={copy === 0 ? group : undefined} key={copy} className="marquee-group" aria-hidden={copy > 0 ? true : undefined}>
        {images.map(asset => <div key={asset.id} className="marquee-photo"><RestaurantImage asset={asset} sizes="(max-width: 600px) 260px, 340px" /></div>)}
      </div>)}
    </div>
  </div>;
}
