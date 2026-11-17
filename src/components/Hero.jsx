import { ChevronDown } from 'lucide-react';
import Reveal from './Reveal.jsx';

/** القسم 5: لحظات الفرح اختارت من عمري موعداً + الأسماء */
export default function Hero({ t }) {
  return (
    <section id="hero" data-section="hero" className="section hero">
      <Reveal variant="zoom" className="hero-kicker">
        {t.hero.kicker}
      </Reveal>

      <div className="hero-names">
        <Reveal variant="left" delay={0.25} className="hero-name gold-text">
          Nour
        </Reveal>
        <Reveal variant="zoom" delay={0.6} className="hero-amp">
          &amp;
        </Reveal>
        <Reveal variant="right" delay={0.8} className="hero-name gold-text">
          Ismaiel
        </Reveal>
      </div>

      <Reveal delay={1.1} className="hero-quote">
        {t.hero.quote}
      </Reveal>

      <Reveal delay={1.4} className="hero-date">
        <span className="hero-date-line" />
        <span>{t.hero.date}</span>
        <span className="hero-date-line" />
      </Reveal>

      <div className="scroll-hint" aria-hidden="true">
        <ChevronDown size={26} strokeWidth={1.4} />
      </div>
    </section>
  );
}
