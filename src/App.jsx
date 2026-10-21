import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { CartProvider } from './context/CartContext';
import { NavigationProvider, useNavigation } from './utils/navigation';
import { categories, getProduct } from './data/products';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import Support from './pages/Support';
import NotFound from './pages/NotFound';

function RouteContent() {
  const { location } = useNavigation();
  const path = location.split('?')[0].replace(/\/+$/, '') || '/';
  if (path === '/') return <Home />;
  if (path === '/shop') return <Shop key="all" />;
  if (path.startsWith('/category/')) {
    const slug = path.slice('/category/'.length);
    const category = categories.find((c) => c.slug === slug)?.name;
    return category ? <Shop key={slug} category={category} /> : <NotFound />;
  }
  if (path.startsWith('/product/')) { const slug = path.slice('/product/'.length); return <ProductDetails key={slug} slug={slug} />; }
  if (path.startsWith('/support/')) return <Support topic={path.slice('/support/'.length)} />;
  if (path === '/cart') return <Cart />;
  if (path === '/checkout') return <Checkout />;
  if (path === '/about') return <About />;
  if (path === '/contact') return <Contact />;
  return <NotFound />;
}

const BRAND = 'Anchor Fashion';

function pageTitle(location) {
  const [rawPath, query = ''] = location.split('?');
  const path = rawPath.replace(/\/+$/, '') || '/';
  const params = new URLSearchParams(query);
  if (path === '/') return `${BRAND} — Premium Panjabi & menswear`;
  if (path === '/shop') {
    if (params.get('search')) return `Search “${params.get('search')}” — ${BRAND}`;
    return `${params.get('new') === 'true' ? 'New arrivals' : 'Shop all'} — ${BRAND}`;
  }
  if (path.startsWith('/category/')) {
    const slug = path.slice('/category/'.length);
    return `${slug.charAt(0).toUpperCase()}${slug.slice(1)} — ${BRAND}`;
  }
  if (path.startsWith('/product/')) {
    const product = getProduct(path.slice('/product/'.length));
    return `${product ? product.name : 'Piece not found'} — ${BRAND}`;
  }
  if (path.startsWith('/support/')) return `Help — ${BRAND}`;
  const names = { '/cart': 'Your bag', '/checkout': 'Checkout (demo)', '/about': 'Our story', '/contact': 'Contact' };
  return `${names[path] || 'Page not found'} — ${BRAND}`;
}

function Storefront() {
  const { location } = useNavigation();
  useEffect(() => { document.title = pageTitle(location); }, [location]);
  return (
    <div className="flex min-h-screen flex-col bg-brand-dark text-white">
      <Navbar />
      <div className="flex-1"><RouteContent /></div>
      <Footer />
    </div>
  );
}

export default function App() {
  return <NavigationProvider><CartProvider><Storefront /></CartProvider></NavigationProvider>;
}
