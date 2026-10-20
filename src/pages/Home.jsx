import { ArrowRight, ChevronRight } from 'lucide-react';
import Hero from '../components/home/Hero';
import LaunchBanner from '../components/home/LaunchBanner';
import FeaturedCategories from '../components/home/FeaturedCategories';
import ProductGrid from '../components/product/ProductGrid';
import SectionTitle from '../components/common/SectionTitle';
import Button from '../components/common/Button';
import { products } from '../data/products';
import { Link } from '../utils/navigation';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="page-shell pt-8"><LaunchBanner /></div>
      <FeaturedCategories />
      <section className="page-shell pb-20 md:pb-28">
        <div className="flex items-end justify-between gap-4"><SectionTitle eyebrow="A few good things" title="The first edit" description="Everyday pieces with a little more thought in every detail." /><Link to="/shop" className="mb-8 hidden items-center gap-1 text-[11px] font-semibold uppercase tracking-[.15em] hover:text-brand-gold sm:flex">View all <ChevronRight size={15} /></Link></div>
        <ProductGrid products={products.filter((product) => product.featured).slice(0, 4)} />
        <div className="mt-9 text-center"><Button to="/shop">Explore everything <ArrowRight size={15} /></Button></div>
      </section>
      <section className="home-story relative overflow-hidden border-y border-white/10 bg-brand-card px-6 py-16 md:px-12 md:py-20">
        <div className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none font-display text-[22vw] font-black leading-none tracking-[-.06em] text-outline opacity-40" aria-hidden="true">RANGPUR</div>
        <div className="relative mx-auto grid max-w-[1180px] gap-8 md:grid-cols-[1fr_1fr] md:items-center">
          <div><p className="text-[11px] uppercase tracking-[.26em] text-brand-gold">Soon, in Rangpur</p><h2 className="mt-4 max-w-lg font-display text-4xl leading-tight text-white md:text-5xl">A familiar feeling.<br /><span className="text-brand-gold">A new address.</span></h2></div>
          <div><p className="max-w-lg text-sm leading-7 text-brand-gray">We’re bringing the Anchor point of view to Rangpur—pieces made to last, thoughtful service, and a place to find your own everyday uniform.</p><Link to="/about" className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.16em] text-white hover:text-brand-gold">Meet Anchor <ArrowRight size={14} /></Link></div>
        </div>
      </section>
    </>
  );
}
