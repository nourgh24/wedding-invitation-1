import Reveal from './Reveal.jsx';

/** فاصل زخرفي: خط ✦ لآلئ ✦ خط */
export function Divider({ className = '' }) {
  return (
    <div className={`divider ${className}`} aria-hidden="true">
      <i className="divider-line" />
      <b className="divider-star">✦</b>
      <span className="divider-pearls" />
      <b className="divider-star">✦</b>
      <i className="divider-line" />
    </div>
  );
}

/** ترويسة القسم: أيقونة + كلمة إنجليزية صغيرة + عنوان */
export function SectionHeader({ icon, kicker, title }) {
  return (
    <header className="sec-header">
      <Reveal variant="zoom" className="sec-icon">
        {icon}
      </Reveal>
      {kicker && (
        <Reveal delay={0.15} className="sec-kicker">
          {kicker}
        </Reveal>
      )}
      <Reveal delay={0.3} className="sec-title gold-text-soft" as="h2">
        {title}
      </Reveal>
      <Reveal delay={0.45}>
        <Divider />
      </Reveal>
    </header>
  );
}
