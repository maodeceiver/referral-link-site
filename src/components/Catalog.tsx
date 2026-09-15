import { useMemo, useState } from 'react';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import SearchBand from '@/components/SearchBand';
import SiteCard from '@/components/SiteCard';
import { categories, sites, type CategoryId, type Site } from '@/data/sites';
import { toast } from '@/hooks/use-toast';

type SortKey = 'rating' | 'name' | 'fresh';

const sortLabels: Record<SortKey, string> = {
  rating: 'По рейтингу',
  fresh: 'Сначала свежие',
  name: 'По алфавиту',
};

const Catalog = () => {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<CategoryId | 'all'>('all');
  const [sort, setSort] = useState<SortKey>('rating');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [review, setReview] = useState<Site | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = sites.filter((site) => {
      const matchCat = active === 'all' || site.categories.includes(active);
      const matchQuery =
        !q ||
        site.name.toLowerCase().includes(q) ||
        site.promo.toLowerCase().includes(q) ||
        site.kind.toLowerCase().includes(q) ||
        site.bonusHighlight.toLowerCase().includes(q) ||
        site.bonusRest.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });

    return [...list].sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name, 'ru');
      if (sort === 'fresh') {
        const w = (s: Site) => (s.checked === 'сегодня' ? 0 : 1);
        return w(a) - w(b) || b.rating - a.rating;
      }
      return b.rating - a.rating;
    });
  }, [query, active, sort]);

  const handleCopy = async (site: Site) => {
    try {
      await navigator.clipboard.writeText(site.promo);
    } catch {
      // буфер обмена недоступен — просто показываем код
    }
    setCopiedId(site.id);
    toast({
      title: `Промокод ${site.promo} скопирован`,
      description: `Активируйте его на сайте ${site.name} — бонус: ${site.bonusHighlight} ${site.bonusRest}.`,
    });
    window.setTimeout(() => setCopiedId((id) => (id === site.id ? null : id)), 2200);
  };

  return (
    <section id="catalog" className="mx-auto w-full max-w-[1280px] px-4 pb-6 sm:px-5">
      <SearchBand
        query={query}
        onQueryChange={setQuery}
        active={active}
        onCategoryChange={setActive}
        total={sites.length}
      />

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          Найдено сервисов: <span className="text-foreground">{filtered.length}</span>
          {active !== 'all' && (
            <span className="text-foreground">
              {' '}
              · {categories.find((c) => c.id === active)?.label}
            </span>
          )}
        </p>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(sortLabels) as SortKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setSort(key)}
              className={`flex h-9 items-center rounded-[10px] border px-4 text-[0.74rem] font-semibold uppercase tracking-[0.07em] transition-colors ${
                sort === key
                  ? 'border-primary/50 bg-primary/10 text-foreground'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground'
              }`}
            >
              {sortLabels[key]}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filtered.map((site, i) => (
            <SiteCard
              key={site.id}
              site={site}
              index={i}
              copied={copiedId === site.id}
              onCopy={handleCopy}
              onReview={setReview}
            />
          ))}
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-border panel-gradient px-6 py-16 text-center">
          <Icon name="SearchX" size={32} className="text-muted-foreground" />
          <p className="text-lg font-bold">Ничего не нашлось</p>
          <p className="max-w-sm text-muted-foreground">
            Попробуйте другое название сайта или сбросьте фильтр — рабочих промокодов
            в каталоге ещё много.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setActive('all');
            }}
            className="accent-gradient mt-2 flex h-11 items-center rounded-xl px-6 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-primary-foreground"
          >
            Сбросить фильтры
          </button>
        </div>
      )}

      <Dialog open={!!review} onOpenChange={(o) => !o && setReview(null)}>
        <DialogContent className="max-w-lg rounded-3xl border-border panel-gradient">
          {review && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold uppercase tracking-[-0.02em]">
                  {review.name}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {review.kind} · проверено {review.checked}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex items-center gap-2 text-base font-semibold">
                    <Icon name="Star" size={16} className="fill-gold text-gold" />
                    {review.rating.toFixed(2)}
                  </span>
                  <span className="flex h-8 items-center rounded-[9px] border border-dashed border-primary/60 bg-primary/10 px-3 text-sm font-bold uppercase tracking-[0.12em]">
                    {review.promo}
                  </span>
                </div>

                <p className="text-[1.05rem]">
                  <span className="text-primary">{review.bonusHighlight}</span>{' '}
                  {review.bonusRest}
                </p>

                <ul className="space-y-2">
                  {review.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-muted-foreground">
                      <Icon name="Check" size={16} className="mt-1 shrink-0 text-primary" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-border bg-well p-4">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                      Минимальный депозит
                    </p>
                    <p className="mt-1 font-semibold">{review.minDeposit}</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-well p-4">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                      Вывод
                    </p>
                    <p className="mt-1 font-semibold">{review.payouts}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleCopy(review)}
                    className="ghost-gradient flex h-12 items-center rounded-xl border border-border px-5 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-foreground"
                  >
                    Копировать код
                  </button>
                  <a
                    href={review.url}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="accent-gradient flex h-12 flex-1 items-center justify-center rounded-xl px-6 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-primary-foreground"
                  >
                    Перейти на сайт
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Catalog;
