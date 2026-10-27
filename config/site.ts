import { photos } from './assets';

export const reservationPageUrl = '/reservation';

export const restaurant = {
  id: 'hantong',
  name: 'Han Tong — Korean BBQ',
  address: 'Estrada da Luz 110A, 1600-153 Lisboa',
  phone: '215 874 533',
  phoneHref: 'tel:+351215874533',
  internationalPhone: '+351215874533',
  cuisine: 'Korean barbecue',
  postalAddress: { streetAddress: 'Estrada da Luz 110A', postalCode: '1600-153', addressLocality: 'Lisboa', addressCountry: 'PT' },
  openingPeriods: [{ opens: '12:00', closes: '15:00' }, { opens: '19:00', closes: '23:00' }],
  hours: ['12:00–15:00', '19:00–23:00'],
  instagram: 'https://www.instagram.com/hantong_bbq',
  facebook: 'https://www.facebook.com/hanTongbbq',
  reservationWidgetUrl: 'https://reserve.intelis.pt/hantong',
  directions: 'https://www.google.com/maps/dir/?api=1&destination=Han+Tong+Korean+BBQ+Estrada+da+Luz+110A+Lisboa',
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3111.487493322112!2d-9.17596042402386!3d38.75252147175534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd193300414a0c09%3A0x7057418ca817c4f8!2sHAN%20TONG%20-%20Korean%20BBQ!5e0!3m2!1sen!2spt!4v1793057885742!5m2!1sen!2spt',
} as const;

// A local file such as /menu/han-tong.pdf or an HTTPS URL. null enables the call fallback.
export const menuPdfUrl: string | null = null;
export const legalLinks = {
  complaints: 'https://www.livroreclamacoes.pt/Inicio/',
  intelis: 'https://intelis.pt',
} as const;
export const navigation = [
  { href: '#inicio', key: 'navHome' },
  { href: '#menu', key: 'navMenu' },
  { href: '#espaco', key: 'navSpace' },
  { href: '#contactos', key: 'navContact' },
] as const;
export const pressLinks = [
  { name: 'Coisas Boas em Alta', title: 'Han Tong Korean BBQ', url: 'https://coisasboasemalta.com/gastronomia-em-alta/2024/10/14/han-tong-korean-bbq/', type: 'article', image: photos['space-1'] },
  { name: 'NiT', title: 'Han Tong. Novo barbecue coreano das Laranjeiras tem combos para cozinhar na mesa', url: 'https://www.nit.pt/comida/restaurantes/han-tong-novo-barbecue-das-laranjeiras-tem-combos-para-cozinhar-na-mesa', type: 'article', image: photos['space-4'] },
  { name: 'Corner', title: 'HAN TONG — Korean BBQ', url: 'https://www.corner.inc/place/peP2yYHLtyMq', type: 'listing', image: { ...photos['space-9'], position: '50% 27%' } },
] as const;
