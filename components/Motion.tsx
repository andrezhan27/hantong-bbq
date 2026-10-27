'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import { motion, useAnimate, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const [scope, animate] = useAnimate();
  const inView = useInView(scope, { once: true, margin: '0px 0px -30px 0px' });
  const reduced = useReducedMotion();
  useEffect(() => {
    if (inView && !reduced) {
      const animation = animate(scope.current, { opacity: [.45, 1], y: [14, 0] }, { duration: .65, ease: [.22, 1, .36, 1] });
      return animation.stop;
    }
  }, [inView, reduced, animate, scope]);
  return <div ref={scope} className={className}>{children}</div>;
}
export function HeroVisual({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 55]);
  return <div ref={ref} className="hero-visual"><motion.div className="hero-image-inner" style={{ y: reduced ? 0 : y }}>{children}</motion.div></div>;
}
