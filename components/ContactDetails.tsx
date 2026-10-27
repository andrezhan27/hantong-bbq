'use client';
import { ArrowUpRight, AtSign, Clock3, MapPin, Phone } from 'lucide-react';
import { restaurant } from '@/config/site';
import { useLanguage } from './LanguageProvider';
export function MapEmbed() {
  const { t } = useLanguage();
  return <iframe src={restaurant.mapEmbed} className="map-iframe" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" title={t('mapTitle')} />;
}
export function ContactDetails() {
  const { t } = useLanguage();
  return <div className="contact-details">
    <div className="detail-row"><MapPin size={19} aria-hidden="true" /><div><h3>{t('address')}</h3><address className="detail-value">{restaurant.address}</address><a className="text-link" href={restaurant.directions} target="_blank" rel="noopener noreferrer">{t('directions')}<ArrowUpRight size={15} aria-hidden="true" /></a></div></div>
    <div className="detail-row"><Clock3 size={19} aria-hidden="true" /><div><h3>{t('hours')}</h3><p className="detail-value">{t('everyDay')}<br />{restaurant.hours[0]} <span className="hours-divider">/</span> {restaurant.hours[1]}</p></div></div>
    <div className="detail-row"><Phone size={19} aria-hidden="true" /><div><h3>{t('phone')}</h3><a className="detail-value phone-link" href={restaurant.phoneHref}>{restaurant.phone}</a></div></div>
    <div className="detail-row"><AtSign size={19} aria-hidden="true" /><div><h3>{t('socialMedia')}</h3><div className="detail-value contact-social-links"><a href={restaurant.instagram} target="_blank" rel="noopener noreferrer" aria-label={t('instagramLabel')}>Instagram<ArrowUpRight size={14} aria-hidden="true" /></a><a href={restaurant.facebook} target="_blank" rel="noopener noreferrer" aria-label={t('facebookLabel')}>Facebook<ArrowUpRight size={14} aria-hidden="true" /></a></div></div></div>
  </div>;
}
