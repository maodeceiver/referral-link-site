export type CategoryId =
  | 'cases'
  | 'free'
  | 'upgrade'
  | 'contracts'
  | 'roulette'
  | 'crash'
  | 'battles'
  | 'trade';

export interface Category {
  id: CategoryId;
  label: string;
  icon: string;
}

export const categories: Category[] = [
  { id: 'cases', label: 'Открытие кейсов', icon: 'Package' },
  { id: 'free', label: 'Бесплатный кейс', icon: 'Gift' },
  { id: 'upgrade', label: 'Апгрейдер', icon: 'TrendingUp' },
  { id: 'contracts', label: 'Контракты', icon: 'FileSignature' },
  { id: 'roulette', label: 'Рулетка', icon: 'Disc3' },
  { id: 'crash', label: 'Краш', icon: 'Rocket' },
  { id: 'battles', label: 'Батлы', icon: 'Swords' },
  { id: 'trade', label: 'Трейд', icon: 'ArrowLeftRight' },
];

export type AccentTone = 'accent' | 'gold' | 'sky' | 'foreground';

export interface Site {
  id: string;
  name: string;
  namePrefix: string;
  nameSuffix: string;
  tone: AccentTone;
  tagline: string;
  kind: string;
  bonusHighlight: string;
  bonusRest: string;
  promo: string;
  rating: number;
  reviews: number;
  categories: CategoryId[];
  url: string;
  checked: string;
  perks: string[];
  minDeposit: string;
  payouts: string;
  featured?: boolean;
}

