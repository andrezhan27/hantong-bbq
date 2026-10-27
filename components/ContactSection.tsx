import { T } from './LanguageProvider';
import { ContactDetails, MapEmbed } from './ContactDetails';
import { ReservationCard } from './ReservationCard';
import { Reveal } from './Motion';
export function ContactSection() {
  return <section id="contactos" className="contact-section" aria-labelledby="contact-heading"><div className="wrap">
    <Reveal className="contact-intro"><span className="eyebrow"><T k="contactLabel" /></span><h2 id="contact-heading"><T k="contactHeading" /></h2></Reveal>
    <div className="contact-grid"><div className="map-container"><MapEmbed /></div><ContactDetails /></div>
    <ReservationCard />
  </div></section>;
}
