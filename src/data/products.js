const found = import.meta.glob('../assets/products/**/*.{jpg,jpeg,png,webp,avif}', { eager: true, query: '?url', import: 'default' });
const photos = {};
Object.keys(found).sort().forEach((path) => {
  const id = path.split('/').pop().match(/^(af-\d{3})/i)?.[1].toLowerCase();
  if (id) (photos[id] ||= []).push(found[path]);
});
const placeholder = `data:image/svg+xml,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'><rect width='400' height='500' fill='#111'/><text x='200' y='250' fill='#F2C94C' font-size='26' font-weight='800' text-anchor='middle' font-family='Georgia,serif' letter-spacing='6'>ANCHOR</text><text x='200' y='285' fill='#777' font-size='11' text-anchor='middle' font-family='sans-serif' letter-spacing='3'>PHOTO COMING SOON</text></svg>")}`;

const S = { panjabi: ['S (38)', 'M (40)', 'L (42)', 'XL (44)', 'XXL (46)'], top: ['S', 'M', 'L', 'XL', 'XXL'], waist: ['30', '32', '34', '36', '38'], shoe: ['40', '41', '42', '43', '44'], belt: ['32', '34', '36', '38', '40'], none: [] };
const C = { Panjabi: ['Ivory', 'Midnight'], Shirt: ['Sky', 'White'], Polo: ['Navy', 'Ecru'], Bottom: ['Indigo', 'Charcoal'], Outerwear: ['Olive', 'Ink'], Accessories: ['Black', 'Tan'] };
// name, category, price, size set, description, flags (n = new, f = featured)
const rows = [
  ['Limited Edition Hand-Loomed Mulberry Silk Panjabi', 'Panjabi', 6500, 'panjabi', 'Hand-loomed mulberry silk with a soft sheen, cut for festive evenings.', 'nf'],
  ['Anchor Signature Gilded Crown Royal Panjabi', 'Panjabi', 4350, 'panjabi', 'Our signature festive Panjabi with gilded detailing and a regal drape.', 'f'],
  ['Embroidered Zari Heritage Silk Panjabi', 'Panjabi', 4750, 'panjabi', 'Silk Panjabi with zari embroidery inspired by heritage patterns.', 'n'],
  ['Royal Zari Embroidered Silk Kurta Set', 'Panjabi', 5950, 'panjabi', 'A complete silk kurta set with matching bottoms and zari work.', 'f'],
  ['Rangpur Oxford Shirt', 'Shirt', 2890, 'top', 'A crisp everyday Oxford with a relaxed shoulder and considered tailoring.', 'nf'],
  ['Weekday Linen Shirt', 'Shirt', 2790, 'top', 'Breathable linen-blend shirt with a softly tailored fit.', 'n'],
  ['All-Day Comfort Stretch Pique Polo', 'Polo', 1250, 'top', 'Stretch piqué knit that stays sharp from desk to dinner.', 'f'],
  ['Supima Silk-Touch Luxe Crewneck T-Shirt', 'Polo', 1150, 'top', 'Supima cotton with a silky hand and a clean crewneck.', 'n'],
  ['Selvedge Raw Indigo Slim Tapered Jeans', 'Bottom', 2750, 'waist', 'Raw indigo selvedge denim with a slim, tapered leg.', 'f'],
  ['Studio Wide-Leg Trouser', 'Bottom', 3290, 'waist', 'A straight drape and easy movement with a refined finish.', ''],
  ['Nocturne Velvet Embroidered Prince Coat', 'Outerwear', 6990, 'panjabi', 'A velvet prince coat with embroidery, made to layer over Panjabi.', 'f'],
  ['Autumn Dusk Modular Field Overshirt', 'Outerwear', 2490, 'top', 'A light utility overshirt with a clean, versatile profile.', 'nf'],
  ['Italian Full-Grain Vegetable-Tanned Leather Dress Belt', 'Accessories', 1550, 'belt', 'Full-grain leather belt with a brushed metal buckle.', ''],
  ['Pure Silk Jacquard Woven Necktie & Pocket Square Set', 'Accessories', 1450, 'none', 'Silk jacquard necktie with a matching pocket square.', ''],
  ['Mercerized Combed Cotton Dress Socks (Pack of 3)', 'Accessories', 590, 'none', 'Three pairs of mercerized combed cotton dress socks.', ''],
  ['Heritage Washed Cotton Dad Cap', 'Accessories', 650, 'none', 'Washed cotton cap with a soft, worn-in feel.', 'n'],
  ['Minimalist Low-Top Nappa Leather Sneakers', 'Accessories', 3850, 'shoe', 'Low-top sneakers in soft nappa leather.', 'f'],
];

export const products = rows.map(([name, category, price, sizes, description, flags], i) => ({
  id: `af-${String(i + 1).padStart(3, '0')}`,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  name, category, price, description,
  images: photos[`af-${String(i + 1).padStart(3, '0')}`] || [placeholder],
  sizes: S[sizes], colors: C[category], stock: 12 + ((i * 5) % 20),
  isNew: flags.includes('n'), featured: flags.includes('f'),
}));

const categoryList = [
  { name: 'Panjabi', slug: 'panjabi', note: 'Festive, wedding and everyday' },
  { name: 'Shirt', slug: 'shirt', note: 'Sharp tailoring and comfort' },
  { name: 'Polo', slug: 'polo', note: 'Polos and tees' },
  { name: 'Bottom', slug: 'bottom', note: 'Denim and trousers' },
  { name: 'Outerwear', slug: 'outerwear', note: 'Refined layering pieces' },
  { name: 'Accessories', slug: 'accessories', note: 'The finishing details' },
];

export const categories = categoryList.map((c) => ({ ...c, image: products.find((p) => p.category === c.name && p.images[0] !== placeholder)?.images[0] || placeholder }));

export function getProduct(slug) {
  return products.find((product) => product.slug === slug);
}
