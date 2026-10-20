import { useState } from 'react';
import { CheckCircle2, MapPin, MessageCircle } from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  function submit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (!form.get('name')?.toString().trim() || !form.get('email')?.toString().trim() || !form.get('message')?.toString().trim()) {
      setError('Please complete your name, email and message.');
      return;
    }
    setError('');
    setSent(true);
    event.currentTarget.reset();
  }
  return (
    <main className="page-shell min-h-[65vh] py-12 md:py-16">
      <div className="grid gap-12 md:grid-cols-[.8fr_1.2fr] md:gap-20">
        <div><SectionTitle headingLevel={1} eyebrow="We’re here" title="Let’s talk." description="Have a question about the collection or the upcoming store? Leave us a note. We’d love to hear from you." /><div className="mt-8 space-y-5 border-t border-white/10 pt-6"><p className="flex gap-3 text-xs leading-5 text-brand-gray"><MapPin size={17} className="shrink-0 text-brand-gold" /><span><strong className="text-white">Rangpur, Bangladesh</strong><br />Store opening soon</span></p><p className="flex gap-3 text-xs leading-5 text-brand-gray"><MessageCircle size={17} className="shrink-0 text-brand-gold" /><span>Customer care<br /><span className="text-white">hello@anchorfashion.bd</span></span></p></div></div>
        <section className="border border-white/10 p-5 md:p-8"><h2 className="font-display text-2xl text-white">Send a message</h2>{sent ? <div role="status" className="mt-8 border border-brand-gold/30 bg-brand-gold/10 p-5 text-center"><CheckCircle2 className="mx-auto text-brand-gold" /><p className="mt-3 text-sm text-white">Thanks for reaching out.</p><p className="mt-1 text-xs text-brand-gray">This demo form does not send messages to a real inbox.</p><button type="button" onClick={() => setSent(false)} className="mt-4 text-[11px] uppercase tracking-wider text-brand-gold underline">Send another message</button></div>
          : <form onSubmit={submit} className="mt-6 space-y-5"><label className="block text-[11px] font-semibold uppercase tracking-wider text-brand-gray">Your name<input name="name" required className="form-input mt-2" /></label><label className="block text-[11px] font-semibold uppercase tracking-wider text-brand-gray">Email address<input name="email" type="email" required className="form-input mt-2" /></label><label className="block text-[11px] font-semibold uppercase tracking-wider text-brand-gray">Message<textarea name="message" rows="5" required className="form-input mt-2 resize-y" /></label>{error && <p role="alert" className="text-xs text-red-300">{error}</p>}<button type="submit" className="bg-brand-gold px-5 py-3 text-[11px] font-bold uppercase tracking-[.16em] text-brand-black hover:bg-[#ffdb68]">Send message</button></form>}</section>
      </div>
    </main>
  );
}
