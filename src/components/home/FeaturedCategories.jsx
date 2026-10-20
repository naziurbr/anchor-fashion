import { ArrowUpRight } from 'lucide-react';
import { categories } from '../../data/products';
import { Link } from '../../utils/navigation';
import SectionTitle from '../common/SectionTitle';

export default function FeaturedCategories() {
  return (
    <section className="page-shell py-20 md:py-28" id="the-edit">
      <div className="flex items-end justify-between gap-5">
        <SectionTitle eyebrow="Find your point of view" title="The collections" description="Pieces with purpose. Made for the way you live now." />
        <Link to="/shop" className="mb-8 hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[.18em] text-white hover:text-brand-gold sm:flex">Shop all <ArrowUpRight size={15} /></Link>
      </div>
      <div className="category-grid grid gap-3 md:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.slug} to={`/category/${category.slug}`} className="category-tile group relative block overflow-hidden">
            <img src={category.image} alt={`${category.name} collection editorial`} className="h-full min-h-[340px] w-full object-cover transition duration-700 group-hover:scale-[1.04] md:min-h-[430px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5 md:p-6">
              <div><p className="text-[11px] uppercase tracking-[.22em] text-white/65">{category.note}</p><h3 className="mt-2 font-display text-3xl text-white">{category.name}</h3></div>
              <span className="flex h-10 w-10 items-center justify-center border border-white/40 text-white transition group-hover:border-brand-gold group-hover:bg-brand-gold group-hover:text-brand-black"><ArrowUpRight size={18} /></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
