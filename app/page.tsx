import { Hero } from '@/components/Hero';
import { MenuSection } from '@/components/MenuSection';
import { SpaceSection } from '@/components/SpaceSection';
import { ContactSection } from '@/components/ContactSection';
import { PressSection } from '@/components/PressSection';
import { Footer } from '@/components/Footer';
import { restaurant } from '@/config/site';
import { siteUrl } from '@/config/seo';
export const revalidate = 300;
const structuredData = {
  '@context': 'https://schema.org', '@type': 'Restaurant',
  name: restaurant.name, ...(siteUrl ? { url: siteUrl } : {}),
  telephone: restaurant.internationalPhone, servesCuisine: restaurant.cuisine,
  address: { '@type': 'PostalAddress', ...restaurant.postalAddress },
  openingHoursSpecification: restaurant.openingPeriods.map(period => ({
    '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    ...period,
  })),
  sameAs: [restaurant.instagram, restaurant.facebook],
};
export default function Home() {
  return <><main id="main" tabIndex={-1}><Hero /><MenuSection /><SpaceSection /><ContactSection /><PressSection /></main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} /></>;
}
