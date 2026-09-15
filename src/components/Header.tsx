import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

const navLinks = [
  { href: '#catalog', label: 'Каталог' },
  { href: '#how', label: 'Как это работает' },
  { href: '#faq', label: 'Вопросы' },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-background/90 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-5">
        <div className="flex items-center justify-between gap-4 py-4">
          <a href="#top" className="flex items-center gap-3 shrink-0">
            <span className="accent-gradient grid h-10 w-10 place-items-center rounded-xl shadow-[0_8px_22px_hsl(var(--primary)/0.35)]">
              <Icon name="Box" size={22} className="text-primary-foreground" />
            </span>
            <span className="leading-none">
              <span className="block text-[1.15rem] font-bold tracking-[-0.02em]">
                freeopencasecs2
              </span>
              <span className="mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.09em] text-muted-foreground">
                Промокоды сайтов с кейсами CS2 · 2026
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-xl px-4 py-2 text-[0.82rem] font-semibold uppercase tracking-[0.06em] text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <span className="flex h-[38px] items-center gap-2 rounded-xl border border-border bg-card px-4 text-[0.78rem] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
              <span className="h-[7px] w-[7px] rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
              Коды проверены сегодня
            </span>
            <span className="flex h-[38px] items-center rounded-xl border border-border bg-card px-4 text-[0.78rem] font-semibold uppercase tracking-[0.06em] text-foreground">
              Ru
            </span>
          </div>

          <button
            type="button"
            aria-label="Меню"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card lg:hidden"
          >
            <Icon name={open ? 'X' : 'Menu'} size={20} />
          </button>
        </div>

        {open && (
          <nav className="animate-fade-up pb-4 lg:hidden">
            <div className="flex flex-col gap-1 rounded-2xl border border-border panel-gradient p-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.06em] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
