import { assets } from '@/config/assets';
import { T } from './LanguageProvider';
import { ReservationButton } from './Buttons';
import { RestaurantImage } from './RestaurantImage';
export function ReservationCard() {
  return <div className="reservation-card"><div className="reservation-card-copy"><h2><T k="reserveHeading" /></h2><p><T k="reserveBody" /></p><ReservationButton /></div><div className="reservation-card-photo"><RestaurantImage asset={assets.reservation} sizes="(max-width: 600px) 90vw, 40vw" /></div></div>;
}
