import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * التحكم في الموسيقى:
 *  - تحاول التشغيل مباشرة عند فتح الرابط
 *  - إن منع المتصفح التشغيل التلقائي، تبدأ عند أول لمسة/نقرة من الزائر
 *  - toggle() لإيقاف/إعادة التشغيل بتلاشي ناعم
 */
export default function useMusic({ src, volume = 0.5, autoStart = true }) {
  const audioRef = useRef(null);
  const fadeRef = useRef(null);
  const wantedRef = useRef(autoStart); // false بعد أن يوقفها الزائر يدوياً
  const [playing, setPlaying] = useState(false);

  const fade = useCallback((to, ms = 1600, done) => {
    const a = audioRef.current;
    if (!a) return;
    clearInterval(fadeRef.current);
    const from = a.volume;
    const steps = Math.max(1, Math.round(ms / 50));
    let i = 0;
    fadeRef.current = setInterval(() => {
      i += 1;
      a.volume = Math.min(1, Math.max(0, from + (to - from) * (i / steps)));
      if (i >= steps) {
        clearInterval(fadeRef.current);
        if (done) done();
      }
    }, 50);
  }, []);

  const play = useCallback(async () => {
    const a = audioRef.current;
    if (!a) return false;
    wantedRef.current = true;
    try {
      await a.play();
      fade(volume);
      return true;
    } catch {
      return false;
    }
  }, [fade, volume]);

  const pause = useCallback(() => {
    wantedRef.current = false;
    fade(0, 600, () => audioRef.current && audioRef.current.pause());
  }, [fade]);

  const toggle = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) play();
    else pause();
  }, [play, pause]);

  useEffect(() => {
    const a = new Audio(src);
    a.loop = true;
    a.preload = 'auto';
    a.volume = 0;
    audioRef.current = a;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    a.addEventListener('play', onPlay);
    a.addEventListener('pause', onPause);

    const events = ['pointerdown', 'touchstart', 'keydown', 'click'];
    const remove = () => events.forEach((e) => window.removeEventListener(e, unlock));
    function unlock(ev) {
      if (!wantedRef.current) return remove();
      if (ev && ev.target && ev.target.closest && ev.target.closest('[data-music-toggle]')) return;
      a.play()
        .then(() => {
          fade(volume);
          remove();
        })
        .catch(() => {});
    }

    if (autoStart) {
      a.play()
        .then(() => fade(volume))
        .catch(() => events.forEach((e) => window.addEventListener(e, unlock, { passive: true })));
    }

    return () => {
      remove();
      clearInterval(fadeRef.current);
      a.removeEventListener('play', onPlay);
      a.removeEventListener('pause', onPause);
      a.pause();
      audioRef.current = null;
    };
  }, [src, volume, autoStart, fade]);

  return { playing, play, pause, toggle };
}
