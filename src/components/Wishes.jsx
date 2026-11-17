import { useEffect, useState } from 'react';
import { MessageCircleHeart, Send, Trash2 } from 'lucide-react';
import Reveal from './Reveal.jsx';
import { SectionHeader } from './Ornaments.jsx';
import { WISHES_STORAGE_KEY } from '../config.js';
import { fmt } from '../utils.js';

function load() {
  try {
    return JSON.parse(localStorage.getItem(WISHES_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

/** القسم 10: التهاني — تُحفظ محلياً في المتصفح (localStorage) وتُعرض مباشرة */
export default function Wishes({ t, lang }) {
  const w = t.wishes;
  const [wishes, setWishes] = useState(load);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => {
    localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(wishes));
  }, [wishes]);

  useEffect(() => {
    if (!toast) return undefined;
    const id = setTimeout(() => setToast(''), 3200);
    return () => clearTimeout(id);
  }, [toast]);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setToast(w.needBoth);
      return;
    }
    const wish = { id: Date.now(), name: name.trim(), message: message.trim(), at: Date.now() };
    setWishes((list) => [wish, ...list]);
    setName('');
    setMessage('');
    setToast(w.sent);
  };

  const remove = (id) => setWishes((list) => list.filter((x) => x.id !== id));

  const when = (ts) =>
    new Date(ts).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-GB', { day: 'numeric', month: 'short' });

  return (
    <section id="wishes" data-section="wishes" className="section">
      <SectionHeader
        icon={<MessageCircleHeart size={30} strokeWidth={1.4} />}
        kicker={w.kicker}
        title={w.title}
      />

      <Reveal delay={0.2} className="card wish-form-card">
        <form className="wish-form" onSubmit={submit}>
          <input
            className="field"
            type="text"
            maxLength={40}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={w.namePlaceholder}
          />
          <div className="wish-row">
            <textarea
              className="field"
              rows={3}
              maxLength={300}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={w.messagePlaceholder}
            />
          </div>
          <button type="submit" className="btn-gold">
            <Send size={18} strokeWidth={1.8} className="send-icon" />
            <span>{w.send}</span>
          </button>
        </form>
      </Reveal>

      <div className="wish-list">
        {wishes.length === 0 && (
          <Reveal delay={0.3} className="wish-empty">
            {w.empty}
          </Reveal>
        )}
        {wishes.length > 0 && (
          <p className="wish-count">
            {fmt(wishes.length, lang)} {w.count}
          </p>
        )}
        {wishes.map((x) => (
          <article className="card wish-item" key={x.id}>
            <header>
              <strong className="gold-text-soft">{x.name}</strong>
              <time>{when(x.at)}</time>
              <button className="wish-del" onClick={() => remove(x.id)} aria-label={w.remove}>
                <Trash2 size={15} strokeWidth={1.6} />
              </button>
            </header>
            <p>{x.message}</p>
          </article>
        ))}
      </div>

      {toast && <div className="toast">{toast}</div>}
    </section>
  );
}
