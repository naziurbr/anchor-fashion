import { ChevronRight } from 'lucide-react';
import Hero from '../components/home/Hero';
import TrustBar from '../components/home/TrustBar';
import LaunchBanner from '../components/home/LaunchBanner';
import FeaturedCategories from '../components/home/FeaturedCategories';
import ProductGrid from '../components/product/ProductGrid';
import SectionTitle from '../components/common/SectionTitle';
import { products } from '../data/products';
import { Link } from '../utils/navigation';

function Block({ eyebrow, title, description, list, to }) {
  return (
    <section className="page-shell pb-20 md:pb-28">
      <div className="flex items-end justify-between gap-4">
        <SectionTitle eyebrow={eyebrow} title={title} description={description} />
        <Link to={to} className="mb-8 hidden items-center gap-1 text-[11px] font-semibold uppercase tracking-[.15em] hover:text-brand-gold sm:flex">View all <ChevronRight size={15} /></Link>
      </div>
      <ProductGrid products={list} />
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <FeaturedCategories />
      <Block eyebrow="Most wanted" title="Trending now" description="The pieces everyone is reaching for this season." list={products.filter((p) => p.featured).slice(0, 4)} to="/shop" />
      <div className="page-shell pb-20 md:pb-28"><LaunchBanner /></div>
      <Block eyebrow="Just in" title="New arrivals" description="Fresh from the loom and the cutting table." list={products.filter((p) => p.isNew).slice(0, 4)} to="/shop?new=true" />
    </>
  );
}
