import { useMemo } from 'react';

/**
 * الخلفية السينمائية الثابتة:
 *  - صور تتبدّل بتلاشي ناعم عند التنقل بين الأقسام
 *  - حركة كاميرا بطيئة (Ken Burns)
 *  - إضاءة سينمائية، وهج، لمعان، لآلئ طائرة
 */
export default function Background({ images, activeKey }) {
  const keys = Object.keys(images);

  const pearls = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 5,
        dur: 12 + Math.random() * 18,
        delay: -Math.random() * 26,
        sway: (Math.random() - 0.5) * 120,
        op: 0.35 + Math.random() * 0.55,
      })),
    []
  );

  return (
    <>
      <div className="bg" aria-hidden="true">
        {keys.map((k) => (
          <div
            key={k}
            className={`bg-layer ${k === activeKey ? 'is-active' : ''}`}
            style={{ backgroundImage: `url(${images[k]})` }}
          />
        ))}
        <div className="bg-tint" />
        <div className="bg-light bg-light-a" />
        <div className="bg-light bg-light-b" />
        <div className="bg-flare" />
        <div className="bg-vignette" />
        <div className="bg-grain" />
      </div>

      <div className="pearls" aria-hidden="true">
        {pearls.map((p) => (
          <span
            key={p.id}
            className="pearl"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
              '--sway': `${p.sway}px`,
              '--op': p.op,
            }}
          />
        ))}
      </div>
    </>
  );
}
