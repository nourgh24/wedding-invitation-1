import { useCallback, useEffect, useState } from 'react';
import { Images, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Reveal from './Reveal.jsx';
import { SectionHeader } from './Ornaments.jsx';
import { GALLERY } from '../config.js';

/** القسم 9: لحظاتنا — الصور تُعدَّل من src/config.js */
export default function Gallery({ t }) {
  const [open, setOpen] = useState(null);
  const total = GALLERY.length;

  const next = useCallback(() => setOpen((i) => (i === null ? i : (i + 1) % total)), [total]);
  const prev = useCallback(() => setOpen((i) => (i === null ? i : (i - 1 + total) % total)), [total]);

  useEffect(() => {
    if (open === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, next, prev]);

  return (
    <section id="gallery" data-section="gallery" className="section">
      <SectionHeader
        icon={<Images size={30} strokeWidth={1.4} />}
        kicker={t.gallery.kicker}
        title={t.gallery.title}
      />

      <div className="gallery-grid">
        {GALLERY.map((p, i) => (
          <Reveal key={i} delay={0.1 + (i % 2) * 0.18} variant="zoom" className="photo-wrap">
            <button className="photo" onClick={() => setOpen(i)} aria-label={p.alt}>
              <img src={p.src} alt={p.alt} loading="lazy" />
              <span className="photo-shine" />
            </button>
          </Reveal>
        ))}
      </div>

      {open !== null && (
        <div className="lightbox" onClick={() => setOpen(null)}>
          <button className="lb-btn lb-close" aria-label={t.gallery.close} onClick={() => setOpen(null)}>
            <X size={22} />
          </button>
          <button
            className="lb-btn lb-prev"
            aria-label="prev"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            <ChevronLeft size={26} />
          </button>
          <img
            key={open}
            className="lb-img"
            src={GALLERY[open].src}
            alt={GALLERY[open].alt}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="lb-btn lb-next"
            aria-label="next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            <ChevronRight size={26} />
          </button>
        </div>
      )}
    </section>
  );
}
