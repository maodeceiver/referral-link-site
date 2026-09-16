const AD_URL =
  'https://redirect.appmetrica.yandex.com/serve/750599105348203879?partner_id=831050&appmetrica_js_redirect=0&clid=15383310&banerid=1315383311&full=0';

const AD_IMAGE = '/ads/banner-cs2.jpg';

type Props = {
  side: 'left' | 'right';
};

const SideBanner = ({ side }: Props) => {
  return (
    <aside
      className={`pointer-events-none fixed top-24 z-30 hidden w-[160px] 2xl:block ${
        side === 'left' ? 'left-4' : 'right-4'
      }`}
    >
      <a
        href={AD_URL}
        target="_blank"
        rel="nofollow sponsored noopener"
        className="pointer-events-auto block overflow-hidden rounded-2xl border border-border bg-white transition-colors hover:border-primary/50"
      >
        <img
          src={AD_IMAGE}
          alt="Скачать приложение"
          loading="lazy"
          className="h-[400px] w-full object-cover"
        />
        <div className="bg-[#fc3f1d] px-3 py-2 text-center text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-white">
          Скачать
        </div>
      </a>
      <p className="mt-1 text-center text-[0.62rem] uppercase tracking-[0.1em] text-muted-foreground">
        Реклама
      </p>
    </aside>
  );
};

export default SideBanner;