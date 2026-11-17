import { useCallback, useEffect, useState } from 'react';
import { BACKGROUNDS, DEFAULT_LANG, MUSIC } from './config.js';
import { CONTENT } from './content.js';
import useMusic from './hooks/useMusic.js';
import Background from './components/Background.jsx';
import LangToggle from './components/LangToggle.jsx';
import Intro from './components/Intro.jsx';
import Hero from './components/Hero.jsx';
import Invitation from './components/Invitation.jsx';
import DateSection from './components/DateSection.jsx';
import Details from './components/Details.jsx';
import Gallery from './components/Gallery.jsx';
import Wishes from './components/Wishes.jsx';
import BottomBar from './components/BottomBar.jsx';

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('invite-lang') || DEFAULT_LANG);
  const [stage, setStage] = useState('intro'); // intro → leaving → open
  const [active, setActive] = useState('intro');
  const music = useMusic(MUSIC);
  const t = CONTENT[lang];

  /* اللغة والاتجاه */
  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    root.className = `lang-${lang}`;
    document.title = t.meta.title;
    localStorage.setItem('invite-lang', lang);
  }, [lang, t]);

  /* منع التمرير قبل فتح الدعوة */
  useEffect(() => {
    document.body.classList.toggle('locked', stage === 'intro');
  }, [stage]);

  /* تتبّع القسم الظاهر (يغيّر الخلفية والشريط السفلي) */
  useEffect(() => {
    if (stage === 'intro') return undefined;
    const sections = document.querySelectorAll('[data-section]');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.dataset.section);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [stage]);

  const openInvitation = () => {
    if (stage !== 'intro') return;
    music.play(); // النقرة تسمح للمتصفح ببدء الموسيقى
    setActive('hero');
    setStage('leaving');
    window.scrollTo(0, 0);
    setTimeout(() => setStage('open'), 1900);
  };

  const go = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const bgKey = stage === 'intro' ? 'intro' : active === 'intro' ? 'hero' : active;
  // القسمان (invite) و (family) لكل منهما خلفية، وقسم الشريط يعتمد على active
  const barActive = active;

  return (
    <>
      <Background images={BACKGROUNDS} activeKey={bgKey} />
      <LangToggle label={t.toggleLabel} onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} />

      {stage !== 'intro' && (
        <>
          <main className="page">
            <Hero t={t} />
            <Invitation t={t} />
            <DateSection t={t} lang={lang} />
            <Details t={t} />
            <Gallery t={t} />
            <Wishes t={t} lang={lang} />
          </main>
          <BottomBar
            t={t}
            active={barActive}
            playing={music.playing}
            onGo={go}
            onToggleMusic={music.toggle}
          />
        </>
      )}

      {stage !== 'open' && <Intro t={t} leaving={stage === 'leaving'} onOpen={openInvitation} />}
      <div className={`flash ${stage === 'leaving' ? 'go' : ''}`} aria-hidden="true" />
    </>
  );
}
