export default function SectionTitle({ eyebrow, title, description, align = 'left', headingLevel = 2 }) {
  const Heading = headingLevel === 1 ? 'h1' : 'h2';

  return (
    <div className={`mb-8 ${align === 'center' ? 'text-center' : ''}`}>
      {eyebrow && <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.28em] text-brand-gold">{eyebrow}</p>}
      <Heading className="font-display text-3xl font-semibold tracking-[-.04em] text-white md:text-4xl">{title}</Heading>
      {description && <p className="mt-3 max-w-xl text-sm leading-6 text-brand-gray">{description}</p>}
    </div>
  );
}
