import { ListChecks, CameraOff, Clock, PhoneOff } from 'lucide-react';
import Reveal from './Reveal.jsx';
import { SectionHeader } from './Ornaments.jsx';

const ICONS = [CameraOff, Clock, PhoneOff];

/** القسم 8: تفاصيل الحفل — أول ثلاث نقاط */
export default function Details({ t }) {
  const d = t.details;
  return (
    <section id="details" data-section="details" className="section">
      <SectionHeader icon={<ListChecks size={30} strokeWidth={1.4} />} kicker={d.kicker} title={d.title} />

      <div className="details-list">
        {d.items.map((text, i) => {
          const Icon = ICONS[i];
          return (
            <Reveal key={i} delay={0.2 + i * 0.22} variant={i % 2 ? 'right' : 'left'} className="card detail-card">
              <span className="detail-icon">
                <Icon size={26} strokeWidth={1.5} />
              </span>
              <span className="detail-text">{text}</span>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
