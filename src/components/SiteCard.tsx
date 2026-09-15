import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import type { Site } from '@/data/sites';

const toneClass: Record<Site['tone'], string> = {
  accent: 'text-primary',
  gold: 'text-gold',
  sky: 'text-sky',
  foreground: 'text-foreground',
};

interface SiteCardProps {
  site: Site;
  index: number;
  copied: boolean;
  onCopy: (site: Site) => void;
  onReview: (site: Site) => void;
}

const SiteCard = ({ site, index, copied, onCopy, onReview }: SiteCardProps) => {
  return (
    <article
      className="animate-fade-up group relative flex flex-col gap-5 overflow-hidden rounded-3xl border border-border panel-gradient p-5 opacity-0 transition-colors duration-300 hover:border-primary/40 sm:flex-row sm:items-stretch sm:gap-6 sm:p-[18px_22px]"
      style={{ animationDelay: `${120 + index * 60}ms` }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-[260px] w-[260px] rounded-full opacity-70 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--primary) / 0.22) 0%, transparent 70%)',
        }}
      />

      <div className="logo-hatch relative grid h-[120px] w-full shrink-0 place-items-center overflow-hidden rounded-2xl bg-well sm:h-auto sm:w-[200px]">
        <div className="relative z-10 flex flex-col items-center gap-2 px-3 text-center">
          <img
            src={site.logo}
            alt={`Логотип ${site.name}`}
            width={64}
            height={64}
            loading="lazy"
            className="h-16 w-16 rounded-xl object-contain drop-shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
          />
          <span className="text-[0.95rem] font-bold uppercase leading-none tracking-[-0.02em]">
            {site.namePrefix}
            <span className={toneClass[site.tone]}>{site.nameSuffix}</span>
          </span>
          <span className="block text-[0.58rem] font-semibold tracking-[0.2em] text-muted-foreground">
            {site.tagline}
          </span>
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-between gap-5">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {site.featured && (
              <span className="flex h-[22px] items-center gap-1 rounded-full bg-primary px-2 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-primary-foreground">
                <Icon name="Flame" size={11} />
                Рекомендуем
              </span>
            )}
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              {site.kind}
            </p>
          </div>
          <p className="text-[1.5rem] font-bold leading-[1.05] tracking-[-0.02em]">
            <span className="text-primary">{site.bonusHighlight}</span> {site.bonusRest}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-[10px]">
            <span className="flex items-center gap-[6px] text-[0.85rem] font-semibold">
              <Icon name="Star" size={14} className="fill-gold text-gold" />
              {site.rating.toFixed(2)}
              <span className="font-normal text-muted-foreground">
                · {site.reviews} оценок
              </span>
            </span>
            {site.promo ? (
              <button
                type="button"
                onClick={() => onCopy(site)}
                aria-label={`Скопировать промокод ${site.promo}`}
                className="flex h-8 items-center gap-2 rounded-[9px] border border-dashed border-primary/60 bg-primary/10 px-3 text-[0.8rem] font-bold uppercase tracking-[0.12em] transition-colors hover:bg-primary/20"
              >
                <Icon name={copied ? 'Check' : 'Copy'} size={13} className="text-primary" />
                {copied ? 'Скопировано' : site.promo}
              </button>
            ) : (
              <span className="flex h-8 items-center gap-2 rounded-[9px] border border-border bg-well px-3 text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                <Icon name="Link" size={13} className="text-primary" />
                без промокода
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-[10px]">
          <a
            href={site.url}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="accent-gradient flex h-[46px] items-center rounded-xl px-6 text-[0.82rem] font-bold uppercase tracking-[0.08em] text-primary-foreground shadow-[0_10px_24px_hsl(var(--primary)/0.28)] transition-transform hover:scale-[1.03]"
          >
            Забрать бонус
          </a>
          <Link
            to={`/site/${site.id}`}
            className="ghost-gradient flex h-[46px] items-center rounded-xl border border-border px-5 text-[0.82rem] font-bold uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Обзор
          </Link>
          <button
            type="button"
            onClick={() => onReview(site)}
            aria-label={`Быстрый просмотр ${site.name}`}
            className="ghost-gradient grid h-[46px] w-[46px] place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon name="Eye" size={18} />
          </button>
          <span className="ml-auto hidden items-center gap-1 text-[0.75rem] text-muted-foreground sm:flex">
            <Icon name="ShieldCheck" size={14} className="text-primary" />
            проверено {site.checked}
          </span>
        </div>
      </div>
    </article>
  );
};

export default SiteCard;