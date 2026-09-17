import { rarityStyles, type Skin } from '@/data/skins';

interface Props {
  skin: Skin;
  highlight?: boolean;
}

const SkinTile = ({ skin, highlight }: Props) => {
  const style = rarityStyles[skin.rarity];

  return (
    <div
      className="relative flex h-[168px] w-[136px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl border p-3 sm:h-[186px] sm:w-[152px]"
      style={{
        borderColor: highlight ? style.color : 'hsl(var(--border))',
        background: `linear-gradient(180deg, ${style.glow} -60%, hsl(var(--panel)) 62%)`,
        boxShadow: highlight ? `0 0 26px ${style.glow}` : 'none',
      }}
    >
      <span
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ background: style.color }}
      />
      <span
        className="text-[0.6rem] font-semibold uppercase tracking-[0.1em]"
        style={{ color: style.color }}
      >
        {style.label}
      </span>
      <div>
        <p className="text-[0.7rem] text-muted-foreground">{skin.weapon}</p>
        <p className="mt-0.5 text-sm font-bold leading-tight tracking-[-0.02em]">
          {skin.skin}
        </p>
        <p className="mt-1 text-[0.65rem] text-muted-foreground">{skin.wear}</p>
      </div>
      <p className="text-sm font-bold" style={{ color: style.color }}>
        {skin.price.toLocaleString('ru-RU')} ₽
      </p>
    </div>
  );
};

export default SkinTile;
