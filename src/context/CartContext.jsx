import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { products } from '../data/products';

const CartContext = createContext(null);
const STORAGE_KEY = 'anchor-fashion-cart-v1';

// Only ids + choices are saved. Product data (price, stock, name) is always re-read from
// products.js, so price changes reach existing carts and removed products drop out.
// Also reads the older format that saved the whole product object.
function readCart() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
    if (!Array.isArray(saved)) return [];
    return saved.map((item) => {
      const product = products.find((p) => p.id === (item?.productId ?? item?.product?.id));
      if (!product || product.stock < 1) return null;
      const quantity = Math.min(product.stock, Math.floor(Number(item.quantity)));
      if (!(quantity > 0)) return null;
      const size = item.size || '';
      const color = item.color || '';
      return { key: `${product.id}:${size}:${color}`, product, size, color, quantity };
    }).filter(Boolean);
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      const slim = items.map(({ key, product, size, color, quantity }) => ({ key, productId: product.id, size, color, quantity }));
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slim));
    } catch {
      // Keep the in-memory cart usable when browser storage is unavailable.
    }
  }, [items]);

  const value = useMemo(() => ({
    items,
    drawerOpen,
    openDrawer() { setDrawerOpen(true); },
    closeDrawer() { setDrawerOpen(false); },
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    subtotal: items.reduce((total, item) => total + item.product.price * item.quantity, 0),
    addItem(product, variants = {}, quantity = 1) {
      if (!product?.id || product.stock < 1 || !Number.isFinite(quantity) || quantity < 1) return;
      const key = `${product.id}:${variants.size || ''}:${variants.color || ''}`;
      setDrawerOpen(true); // show the bag after adding (remove this line to disable)
      setItems((current) => {
        const existing = current.find((item) => item.key === key);
        return existing
          ? current.map((item) => item.key === key ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) } : item)
          : [...current, { key, product, size: variants.size || '', color: variants.color || '', quantity: Math.min(product.stock, Math.floor(quantity)) }];
      });
    },
    updateQuantity(key, quantity) {
      setItems((current) => current
        .map((item) => item.key === key
          ? { ...item, quantity: Math.min(item.product.stock, Math.floor(quantity)) }
          : item)
        .filter((item) => item.quantity > 0));
    },
    removeItem(key) {
      setItems((current) => current.filter((item) => item.key !== key));
    },
    clearCart() {
      setItems([]);
    },
  }), [items, drawerOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error('useCart must be used inside CartProvider');
  return cart;
}
