import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Link } from '../../utils/navigation';
import Logo from './Logo';

const links = [['New arrivals', '/shop?new=true'], ['Men', '/category/men'], ['Women', '/category/women'], ['Accessories', '/category/accessories'], ['About Anchor', '/about'], ['Contact', '/contact']];

export default function MobileMenu({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === 'Escape' && onClose();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; // stop the page scrolling behind the menu
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div id="mobile-menu" className="fixed inset-0 z-[70] overflow-y-auto bg-brand-black md:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-5"><Logo compact onClick={onClose} /><button type="button" autoFocus aria-label="Close menu" onClick={onClose} className="p-2 text-white"><X /></button></div>
      <nav aria-label="Mobile" className="flex flex-col px-6 py-6">{links.map(([label, href], index) => <Link key={href} to={href} onClick={onClose} className="flex items-center justify-between border-b border-white/10 py-5 font-display text-2xl text-white"><span>{label}</span><span className="text-xs text-brand-gray">0{index + 1}</span></Link>)}</nav>
    </div>
  );
}
