import { Link } from '../../utils/navigation';

export default function Button({ children, to, variant = 'gold', className = '', ...props }) {
  const styles = variant === 'outline'
    ? 'border border-white/25 text-white hover:border-brand-gold hover:text-brand-gold'
    : 'bg-brand-gold text-brand-black hover:bg-[#ffdb68]';
  const classes = `inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-[.14em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold disabled:cursor-not-allowed disabled:opacity-50 ${styles} ${className}`;
  if (to) return <Link to={to} className={classes}>{children}</Link>;
  return <button className={classes} {...props}>{children}</button>;
}
