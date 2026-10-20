import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Check, Mail, MapPin } from 'lucide-react';
import Button from '../common/Button';
import Countdown from './Countdown';

const reveal = (delay) => ({ '--d': `${delay}ms` });

export default function Hero() {
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [notifyComplete, setNotifyComplete] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const imageRef = useRef(null);
  const wordRef = useRef(null);
  const emailRef = useRef(null);

  // Gentle parallax on the campaign image and ghost word. Skipped for reduced-motion users.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let frame = 0;
    const run = () => {
      frame = 0;
      const y = Math.min(window.scrollY, 900);
      if (imageRef.current) imageRef.current.style.transform = `translate3d(0, ${y * 0.18}px, 0) scale(1.12)`;
      if (wordRef.current) wordRef.current.style.transform = `translate3d(${-y * 0.12}px, 0, 0)`;
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(run); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); window.cancelAnimationFrame(frame); };
  }, []);

  // Move focus into the email field when the panel opens.
  useEffect(() => { if (notifyOpen && !notifyComplete) emailRef.current?.focus(); }, [notifyOpen, notifyComplete]);

  function closeNotify() {
    setNotifyOpen(false);
    document.getElementById('hero-notify-trigger')?.focus();
  }

  function submitNotification(event) {
    event.preventDefault();
    setNotifyComplete(true); // demo only: nothing is stored or sent
  }

  return (
    <section className="hero-campaign relative isolate overflow-hidden">
      {!imageFailed && <img ref={imageRef} src="/images/hero-editorial.png" alt="" aria-hidden="true" onError={() => setImageFailed(true)} style={{ transform: 'scale(1.12)' }} className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-65 will-change-transform" />}
      <div className="hero-shade absolute inset-0 -z-10" />
      <div ref={wordRef} className="pointer-events-none absolute inset-0 -z-0 will-change-transform" aria-hidden="true">
        <div className="hero-word absolute -left-4 top-1/2 -translate-y-1/2 select-none font-display text-[21vw] font-black leading-none tracking-[-.08em] text-outline opacity-55">RANGPUR</div>
      </div>
      <div className="relative mx-auto flex min-h-[630px] max-w-[1440px] flex-col justify-between px-6 pb-9 pt-12 md:min-h-[690px] md:px-12 md:pb-12 md:pt-16">
        <div className="reveal flex items-center justify-between" style={reveal(0)}>
          <p className="text-[11px] font-semibold uppercase tracking-[.3em] text-white/70">A new chapter, closer to home</p>
          {/* Approximate position of Rangpur city: please confirm against the store location. */}
          <p className="hidden text-[11px] uppercase tracking-[.25em] text-white/55 sm:block">25°45′ N · 89°17′ E</p>
        </div>
        <div className="relative z-10 grid items-end gap-10 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <p className="reveal mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.32em] text-brand-gold" style={reveal(120)}><span className="h-px w-8 bg-brand-gold" aria-hidden="true" />Rangpur · Opening soon</p>
            <h1 className="reveal font-display text-[clamp(5rem,14vw,12rem)] font-black leading-[.77] tracking-[-.055em] text-white" style={reveal(220)}>
              ANCHOR<span className="block pl-[.17em] text-[.38em] font-medium leading-[1.3] tracking-[.3em] text-brand-gold">FASHION</span>
            </h1>
            <div className="reveal mt-8 flex flex-wrap gap-3" style={reveal(380)}>
              <Button id="hero-notify-trigger" type="button" onClick={() => { setNotifyOpen(!notifyOpen); setNotifyComplete(false); }} aria-expanded={notifyOpen} aria-controls="hero-notify-panel"><Mail size={15} /> Notify Me</Button>
              <Button to="/contact" variant="outline"><MapPin size={15} /> Store locator</Button>
              <Button to="/shop" variant="outline">Explore the collection <ArrowRight size={15} /></Button>
            </div>
            <div id="hero-notify-panel" hidden={!notifyOpen} onKeyDown={(event) => event.key === 'Escape' && closeNotify()} className="fade-in mt-4 max-w-md rounded-2xl border border-white/15 bg-brand-black/80 p-4 backdrop-blur-md">
              {notifyComplete ? (
                <p role="status" className="flex items-start gap-3 text-xs leading-5 text-white">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gold text-brand-black"><Check size={13} strokeWidth={3} /></span>
                  Thanks for your interest. This demo does not save your email or send notifications.
                </p>
              ) : (
                <form onSubmit={submitNotification} className="flex flex-col gap-3 sm:flex-row">
                  <label htmlFor="hero-notify-email" className="sr-only">Email address for launch updates</label>
                  <input ref={emailRef} id="hero-notify-email" type="email" autoComplete="email" required placeholder="Your email address" className="form-input min-w-0 flex-1 rounded-full" />
                  <button type="submit" className="rounded-full border border-brand-gold px-5 py-3 text-[11px] font-bold uppercase tracking-[.16em] text-brand-gold transition-colors hover:bg-brand-gold hover:text-brand-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold">Join the list</button>
                  <p className="sr-only">Demo only. No email is stored or sent.</p>
                </form>
              )}
              {!notifyComplete && <p className="mt-2 text-[11px] text-white/60">Demo only · No email will be stored or sent.</p>}
            </div>
          </div>
          <div className="reveal max-w-[400px] border-l border-white/25 pl-5 lg:justify-self-end" style={reveal(520)}>
            <p className="font-display text-2xl leading-snug text-white md:text-3xl">Good things are coming to <span className="text-brand-gold">Rangpur.</span></p>
            <p className="mt-3 text-xs leading-6 text-white/65">Discover a new expression of everyday style. Meet us at our first Rangpur store this season.</p>
            <div className="mt-7 border-t border-white/15 pt-5"><Countdown /></div>
          </div>
        </div>
        <a href="#the-edit" className="reveal flex items-center gap-2 self-start text-[11px] font-semibold uppercase tracking-[.24em] text-white/60 hover:text-brand-gold" style={reveal(640)}><ArrowDown size={14} className="bob" /> Scroll to discover</a>
      </div>
      <span className="hero-index absolute bottom-12 right-6 hidden text-[11px] tracking-[.25em] text-white/45 md:block">THE RANGPUR EDITION · 2026</span>
    </section>
  );
}
