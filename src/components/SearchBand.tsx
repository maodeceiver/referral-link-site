import Icon from '@/components/ui/icon';
import { categories, type CategoryId } from '@/data/sites';

interface SearchBandProps {
  query: string;
  onQueryChange: (value: string) => void;
  active: CategoryId | 'all';
  onCategoryChange: (id: CategoryId | 'all') => void;
  total: number;
}

const SearchBand = ({
  query,
  onQueryChange,
  active,
  onCategoryChange,
  total,
}: SearchBandProps) => {
  return (
    <section
      id="top"
      className="streak-overlay relative overflow-hidden rounded-3xl border border-border px-5 py-7 sm:px-8 sm:py-8"
      style={{
        background:
          'radial-gradient(120% 180% at 88% 0%, hsl(var(--primary) / 0.3) 0%, transparent 60%), linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--panel)) 100%)',
      }}
    >
      <div className="relative z-10 flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-end lg:gap-10">
        <div className="animate-fade-up opacity-0 [animation-delay:60ms]">
          <h1 className="text-[2rem] font-bold uppercase leading-[1.06] tracking-[-0.025em] sm:text-[2.6rem]">
            Промокод
            <br />
            <span className="text-primary">на кейсы CS2</span>
          </h1>
          <p className="mt-2 max-w-[440px] text-[0.98rem] text-muted-foreground">
            {total} сайтов, живые бонусы, без регистрации у нас.
          </p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="animate-fade-up flex h-[60px] w-full max-w-[560px] items-center gap-3 rounded-2xl border border-border bg-well pl-5 pr-2 opacity-0 [animation-delay:120ms] focus-within:border-primary/60"
        >
          <Icon name="Search" size={20} className="shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Название сайта или промокод"
            aria-label="Поиск по сайтам и промокодам"
            className="h-full flex-1 bg-transparent text-[0.98rem] outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <button
              type="button"
              aria-label="Очистить"
              onClick={() => onQueryChange('')}
              className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon name="X" size={16} />
            </button>
          )}
          <span className="accent-gradient hidden h-11 items-center rounded-xl px-6 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-primary-foreground sm:flex">
            Найти
          </span>
        </form>
      </div>

      <ul className="animate-fade-up relative z-10 mt-5 flex flex-wrap gap-2 opacity-0 [animation-delay:180ms]">
        <li>
          <button
            type="button"
            onClick={() => onCategoryChange('all')}
            className={`flex h-[34px] items-center rounded-[10px] border px-4 text-[0.74rem] font-semibold uppercase tracking-[0.07em] transition-all ${
              active === 'all'
                ? 'accent-gradient border-transparent text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:text-foreground'
            }`}
          >
            Все
          </button>
        </li>
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              type="button"
              onClick={() => onCategoryChange(cat.id)}
              className={`flex h-[34px] items-center rounded-[10px] border px-4 text-[0.74rem] font-semibold uppercase tracking-[0.07em] transition-all ${
                active === cat.id
                  ? 'accent-gradient border-transparent text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat.label}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SearchBand;
