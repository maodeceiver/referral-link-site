import { sites, type Site } from '@/data/sites';

export const toneColor: Record<Site['tone'], string> = {
  accent: '#8CD813',
  gold: '#E8C044',
  sky: '#3FC9D6',
  foreground: '#E6EDE2',
};

export interface Prize {
  site: Site;
  weight: number;
  tierLabel: string;
}

export const prizes: Prize[] = sites.map((site) => ({
  site,
  weight: site.featured ? 1 : site.promo ? 2.4 : 3.2,
  tierLabel: site.featured
    ? 'Топ-бонус'
    : site.promo
      ? 'Промокод'
      : 'Бонус без кода',
}));

const totalWeight = prizes.reduce((acc, p) => acc + p.weight, 0);

export const prizeChance = (prize: Prize) =>
  Math.round((prize.weight / totalWeight) * 1000) / 10;

export const rollPrize = (): Prize => {
  let roll = Math.random() * totalWeight;
  for (const prize of prizes) {
    roll -= prize.weight;
    if (roll <= 0) return prize;
  }
  return prizes[prizes.length - 1];
};
