import type { Language } from './translations';
export interface PhotoAsset {
  id: string;
  src: string;
  alt: Record<Language, string>;
  position?: string;
  source: 'local' | 'placeholder';
}
function photo(id: string, pt: string, en: string, position = 'center'): PhotoAsset {
  return { id, src: `/images/${id}.webp`, alt: { pt, en }, position, source: 'local' };
}
export const photos = {
  'menu-1': photo('menu-1', 'Seleção de carnes, camarão, cogumelos e legumes para barbecue coreano', 'A selection of meat, prawns, mushrooms and vegetables for Korean barbecue'),
  'menu-2': photo('menu-2', 'Panqueca coreana dourada servida com pauzinhos', 'Golden Korean pancake served with chopsticks'),
  'menu-3': photo('menu-3', 'Cortes de carne marmoreada junto à grelha de barbecue', 'Marbled beef cuts beside the barbecue grill'),
  'menu-4': photo('menu-4', 'Fatias de carne marinada com sementes de sésamo e cebolinho', 'Sliced marinated beef with sesame seeds and spring onions'),
  'menu-5': photo('menu-5', 'Sopa coreana com noodles levantados por pauzinhos', 'Korean soup with noodles lifted by chopsticks'),
  'menu-6': photo('menu-6', 'Tofu em molho picante com cebolinho', 'Tofu in a spicy sauce with spring onions'),
  'menu-7': photo('menu-7', 'Garrafas de soju com diferentes sabores', 'Bottles of soju in different flavours'),
  'menu-8': photo('menu-8', 'Tteokbokki em molho picante servido numa taça', 'Tteokbokki in a spicy sauce served in a bowl'),
  'menu-table': photo('Korean BBQ Table with Floral Teapot-1', 'Mesa de barbecue coreano com pratos, acompanhamentos e bule floral', 'Korean barbecue table with dishes, sides and a floral teapot'),
  'menu-10': photo('menu-10', 'Seleção de gelados e sobremesas servidos à mesa', 'A selection of ice creams and desserts served at the table'),
  'space-1': photo('space-1', 'Barbecue à mesa com carnes, camarão, acompanhamentos e bebidas no Han Tong', 'Tabletop barbecue with meat, prawns, sides and drinks at Han Tong', '50% 55%'),
  'space-2': photo('space-2', 'Balcão iluminado, plantas e bancos verdes do restaurante', 'Warmly lit restaurant bar with plants and green seating'),
  'space-3': photo('space-3', 'Uma pessoa a saborear um cocktail com soju', 'A guest enjoying a soju cocktail'),
  'space-4': photo('space-4', 'Sala do Han Tong com mesas de madeira e extratores de cobre', 'Han Tong dining room with wooden tables and copper extraction ducts'),
  'space-5': photo('space-5', 'Seleção de carnes e legumes preparada para grelhar à mesa', 'A selection of meat and vegetables ready for tabletop grilling'),
  'space-6': photo('space-6', 'Um brinde com duas garrafas de soju', 'Two bottles of soju raised in a toast'),
  'space-7': photo('space-7', 'Mesa com grelha, bancos verdes e decoração do restaurante', 'A table with a grill, green seating and restaurant decorations'),
  'space-8': photo('space-8', 'Recanto do restaurante com letreiro néon e extrator de cobre', 'Restaurant corner with a neon sign and copper extraction duct'),
  'space-9': photo('space-9', 'Entrada e fachada do Han Tong Korean BBQ em Lisboa', 'Entrance and facade of Han Tong Korean BBQ in Lisbon'),
  'space-10': photo('space-10', 'Lanternas e letreiro luminoso no teto do restaurante', 'Lanterns and a glowing sign above the restaurant'),
  reserve: photo('reserve-cta', 'Um momento à mesa, a saborear um dumpling com pauzinhos', 'A moment at the table, enjoying a dumpling with chopsticks', '50% 46%'),
} satisfies Record<string, PhotoAsset>;
export const assets = {
  logo: '/images/logo-white.webp',
  hero: { ...photos['space-1'], src: '/images/hero.webp' },
  heroFocalPoint: { desktop: '50% 55%', mobile: '47% 50%' },
  marqueeRows: [
    [photos['menu-1'], photos['menu-2'], photos['menu-3'], photos['menu-4'], photos['menu-5']],
    [photos['menu-6'], photos['menu-7'], photos['menu-8'], photos['menu-table'], photos['menu-10']],
  ],
  collage: [
    { ...photos['space-1'], position: '50% 55%' },
    { ...photos['space-2'], position: '50% 52%' },
    { ...photos['space-3'], position: '50% 46%' },
    { ...photos['space-4'], position: '50% 58%' },
    { ...photos['space-5'], position: '50% 48%' },
    { ...photos['space-6'], position: '50% 50%' },
    { ...photos['space-7'], position: '50% 62%' },
    { ...photos['space-8'], position: '50% 36%' },
    { ...photos['space-9'], position: '50% 24%' },
    { ...photos['space-10'], position: '50% 48%' },
  ],
  reservation: photos.reserve,
} as const;
