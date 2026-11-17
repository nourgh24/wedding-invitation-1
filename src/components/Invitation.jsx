import { Heart, Clock, MapPin } from 'lucide-react';
import Reveal from './Reveal.jsx';
import { Divider } from './Ornaments.jsx';

/** القسم 6: دعوة خاصة — (أ) القصيدة  (ب) الآية + العائلتان + المكان */
export default function Invitation({ t }) {
  const { invite, family } = t;

  return (
    <>
      {/* ---------- (أ) النص الأول ---------- */}
      <section id="invite" data-section="invite" className="section">
        <Reveal variant="zoom" className="big-title gold-text-soft" as="h2">
          {invite.title}
        </Reveal>

        <Reveal delay={0.25} className="card poem-card">
          <h3 className="poem-heading gold-text">{invite.heading}</h3>
          <Divider />
          <div className="poem-lines">
            {invite.lines.map((line, i) => (
              <Reveal key={i} delay={0.5 + i * 0.22} variant="up" as="p" className="poem-line">
                {line}
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---------- (ب) الآية + العائلتان ---------- */}
      <section id="family" data-section="family" className="section">
        <Reveal variant="zoom" className="big-title gold-text-soft" as="h2">
          {invite.title}
        </Reveal>

        <Reveal delay={0.25} className="card family-card">
          <p className="verse">
            <span className="verse-mark">﴿</span> {family.verse} <span className="verse-mark">﴾</span>
          </p>

          <Divider />

          <div className="families">
            <span>{family.families[0]}</span>
            <i className="families-sep" />
            <span>{family.families[1]}</span>
          </div>

          <p className="family-invite">{family.inviteLine}</p>

          <div className="couple-line">
            <span className="couple-name gold-text">{family.groom}</span>
            <Heart className="couple-heart" size={26} fill="currentColor" strokeWidth={0} />
            <span className="couple-name gold-text">{family.bride}</span>
          </div>

          <p className="family-closing">{family.closing}</p>

          <div className="venue-row">
            <div className="venue-pill">
              <MapPin size={20} strokeWidth={1.6} />
              <div>
                <small>{family.venueLabel}</small>
                <strong>{family.venue}</strong>
              </div>
            </div>
            <div className="venue-pill">
              <Clock size={20} strokeWidth={1.6} />
              <div>
                <small>{family.timeLabel}</small>
                <strong>{family.time}</strong>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
