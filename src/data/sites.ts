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
  logo: string;
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
    id: 'openstars',
    name: 'OpenStars',
    namePrefix: 'Open',
    nameSuffix: 'Stars',
    tone: 'gold',
    logo: '/logos/openstars.webp',
    tagline: 'CS2 CASES',
    kind: 'Бонус за регистрацию',
    bonusHighlight: '0.5$',
    bonusRest: 'на баланс при регистрации',
    promo: 'DXVRTDAS',
    rating: 4.79,
    reviews: 1043,
    categories: ['free', 'cases', 'upgrade', 'contracts', 'battles'],
    url: 'https://openstars.gg/?r=DXVRTDAS',
    checked: 'сегодня',
    perks: [
      '0.5$ на баланс сразу после регистрации',
      'Кейсы, апгрейдер и батлы на одной площадке',
      'Вывод скинов напрямую в инвентарь Steam',
    ],
    minDeposit: 'не нужен',
    payouts: 'Steam, карта, крипта',
    featured: true,
  },
  {
    id: 'skinoz',
    name: 'Skinoz',
    namePrefix: 'Skin',
    nameSuffix: 'oz',
    tone: 'accent',
    logo: '/logos/skinoz.webp',
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
    logo: '/logos/ntskins.webp',
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
    id: 'easydrop',
    name: 'EasyDrop',
    namePrefix: 'Easy',
    nameSuffix: 'Drop',
    tone: 'accent',
    logo: '/logos/easydrop.webp',
    tagline: 'OPEN & WIN',
    kind: 'Бонус по промокоду',
    bonusHighlight: 'Кейс',
    bonusRest: 'за регистрацию',
    promo: '8EAFD65',
    rating: 4.63,
    reviews: 942,
    categories: ['free', 'cases', 'roulette'],
    url: 'https://easydrop.bar/',
    checked: 'сегодня',
    perks: ['Free-кейс без пополнения', 'Ежедневные задания', 'Реферальная программа 10%'],
    minDeposit: 'не нужен',
    payouts: 'Steam, крипта',
  },
  {
    id: 'forcedrop',
    name: 'ForceDrop',
    namePrefix: 'Force',
    nameSuffix: 'Drop',
    tone: 'gold',
    logo: '/logos/forcedrop.webp',
    tagline: 'CASES & UPGRADE',
    kind: 'Бонус по промокоду',
    bonusHighlight: 'Бонус',
    bonusRest: 'за активацию кода',
    promo: 'REF51E435C1',
    rating: 4.51,
    reviews: 771,
    categories: ['cases', 'upgrade', 'contracts'],
    url: 'https://forcedrop.fun/',
    checked: 'сегодня',
    perks: ['Апгрейдер скинов', 'Контракты из 10 предметов', 'Быстрый вывод в Steam'],
    minDeposit: 'от 100 ₽',
    payouts: 'Steam, СБП',
  },
  {
    id: 'topskins',
    name: 'TopSkins',
    namePrefix: 'Top',
    nameSuffix: 'Skins',
    tone: 'sky',
    logo: '/logos/topskins.webp',
    tagline: 'TOP CASES',
    kind: 'Бонус к депозиту',
    bonusHighlight: '+20%',
    bonusRest: 'к пополнению по промокоду',
    promo: 'BSG',
    rating: 4.38,
    reviews: 618,
    categories: ['cases', 'battles'],
    url: 'https://topskins.vip/',
    checked: 'сегодня',
    perks: ['+20% к депозиту по коду BSG', 'Батлы и краш', 'Вывод скинов без задержек'],
    minDeposit: 'от 70 ₽',
    payouts: 'Крипта, карта',
  },
  {
    id: '12cs',
    name: 'CSFail',
    namePrefix: 'CS',
    nameSuffix: 'Fail',
    tone: 'accent',
    logo: '/logos/csfail.webp',
    tagline: 'CASE BATTLES',
    kind: 'Бонус за переход по ссылке',
    bonusHighlight: 'Бесплатный кейс',
    bonusRest: 'новым игрокам',
    promo: '',
    rating: 4.72,
    reviews: 1103,
    categories: ['battles', 'cases', 'roulette', 'crash'],
    url: 'https://12cs.fail/ru/',
    checked: 'сегодня',
    perks: ['Батлы 2х2 и 1х1х1х1', 'Топ дропов в реальном времени', 'Быстрый вывод'],
    minDeposit: 'от 100 ₽',
    payouts: 'Steam, крипта',
  },
  {
    id: 'mycs2',
    name: 'MyCS2',
    namePrefix: 'My',
    nameSuffix: 'CS2',
    tone: 'gold',
    logo: '/logos/mycs2.webp',
    tagline: 'CASES & ROULETTE',
    kind: 'Бонус к депозиту',
    bonusHighlight: '+20%',
    bonusRest: 'к пополнению по промокоду',
    promo: 'FREEGG0',
    rating: 4.44,
    reviews: 503,
    categories: ['cases', 'roulette'],
    url: 'https://mycs2.in/',
    checked: 'сегодня',
    perks: ['+20% к депозиту по коду FREEGG0', 'Рулетка и краш', 'Вывод скинов в Steam'],
    minDeposit: 'от 100 ₽',
    payouts: 'Steam, СБП, крипта',
  },
  {
    id: 'dolphin',
    name: 'Dolphin',
    namePrefix: 'Dol',
    nameSuffix: 'phin',
    tone: 'sky',
    logo: '/logos/dolphin.webp',
    tagline: 'CS2 CASES',
    kind: 'Бонус за переход по ссылке',
    bonusHighlight: 'Бесплатный кейс',
    bonusRest: 'при регистрации',
    promo: '',
    rating: 4.71,
    reviews: 627,
    categories: ['free', 'cases', 'upgrade'],
    url: 'https://dolphin.win/invite/05e5527a26a2',
    checked: 'сегодня',
    perks: ['Бесплатный кейс при регистрации', 'Апгрейдер скинов', 'Быстрый вывод в Steam'],
    minDeposit: 'не нужен',
    payouts: 'Steam, крипта, карта',
  },
  {
    id: 'swapgg',
    name: 'Swap.gg',
    namePrefix: 'Swap',
    nameSuffix: '.gg',
    tone: 'sky',
    logo: '/logos/swapgg.webp',
    tagline: 'SKIN TRADE',
    kind: 'Бонус за переход по ссылке',
    bonusHighlight: 'Бонус',
    bonusRest: 'новым пользователям',
    promo: '',
    rating: 4.69,
    reviews: 845,
    categories: ['trade', 'upgrade'],
    url: 'https://swap.gg/?r=KICPMVIYXT&utm_source=ref&utm_medium=link',
    checked: 'сегодня',
    perks: ['Обмен скинов CS2 за минуту', 'Огромный склад предметов', 'Прозрачная комиссия'],
    minDeposit: 'не нужен',
    payouts: 'Steam-трейд',
  },
  {
    id: 'tradeit',
    name: 'Tradeit.gg',
    namePrefix: 'Trade',
    nameSuffix: 'it.gg',
    tone: 'sky',
    logo: '/logos/tradeit.webp',
    tagline: 'SKIN TRADE',
    kind: 'Бонус за переход по ссылке',
    bonusHighlight: 'Бонус',
    bonusRest: 'на первый обмен',
    promo: '',
    rating: 4.75,
    reviews: 1362,
    categories: ['trade', 'upgrade'],
    url: 'https://tradeit.gg/?aff=deceiver',
    checked: 'сегодня',
    perks: ['Крупнейший склад скинов CS2', 'Обмен и покупка за деньги', 'Мгновенные трейды 24/7'],
    minDeposit: 'не нужен',
    payouts: 'Steam-трейд, карта, крипта',
  },
  {
    id: 'csmoney',
    name: 'CS.MONEY',
    namePrefix: 'CS.',
    nameSuffix: 'MONEY',
    tone: 'gold',
    logo: '/logos/csmoney.webp',
    tagline: 'SKIN TRADE',
    kind: 'Обмен скинов',
    bonusHighlight: 'Бонус',
    bonusRest: 'за первый обмен',
    promo: '',
    rating: 4.82,
    reviews: 2145,
    categories: ['trade', 'upgrade'],
    url: 'https://cs.money/ru/csgo/trade/',
    checked: 'сегодня',
    perks: ['Самый большой выбор скинов CS2', 'Обмен на любые предметы', 'Проверенная площадка с 2016 года'],
    minDeposit: 'не нужен',
    payouts: 'Steam-трейд, карта, крипта',
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
    a: 'Нет. CodeCase — это справочник. Мы не храним ваши данные, не принимаем платежи и ничего не продаём: вы просто берёте код и переходите на сайт сервиса.',
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