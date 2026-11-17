import { useEffect, useRef, useState } from 'react';

/** يُظهر العنصر بحركة ناعمة (ضبابية ← وضوح) عند ظهوره على الشاشة */
export default function Reveal({ children, delay = 0, variant = 'up', className = '', as: Tag = 'div', ...rest }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${variant} ${seen ? 'is-visible' : ''} ${className}`}
      style={{ '--delay': `${delay}s` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
