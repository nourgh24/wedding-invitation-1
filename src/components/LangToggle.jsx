import { Languages } from 'lucide-react';

/** زر الترجمة — ثابت في الزاوية العلوية (لا يتغير مكانه عند تبديل اللغة) */
export default function LangToggle({ label, onClick }) {
  return (
    <button className="lang-toggle" onClick={onClick} aria-label="Change language / تغيير اللغة">
      <Languages size={18} strokeWidth={1.7} />
      <span>{label}</span>
    </button>
  );
}
