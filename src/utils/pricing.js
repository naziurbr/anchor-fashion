export const FREE_DELIVERY_OVER = 999;
export const DELIVERY_FEE = 100;
export const PROMOS = { ANCHOR20: 0.2 };

export function pricing(subtotal, promo) {
  const discount = Math.round(subtotal * (PROMOS[promo] || 0));
  const delivery = !subtotal || subtotal > FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE;
  return { discount, delivery, total: subtotal - discount + delivery };
}
