import { toneColor, type Prize } from '@/data/casePrizes';

interface Props {
  prize: Prize;
  highlight?: boolean;
}

const PrizeTile = ({ prize, highlight }: Props) => {
  const { site } = prize;
  const color = toneColor[site.tone];

  return (
    <div
      className="relative flex h-[172px] w-[140px] shrink-0 flex-col items-center justify-between overflow-hidden rounded-2xl border p-3 text-center sm:h-[190px] sm:w-[156px]"
      style={{
        borderColor: highlight ? color : 'hsl(var(--border))',
        background: `linear-gradient(180deg, ${color}26 -50%, hsl(var(--panel)) 60%)`,
        boxShadow: highlight ? `0 0 26px ${color}66` : 'none',
      }}
    >
      <span className="absolute inset-x-0 top-0 h-[3px]" style={{ background: color }} />
      <span
        className="mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.1em]"
        style={{ color }}
      >
        {prize.tierLabel}
      </span>

      <img
        src={site.logo}
        alt={site.name}
        loading="lazy"
        className="h-10 w-auto max-w-[96px] object-contain"
      />

      <div>
        <p className="text-sm font-bold leading-tight tracking-[-0.02em]">{site.name}</p>
        <p className="mt-1 line-clamp-2 text-[0.65rem] leading-snug text-muted-foreground">
          {site.bonusHighlight}
        </p>
      </div>

      <span
        className="w-full truncate rounded-lg px-2 py-1 text-[0.62rem] font-bold uppercase tracking-[0.06em]"
        style={{ background: `${color}1f`, color }}
      >
        {site.promo || 'без кода'}
      </span>
    </div>
  );
};

export default PrizeTile;
