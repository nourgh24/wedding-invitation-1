// تحويل الأرقام إلى الهندية (٠١٢) عند اللغة العربية
export function fmt(value, lang, pad = 0) {
  const s = String(value).padStart(pad, '0');
  if (lang !== 'ar') return s;
  return s.replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);
}

// تنزيل ملف تقويم (ICS) لحفظ الموعد في الهاتف
export function downloadICS({ title, location, start, hours = 5 }) {
  const pad = (n) => String(n).padStart(2, '0');
  const d = new Date(start);
  const end = new Date(d.getTime() + hours * 3600 * 1000);
  const f = (x) =>
    `${x.getFullYear()}${pad(x.getMonth() + 1)}${pad(x.getDate())}T${pad(x.getHours())}${pad(x.getMinutes())}00`;
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Nour and Ismaiel//Wedding//EN',
    'BEGIN:VEVENT',
    `UID:${f(d)}@nour-ismaiel`,
    `DTSTAMP:${f(new Date())}`,
    `DTSTART:${f(d)}`,
    `DTEND:${f(end)}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:${title}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'nour-ismaiel-wedding.ics';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
