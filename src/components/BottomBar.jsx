import { CalendarHeart, ListChecks, Images, MessageCircleHeart, Play } from 'lucide-react';

/**
 * الشريط السفلي:
 * التاريخ — التفاصيل — [الموسيقى] — لحظاتنا — التهاني
 */
export default function BottomBar({ t, active, playing, onGo, onToggleMusic }) {
  const item = (id, Icon, label) => (
    <button className={`bar-item ${active === id ? 'active' : ''}`} onClick={() => onGo(id)}>
      <Icon size={22} strokeWidth={1.5} />
      <span>{label}</span>
    </button>
  );

  return (
    <nav className="bar">
      {item('date', CalendarHeart, t.bar.date)}
      {item('details', ListChecks, t.bar.details)}

      <div className="bar-music-wrap">
        <button
          data-music-toggle
          className={`bar-music ${playing ? 'is-playing' : ''}`}
          onClick={onToggleMusic}
          aria-label={t.bar.music}
          aria-pressed={playing}
        >
          {playing ? (
            <span className="eq" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
          ) : (
            <Play size={26} fill="currentColor" strokeWidth={0} className="play-icon" />
          )}
        </button>
        <span className="bar-label">{t.bar.music}</span>
      </div>

      {item('gallery', Images, t.bar.gallery)}
      {item('wishes', MessageCircleHeart, t.bar.wishes)}
    </nav>
  );
}
