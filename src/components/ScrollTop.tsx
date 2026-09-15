import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

const ScrollTop = () => {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Наверх"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`accent-gradient fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-2xl text-primary-foreground shadow-[0_10px_28px_hsl(var(--primary)/0.35)] transition-all duration-300 hover:scale-105 sm:bottom-7 sm:right-7 ${
        shown
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <Icon name="ArrowUp" size={22} />
    </button>
  );
};

export default ScrollTop;
