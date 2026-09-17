export type Rarity = 'consumer' | 'industrial' | 'milspec' | 'restricted' | 'classified' | 'covert' | 'rare';

export interface RarityStyle {
  label: string;
  color: string;
  glow: string;
  chance: number;
}

export const rarityStyles: Record<Rarity, RarityStyle> = {
  consumer: { label: 'Ширпотреб', color: '#b0c3d9', glow: 'rgba(176,195,217,0.45)', chance: 22 },
  industrial: { label: 'Промышленное', color: '#5e98d9', glow: 'rgba(94,152,217,0.45)', chance: 26 },
  milspec: { label: 'Армейское', color: '#4b69ff', glow: 'rgba(75,105,255,0.5)', chance: 27 },
  restricted: { label: 'Запрещённое', color: '#8847ff', glow: 'rgba(136,71,255,0.5)', chance: 15 },
  classified: { label: 'Засекреченное', color: '#d32ce6', glow: 'rgba(211,44,230,0.5)', chance: 7 },
  covert: { label: 'Тайное', color: '#eb4b4b', glow: 'rgba(235,75,75,0.55)', chance: 2.6 },
  rare: { label: 'Нож / перчатки', color: '#ffd700', glow: 'rgba(255,215,0,0.6)', chance: 0.4 },
};

export interface Skin {
  id: string;
  weapon: string;
  skin: string;
  wear: string;
  rarity: Rarity;
  price: number;
}

export const caseSkins: Skin[] = [
  { id: 'p250-sand', weapon: 'P250', skin: 'Песчаная дюна', wear: 'Прямо с завода', rarity: 'consumer', price: 3 },
  { id: 'mp9-storm', weapon: 'MP9', skin: 'Штормовой фронт', wear: 'После полевых', rarity: 'consumer', price: 5 },
  { id: 'nova-polar', weapon: 'Nova', skin: 'Полярный мох', wear: 'Немного поношенное', rarity: 'consumer', price: 4 },
  { id: 'mag7-sand', weapon: 'MAG-7', skin: 'Песчаная буря', wear: 'После полевых', rarity: 'industrial', price: 12 },
  { id: 'p90-ash', weapon: 'P90', skin: 'Пепельный лес', wear: 'Немного поношенное', rarity: 'industrial', price: 18 },
  { id: 'ump-urban', weapon: 'UMP-45', skin: 'Городской ДДПАТ', wear: 'После полевых', rarity: 'industrial', price: 21 },
  { id: 'galil-cerbe', weapon: 'Galil AR', skin: 'Цербер', wear: 'Прямо с завода', rarity: 'milspec', price: 64 },
  { id: 'mac10-neon', weapon: 'MAC-10', skin: 'Неоновый всадник', wear: 'Немного поношенное', rarity: 'milspec', price: 88 },
  { id: 'five-monkey', weapon: 'Five-SeveN', skin: 'Обезьяний бизнес', wear: 'После полевых', rarity: 'milspec', price: 110 },
  { id: 'famas-roll', weapon: 'FAMAS', skin: 'Роликовый пресс', wear: 'Прямо с завода', rarity: 'milspec', price: 95 },
  { id: 'ak-elite', weapon: 'AK-47', skin: 'Элитная сборка', wear: 'После полевых', rarity: 'restricted', price: 320 },
  { id: 'm4-evil', weapon: 'M4A1-S', skin: 'Чёрный лотос', wear: 'Немного поношенное', rarity: 'restricted', price: 410 },
  { id: 'awp-atheris', weapon: 'AWP', skin: 'Атерис', wear: 'Прямо с завода', rarity: 'restricted', price: 380 },
  { id: 'desert-emerald', weapon: 'Desert Eagle', skin: 'Кодекс', wear: 'После полевых', rarity: 'restricted', price: 290 },
  { id: 'ak-neon', weapon: 'AK-47', skin: 'Неоновая революция', wear: 'Прямо с завода', rarity: 'classified', price: 2400 },
  { id: 'm4-printstream', weapon: 'M4A4', skin: 'Тёмный рыцарь', wear: 'Немного поношенное', rarity: 'classified', price: 1850 },
  { id: 'usp-kill', weapon: 'USP-S', skin: 'Смертный приговор', wear: 'Прямо с завода', rarity: 'classified', price: 1600 },
  { id: 'awp-dragon', weapon: 'AWP', skin: 'Пылающий зверь', wear: 'Прямо с завода', rarity: 'covert', price: 9800 },
  { id: 'ak-fuel', weapon: 'AK-47', skin: 'Огненный змей', wear: 'После полевых', rarity: 'covert', price: 14200 },
  { id: 'knife-fade', weapon: '★ Керамбит', skin: 'Градиент', wear: 'Прямо с завода', rarity: 'rare', price: 78000 },
  { id: 'knife-doppler', weapon: '★ Нож-бабочка', skin: 'Доплер', wear: 'Прямо с завода', rarity: 'rare', price: 96000 },
];

export const rollSkin = (): Skin => {
  const roll = Math.random() * 100;
  let acc = 0;
  let picked: Rarity = 'consumer';
  for (const key of Object.keys(rarityStyles) as Rarity[]) {
    acc += rarityStyles[key].chance;
    if (roll <= acc) {
      picked = key;
      break;
    }
  }
  const pool = caseSkins.filter((s) => s.rarity === picked);
  return pool[Math.floor(Math.random() * pool.length)];
};
