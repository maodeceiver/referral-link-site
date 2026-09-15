import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { categories, sites, type Site } from '@/data/sites';
import { toast } from '@/hooks/use-toast';

const SITE_URL = 'https://codecasecs.ru';

const toneClass: Record<Site['tone'], string> = {
  accent: 'text-primary',
  gold: 'text-gold',
  sky: 'text-sky',
  foreground: 'text-foreground',
};

const useSiteSeo = (site: Site | undefined) => {
  useEffect(() => {
    if (!site) return;
    const title = `${site.name} — промокод и бонус ${new Date().getFullYear()} | CodeCase`;
    const description = `${site.name}: ${site.bonusHighlight} ${site.bonusRest}. ${site.kind}. Минимальный депозит ${site.minDeposit}, вывод: ${site.payouts}.`;
    const prevTitle = document.title;
    document.title = title;

    const desc = document.querySelector('meta[name="description"]');
    const prevDesc = desc?.getAttribute('content') || '';
    desc?.setAttribute('content', description);

    const canonical = document.querySelector('link[rel="canonical"]');
    const prevCanonical = canonical?.getAttribute('href') || `${SITE_URL}/`;
    canonical?.setAttribute('href', `${SITE_URL}/site/${site.id}`);

    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: site.name,
      image: `${SITE_URL}${site.logo}`,
      description,
      brand: { '@type': 'Brand', name: site.name },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: site.rating.toFixed(2),
        bestRating: '5',
        worstRating: '1',
        ratingCount: site.reviews,
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'RUB',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/site/${site.id}`,
      },
    });
    document.head.appendChild(ld);

    window.scrollTo(0, 0);

    return () => {
      document.title = prevTitle;
      desc?.setAttribute('content', prevDesc);
      canonical?.setAttribute('href', prevCanonical);
      ld.remove();
    };
  }, [site]);
};

const SitePage = () => {
  const { siteId } = useParams();
  const site = sites.find((s) => s.id === siteId);
  useSiteSeo(site);

  if (!site) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="mx-auto flex w-full max-w-[720px] flex-col items-center gap-4 px-4 py-24 text-center">
          <Icon name="SearchX" size={36} className="text-muted-foreground" />
          <h1 className="text-2xl font-bold">Такого сайта нет в каталоге</h1>
          <Link
            to="/"
            className="accent-gradient flex h-12 items-center rounded-xl px-6 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-primary-foreground"
          >
            Вернуться в каталог
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.promo);
    } catch {
      // буфер недоступен
    }
    toast({
      title: `Промокод ${site.promo} скопирован`,
      description: `Активируйте его на сайте ${site.name}.`,
    });
  };

  const siteCats = categories.filter((c) => site.categories.includes(c.id));
  const others = sites.filter((s) => s.id !== site.id).slice(0, 4);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Header />

      <main className="mx-auto w-full max-w-[1280px] px-4 pb-16 sm:px-5">
        <nav className="flex items-center gap-2 py-4 text-[0.78rem] text-muted-foreground">
          <Link to="/" className="transition-colors hover:text-foreground">
            Каталог
          </Link>
          <Icon name="ChevronRight" size={14} />
          <span className="text-foreground">{site.name}</span>
        </nav>

        <section className="relative overflow-hidden rounded-3xl border border-border panel-gradient p-5 sm:p-8">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-[320px] w-[320px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 70%)',
            }}
          />
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center">
            <div className="logo-hatch grid h-[160px] w-full shrink-0 place-items-center overflow-hidden rounded-2xl bg-well lg:w-[240px]">
              <div className="flex flex-col items-center gap-2 px-3 text-center">
                <img
                  src={site.logo}
                  alt={`Логотип ${site.name}`}
                  width={72}
                  height={72}
                  className="h-18 w-18 rounded-xl object-contain drop-shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
                />
                <span className="text-[1.05rem] font-bold uppercase leading-none tracking-[-0.02em]">
                  {site.namePrefix}
                  <span className={toneClass[site.tone]}>{site.nameSuffix}</span>
                </span>
                <span className="block text-[0.58rem] font-semibold tracking-[0.2em] text-muted-foreground">
                  {site.tagline}
                </span>
              </div>
            </div>

            <div className="flex-1">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                {site.kind}
              </p>
              <h1 className="mt-2 text-[2rem] font-bold uppercase leading-[1.05] tracking-[-0.025em] sm:text-[2.6rem]">
                {site.name} — промокод и бонус
              </h1>
              <p className="mt-3 text-[1.2rem]">
                <span className="text-primary">{site.bonusHighlight}</span> {site.bonusRest}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-[10px]">
                <span className="flex items-center gap-[6px] text-[0.9rem] font-semibold">
                  <Icon name="Star" size={15} className="fill-gold text-gold" />
                  {site.rating.toFixed(2)}
                  <span className="font-normal text-muted-foreground">
                    · {site.reviews} оценок
                  </span>
                </span>
                {site.promo ? (
                  <button
                    type="button"
                    onClick={copy}
                    className="flex h-9 items-center gap-2 rounded-[9px] border border-dashed border-primary/60 bg-primary/10 px-3 text-[0.82rem] font-bold uppercase tracking-[0.12em] transition-colors hover:bg-primary/20"
                  >
                    <Icon name="Copy" size={13} className="text-primary" />
                    {site.promo}
                  </button>
                ) : (
                  <span className="flex h-9 items-center gap-2 rounded-[9px] border border-border bg-well px-3 text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    <Icon name="Link" size={13} className="text-primary" />
                    без промокода
                  </span>
                )}
                <span className="flex items-center gap-1 text-[0.78rem] text-muted-foreground">
                  <Icon name="ShieldCheck" size={14} className="text-primary" />
                  проверено {site.checked}
                </span>
              </div>

              <a
                href={site.url}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(site.url, '_blank', 'noopener,noreferrer');
                }}
                className="accent-gradient relative z-20 mt-5 inline-flex h-[52px] cursor-pointer items-center rounded-xl px-8 text-[0.85rem] font-bold uppercase tracking-[0.08em] text-primary-foreground shadow-[0_10px_24px_hsl(var(--primary)/0.28)] transition-transform hover:scale-[1.03] active:scale-[0.99]"
              >
                Забрать бонус на {site.name}
              </a>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)]">
          <div className="rounded-3xl border border-border panel-gradient p-5 sm:p-6">
            <h2 className="text-[1.3rem] font-bold uppercase tracking-[-0.02em]">
              Что даёт {site.name}
            </h2>
            <ul className="mt-4 space-y-3">
              {site.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2 text-muted-foreground">
                  <Icon name="Check" size={17} className="mt-[3px] shrink-0 text-primary" />
                  <span className="text-foreground/90">{perk}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-7 text-[1.3rem] font-bold uppercase tracking-[-0.02em]">
              Как получить бонус
            </h2>
            <ol className="mt-4 space-y-3">
              {[
                site.promo
                  ? `Скопируйте промокод ${site.promo} на этой странице`
                  : `Перейдите на ${site.name} по кнопке выше — бонус закрепляется автоматически`,
                'Зарегистрируйтесь через Steam и укажите ссылку на обмен',
                site.promo
                  ? 'Активируйте код в разделе бонусов или в профиле'
                  : 'Заберите стартовый бонус в разделе бонусов',
                'Откройте кейсы и выведите скины в свой инвентарь',
              ].map((step, i) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary/15 text-[0.8rem] font-bold text-primary">
                    {i + 1}
                  </span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-border panel-gradient p-5">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Кратко о сайте
              </p>
              <dl className="mt-3 space-y-3 text-[0.92rem]">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted-foreground">Минимальный депозит</dt>
                  <dd className="font-semibold">{site.minDeposit}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted-foreground">Вывод</dt>
                  <dd className="text-right font-semibold">{site.payouts}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted-foreground">Рейтинг</dt>
                  <dd className="font-semibold">{site.rating.toFixed(2)} / 5</dd>
                </div>
              </dl>
              <div className="mt-4 flex flex-wrap gap-2">
                {siteCats.map((c) => (
                  <span
                    key={c.id}
                    className="flex h-8 items-center gap-1 rounded-lg border border-border bg-well px-3 text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-muted-foreground"
                  >
                    <Icon name={c.icon} size={13} className="text-primary" />
                    {c.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border panel-gradient p-5">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Другие сайты
              </p>
              <div className="mt-3 space-y-2">
                {others.map((s) => (
                  <Link
                    key={s.id}
                    to={`/site/${s.id}`}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:border-primary/40"
                  >
                    <img
                      src={s.logo}
                      alt={s.name}
                      width={32}
                      height={32}
                      loading="lazy"
                      className="h-8 w-8 rounded-lg object-contain"
                    />
                    <span className="text-[0.9rem] font-semibold">{s.name}</span>
                    <span className="ml-auto flex items-center gap-1 text-[0.8rem] text-muted-foreground">
                      <Icon name="Star" size={12} className="fill-gold text-gold" />
                      {s.rating.toFixed(2)}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-6 rounded-3xl border border-border panel-gradient p-5 sm:p-6">
          <h2 className="text-[1.3rem] font-bold uppercase tracking-[-0.02em]">
            Стоит ли играть на {site.name}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {site.name} — это {site.kind.toLowerCase()} для игроков CS2. Площадка даёт{' '}
            {site.bonusHighlight.toLowerCase()} {site.bonusRest}, минимальный депозит{' '}
            {site.minDeposit}, а скины выводятся через {site.payouts.toLowerCase()}. Мы
            проверили условия {site.checked} — бонус работает. Как и на любом сайте с
            кейсами, играйте только на те суммы, которые не жалко потерять: исход
            открытия кейса случаен.
          </p>
          <Link
            to="/"
            className="ghost-gradient mt-5 inline-flex h-12 items-center rounded-xl border border-border px-6 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-foreground"
          >
            Все промокоды каталога
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SitePage;