export const sites: Site[] = [
  {
    id: 'skinoz',
    name: 'Skinoz',
    namePrefix: 'Skin',
    nameSuffix: 'oz',
    tone: 'accent',
    tagline: 'CS2 CASES',
    kind: 'Бонус за переход по ссылке',
    bonusHighlight: '250 монет',
    bonusRest: 'каждые сутки',
    promo: '',
    rating: 4.88,
    reviews: 1284,
    categories: ['free', 'cases', 'upgrade', 'battles'],
    url: 'https://app.skinoz.net/?ref=YHNzRVVkagdZXgRZcw==',
    checked: 'сегодня',
    perks: ['250 бесплатных монет каждые сутки', 'Вывод скинов за 2 минуты', 'Кейсы от 3 ₽'],
    minDeposit: 'от 100 ₽',
    payouts: 'Steam, крипта, карта',
    featured: true,
  },
  {
    id: 'ntskins',
    name: 'NTSkins',
    namePrefix: 'NT',
    nameSuffix: 'Skins',
    tone: 'sky',
    tagline: 'SKIN TRADE',
    kind: 'Бесплатный скин',
    bonusHighlight: 'Скин',
    bonusRest: 'бесплатно за регистрацию',
    promo: '',
    rating: 4.66,
    reviews: 714,
    categories: ['trade', 'free', 'upgrade'],
    url: 'https://ntskins.com/freeskin',
    checked: 'сегодня',
    perks: ['Обмен скинов без комиссии', 'Бесплатный скин новичкам', 'Мгновенный трейд'],
    minDeposit: 'не нужен',
    payouts: 'Steam-трейд',
  },
  {
    id: 'dropzone',
    name: 'DropZone',
    namePrefix: 'Drop',
    nameSuffix: 'Zone',
    tone: 'accent',
    tagline: 'OPEN & WIN',
    kind: 'Без депозита',
    bonusHighlight: 'Кейс',
    bonusRest: 'за регистрацию',
    promo: 'OPENCS2',
    rating: 4.63,
    reviews: 942,
    categories: ['free', 'cases', 'roulette'],
    url: 'https://example.com/dropzone',
    checked: 'сегодня',
    perks: ['Free-кейс без пополнения', 'Ежедневные задания', 'Реферальная программа 10%'],
    minDeposit: 'не нужен',
    payouts: 'Steam, крипта',
  },
  {
    id: 'skinvault',
    name: 'SkinVault',
    namePrefix: 'Skin',
    nameSuffix: 'Vault',
    tone: 'gold',
    tagline: 'CASES & UPGRADE',
    kind: 'Промокод на баланс',
    bonusHighlight: '$5',
    bonusRest: 'на первый кейс',
    promo: 'VAULT5',
    rating: 4.51,
    reviews: 771,
    categories: ['cases', 'upgrade', 'contracts'],
    url: 'https://example.com/skinvault',
    checked: 'вчера',
    perks: ['Апгрейдер до x20', 'Контракты из 10 скинов', 'Кэшбэк 5% по выходным'],
    minDeposit: 'от 100 ₽',
    payouts: 'Steam, СБП',
  },
  {
    id: 'lootline',
    name: 'LootLine',
    namePrefix: 'Loot',
    nameSuffix: 'Line',
    tone: 'sky',
    tagline: 'DAILY CASES',
    kind: 'Ежедневно',
    bonusHighlight: '+25%',
    bonusRest: 'к пополнению',
    promo: 'LOOT25',
    rating: 4.38,
    reviews: 618,
    categories: ['cases', 'crash', 'battles'],
    url: 'https://example.com/lootline',
    checked: 'сегодня',
    perks: ['Краш с авто-выводом', 'Батлы до 4 игроков', 'Бонус каждый день'],
    minDeposit: 'от 70 ₽',
    payouts: 'Крипта, карта',
  },
  {
    id: '12cs',
    name: 'CSFail',
    namePrefix: 'CS',
    nameSuffix: 'Fail',
    tone: 'accent',
    tagline: 'CASE BATTLES',
    kind: 'Бонус за переход по ссылке',
    bonusHighlight: 'Бесплатный кейс',
    bonusRest: 'новым игрокам',
    promo: '',
    rating: 4.72,
    reviews: 1103,
    categories: ['battles', 'cases', 'roulette'],
    url: 'https://12cs.fail/ru/',
    checked: 'сегодня',
    perks: ['Батлы 2х2 и 1х1х1х1', 'Топ дропов в реальном времени', 'Быстрый вывод'],
    minDeposit: 'от 100 ₽',
    payouts: 'Steam, крипта',
  },
  {
    id: 'rollhub',
    name: 'RollHub',
    namePrefix: 'Roll',
    nameSuffix: 'Hub',
    tone: 'gold',
    tagline: 'ROULETTE & CASES',
    kind: 'Рулетка',
    bonusHighlight: '3 спина',
    bonusRest: 'бесплатно',
    promo: 'ROLL3',
    rating: 4.44,
    reviews: 503,
    categories: ['roulette', 'crash', 'free'],
    url: 'https://example.com/rollhub',
    checked: 'вчера',
    perks: ['Рулетка каждые 30 секунд', 'Честная игра provably fair', 'Чат и раздачи'],
    minDeposit: 'не нужен',
    payouts: 'Steam, СБП, крипта',
  },
  {
    id: 'upgrader',
    name: 'UpMax',
    namePrefix: 'Up',
    nameSuffix: 'Max',
    tone: 'sky',
    tagline: 'UPGRADE PRO',
    kind: 'Апгрейд скинов',
    bonusHighlight: '+2 апгрейда',
    bonusRest: 'к первому депозиту',
    promo: 'UPMAX2',
    rating: 4.29,
    reviews: 388,
    categories: ['upgrade', 'contracts'],
    url: 'https://example.com/upmax',
    checked: 'вчера',
    perks: ['Апгрейд ножей и перчаток', 'Контракты с бустом шанса', 'Поддержка 24/7'],
    minDeposit: 'от 150 ₽',
    payouts: 'Steam',
  },
  {
    id: 'freedrop',
    name: 'FreeDrop',
    namePrefix: 'Free',
    nameSuffix: 'Drop',
    tone: 'accent',
    tagline: 'FREE CASES',
    kind: 'Без депозита',
    bonusHighlight: '3 кейса',
    bonusRest: 'по промокоду',
    promo: 'FREE3',
    rating: 4.57,
    reviews: 860,
    categories: ['free', 'cases'],
    url: 'https://example.com/freedrop',
    checked: 'сегодня',
    perks: ['Бесплатные кейсы за уровень', 'Задания за скины', 'Вывод от 1 скина'],
    minDeposit: 'не нужен',
    payouts: 'Steam',
  },
];

export const faq = [
  {
    q: 'Как активировать промокод на сайте с кейсами CS2?',
    a: 'Скопируйте код на нашей карточке, перейдите по кнопке «Забрать бонус» — вы попадёте на сайт по нашей ссылке. В профиле или в разделе «Бонусы» найдите поле «Промокод», вставьте код и подтвердите. Бонус начисляется сразу.',
  },
  {
    q: 'Почему промокод не сработал?',
    a: 'Чаще всего код уже был использован на вашем аккаунте, истёк срок его действия или бонус требует депозита. Попробуйте другой сервис из каталога — мы помечаем дату последней проверки каждого кода.',
  },
  {
    q: 'Нужно ли регистрироваться у вас?',
    a: 'Нет. freeopencasecs2 — это справочник. Мы не храним ваши данные, не принимаем платежи и ничего не продаём: вы просто берёте код и переходите на сайт сервиса.',
  },
  {
    q: 'Как часто обновляются коды?',
    a: 'Мы проверяем бонусы каждый день и обновляем карточки. Если код перестал работать — отметка «проверено» подскажет, насколько свежая информация.',
  },
  {
    q: 'Это безопасно?',
    a: 'Мы публикуем только сервисы с рабочим выводом скинов и репутацией. Но открытие кейсов — развлечение с риском: играйте только на те суммы, которые не жалко потерять, и только с 18 лет.',
  },
];