import { SEAL_IMAGE } from '../config.js';

/** شاشة الفتح: الأسماء + "انقر لفتح الدعوة" */
export default function Intro({ t, leaving, onOpen }) {
  return (
    <div className={`intro ${leaving ? 'leaving' : ''}`}>
      <div className="intro-inner">
        <p className="intro-kicker">{t.intro.kicker}</p>

        <h1 className="intro-names">
          <span className="intro-name gold-text">Nour</span>
          <span className="intro-amp">&amp;</span>
          <span className="intro-name gold-text">Ismaiel</span>
        </h1>

        <button className="seal" onClick={onOpen} aria-label={t.intro.open}>
          <span className="seal-ring seal-ring-1" />
          <span className="seal-ring seal-ring-2" />
          <span className="seal-face" style={{ backgroundImage: `url(${SEAL_IMAGE})` }}>
            <span className="seal-text">
              N<em>&amp;</em>I
            </span>
          </span>
        </button>

        <p className="intro-open">{t.intro.open}</p>
      </div>
    </div>
  );
}
