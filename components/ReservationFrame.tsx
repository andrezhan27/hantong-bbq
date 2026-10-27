'use client';
import { restaurant } from '@/config/site';
import { useLanguage } from './LanguageProvider';

export function ReservationFrame() {
  const { t } = useLanguage();
  return <iframe
    className="reservation-page-frame block h-full w-full border-0"
    loading="eager"
    src={restaurant.reservationWidgetUrl}
    title={t('reservationFrameTitle')}
  />;
}
