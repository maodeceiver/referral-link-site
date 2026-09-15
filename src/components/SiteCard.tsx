import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import type { Site } from '@/data/sites';
import { baseUrl, openRef } from '@/lib/refLink';

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
      className="animate-fade-up group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-border panel-gradient p-4 opacity-0 transition-colors duration-300 hover:border-primary/40"
      style={{ animationDelay: `${120 + index * 50}ms` }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-14 -top-14 h-[200px] w-[200px] rounded-full opacity-70 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--primary) / 0.22) 0%, transparent 70%)',
        }}
      />

      <div className="logo-hatch relative grid h-[128px] w-full shrink-0 place-items-center overflow-hidden rounded-2xl bg-well">
        {site.featured && (
          <span className="absolute left-2 top-2 z-20 flex h-[22px] items-center gap-1 rounded-full bg-primary px-2 text-[0.62rem] font-bold uppercase tracking-[0.08em] text-primary-foreground">
            <Icon name="Flame" size={11} />
            Топ
          </span>
        )}
        <div className="relative z-10 flex flex-col items-center gap-2 px-3 text-center">
          <img
            src={site.logo}
            alt={`Логотип ${site.name}`}
            width={56}
            height={56}
            loading="lazy"
            className="h-14 w-14 rounded-xl object-contain drop-shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
          />
          <span className="text-[0.9rem] font-bold uppercase leading-none tracking-[-0.02em]">
            {site.namePrefix}
            <span className={toneClass[site.tone]}>{site.nameSuffix}</span>
          </span>
          <span className="block text-[0.55rem] font-semibold tracking-[0.18em] text-muted-foreground">
            {site.tagline}
          </span>
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col gap-3">
        <div className="flex-1">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            {site.kind}
          </p>
          <p className="mt-1 text-[1.05rem] font-bold leading-[1.15] tracking-[-0.015em]">
            <span className="text-primary">{site.bonusHighlight}</span>{' '}
            {site.bonusRest}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-[5px] text-[0.8rem] font-semibold">
            <Icon name="Star" size={13} className="fill-gold text-gold" />
            {site.rating.toFixed(2)}
            <span className="font-normal text-muted-foreground">
              · {site.reviews}
            </span>
          </span>
          {site.promo ? (
            <button
              type="button"
              onClick={() => onCopy(site)}
              aria-label={`Скопировать промокод ${site.promo}`}
              className="flex h-7 max-w-full items-center gap-1.5 overflow-hidden rounded-[8px] border border-dashed border-primary/60 bg-primary/10 px-2 text-[0.72rem] font-bold uppercase tracking-[0.08em] transition-colors hover:bg-primary/20"
            >
              <Icon
                name={copied ? 'Check' : 'Copy'}
                size={12}
                className="shrink-0 text-primary"
              />
              <span className="truncate">{copied ? 'Готово' : site.promo}</span>
            </button>
          ) : (
            <span className="flex h-7 items-center gap-1.5 rounded-[8px] border border-border bg-well px-2 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              <Icon name="Link" size={12} className="text-primary" />
              без кода
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <a
            href={baseUrl(site.url)}
            onClick={(e) => openRef(site.url, e)}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="accent-gradient flex h-[44px] items-center justify-center rounded-xl px-4 text-[0.78rem] font-bold uppercase tracking-[0.06em] text-primary-foreground shadow-[0_10px_24px_hsl(var(--primary)/0.28)] transition-transform hover:scale-[1.03]"
          >
            Забрать бонус
          </a>
          <div className="flex gap-2">
            <Link
              to={`/site/${site.id}`}
              className="ghost-gradient flex h-[40px] flex-1 items-center justify-center rounded-xl border border-border px-3 text-[0.74rem] font-bold uppercase tracking-[0.06em] text-muted-foreground transition-colors hover:text-foreground"
            >
              Обзор
            </Link>
            <button
              type="button"
              onClick={() => onReview(site)}
              aria-label={`Быстрый просмотр ${site.name}`}
              className="ghost-gradient grid h-[40px] w-[40px] shrink-0 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon name="Eye" size={16} />
            </button>
          </div>
        </div>

        <span className="flex items-center gap-1 text-[0.7rem] text-muted-foreground">
          <Icon name="ShieldCheck" size={13} className="text-primary" />
          проверено {site.checked}
        </span>
      </div>
    </article>
  );
};

export default SiteCard;
