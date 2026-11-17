import { useEffect, useState } from 'react';
import { CalendarHeart, CalendarPlus } from 'lucide-react';
import Reveal from './Reveal.jsx';
import { SectionHeader } from './Ornaments.jsx';
import { EVENT } from '../config.js';
import { fmt, downloadICS } from '../utils.js';

function diff(target) {
  const ms = Math.max(0, target - Date.now());
  return {
    done: ms === 0,
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

/** القسم 7: التاريخ + العد التنازلي */
export default function DateSection({ t, lang }) {
  const target = new Date(EVENT.iso).getTime();
  const [left, setLeft] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setLeft(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const d = t.date;
  const units = [
    ['days', left.days, 3],
    ['hours', left.hours, 2],
    ['minutes', left.minutes, 2],
    ['seconds', left.seconds, 2],
  ];

  return (
    <section id="date" data-section="date" className="section">
      <SectionHeader icon={<CalendarHeart size={30} strokeWidth={1.4} />} kicker={d.kicker} title={d.title} />

      <Reveal delay={0.2} className="card date-card">
        <div className="date-weekday">{d.weekday}</div>
        <div className="date-day gold-text">{fmt(EVENT.day, lang)}</div>
        <div className="date-month">
          {d.month} {fmt(EVENT.year, lang)}
        </div>
        <div className="date-numeric">{d.numeric}</div>
        <div className="date-time">{d.time}</div>

        <button
          className="btn-ghost"
          onClick={() =>
            downloadICS({ title: d.calendarTitle, location: d.calendarLocation, start: EVENT.iso })
          }
        >
          <CalendarPlus size={18} strokeWidth={1.6} />
          <span>{d.save}</span>
        </button>
      </Reveal>

      <Reveal delay={0.35} className="card countdown-card">
        <h3 className="countdown-title">{d.countdown}</h3>
        {left.done ? (
          <p className="countdown-done gold-text">{d.done}</p>
        ) : (
          <div className="countdown">
            {units.map(([key, value, pad]) => (
              <div className="count-box" key={key}>
                <span className="count-num" key={`${key}-${value}`}>
                  {fmt(value, lang, key === 'days' ? 2 : pad)}
                </span>
                <span className="count-label">{d.units[key]}</span>
              </div>
            ))}
          </div>
        )}
      </Reveal>
    </section>
  );
}
