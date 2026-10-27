'use client';
import Image from 'next/image';
import type { PhotoAsset } from '@/config/assets';
import { useLanguage } from './LanguageProvider';
export function RestaurantImage({ asset, sizes, priority = false, className = '' }: { asset: PhotoAsset; sizes: string; priority?: boolean; className?: string }) {
  const { language } = useLanguage();
  return <Image className={`restaurant-image ${className}`} src={asset.src} alt={asset.alt[language]} fill sizes={sizes} preload={priority} style={{ objectPosition: asset.position ?? 'center' }} />;
}
