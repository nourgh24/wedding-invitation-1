/* ==========================================================================
   ملف الإعدادات الرئيسي  |  Main settings file
   ---------------------------------------------------------------------------
   من هنا تستطيعين تعديل: الموسيقى، التاريخ، الصور، اللغة الافتراضية.
   النصوص نفسها موجودة في الملف: src/content.js
   ========================================================================== */

// ---------- صور الخلفيات السينمائية (استبدليها بصورك بنفس الأسماء أو غيّري المسار) ----------
import bgIntro from './assets/images/bg-intro.jpg';
import bgGolden from './assets/images/bg-golden.jpg';
import bgLace from './assets/images/bg-lace.jpg';
import bgBride from './assets/images/bg-bride.jpg';
import bgCandles from './assets/images/bg-candles.jpg';
import bgBallroom from './assets/images/bg-ballroom.jpg';
import bgVeil from './assets/images/bg-veil.jpg';
import bgRoses from './assets/images/bg-roses.jpg';

// ---------- صور معرض "لحظاتنا" (ضعي صورك داخل src/assets/gallery واستبدلي الأسماء) ----------
import photo1 from './assets/gallery/photo-1.jpg';
import photo2 from './assets/gallery/photo-22.jpg';
import photo3 from './assets/gallery/photo-3.jpg';
import photo4 from './assets/gallery/photo-4.jpg';
import photo5 from './assets/gallery/photo-5.jpg';

// ---------- ملف الموسيقى (استبدلي الملف src/assets/music/wedding-music.mp3 أو غيّري السطر) ----------
import weddingMusic from './assets/music/ViiY6fUgB2o.m4a';

/* ---------------- الموسيقى | Music ---------------- */
export const MUSIC = {
  src: weddingMusic, // يمكن وضع رابط مباشر مثل: 'https://example.com/song.mp3'
  volume: 0.60, // مستوى الصوت من 0 إلى 1
  autoStart: true, // تشغيل تلقائي من فتح الرابط (المتصفح قد يؤخر البدء إلى أول لمسة)
};

/* ---------------- الموعد | Event ---------------- */
export const EVENT = {
  // صيغة التاريخ: السنة-الشهر-اليوم T الساعة:الدقيقة:الثانية (توقيت 24 ساعة)
  iso: '2026-11-21T16:00:00',
  day: 21,
  month: 11,
  year: 2026,
  hour12: '5:00',
};

/* ---------------- اللغة الافتراضية: 'ar' أو 'en' ---------------- */
export const DEFAULT_LANG = 'ar';

/* ---------------- الخلفيات لكل قسم ---------------- */
export const BACKGROUNDS = {
  intro: bgIntro, // شاشة "انقر لفتح الدعوة"
  hero: bgGolden, // لحظات الفرح
  invite: bgLace, // دعوة خاصة (القصيدة)
  family: bgBride, // الآية + العائلتان
  date: bgCandles, // التاريخ والعد التنازلي
  details: bgBallroom, // تفاصيل الحفل
  gallery: bgVeil, // لحظاتنا
  wishes: bgRoses, // التهاني
};

// صورة الختم الدائري في شاشة الفتح
export const SEAL_IMAGE = bgCandles;

/* ---------------- معرض الصور ---------------- */
export const GALLERY = [
  { src: photo1, alt: 'Nour & Ismaiel 1' },
  { src: photo2, alt: 'Nour & Ismaiel 2' },
  { src: photo3, alt: 'Nour & Ismaiel 3' },
  { src: photo4, alt: 'Nour & Ismaiel 4' },
  { src: photo5, alt: 'Nour & Ismaiel 5' },
];

/* ---------------- حفظ التهاني محلياً (localStorage) ---------------- */
export const WISHES_STORAGE_KEY = 'nour-ismaiel-wishes-v1';
