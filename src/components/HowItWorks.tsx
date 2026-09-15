import Icon from '@/components/ui/icon';

const steps = [
  {
    icon: 'Search',
    title: 'Найдите сервис',
    text: 'Введите название сайта или сам промокод в строку поиска — или выберите категорию: бесплатные кейсы, апгрейдер, рулетка.',
  },
  {
    icon: 'Copy',
    title: 'Скопируйте промокод',
    text: 'Клик по коду копирует его в буфер обмена. Рядом всегда видно, когда бонус проверялся в последний раз.',
  },
  {
    icon: 'Gift',
    title: 'Заберите бонус',
    text: 'Переходите по кнопке, вставляйте код в поле «Промокод» на сайте — бонус начисляется сразу после активации.',
  },
];

const HowItWorks = () => {
  return (
    <section id="how" className="mx-auto w-full max-w-[1280px] px-4 py-14 sm:px-5">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-primary">
            Три шага
          </p>
          <h2 className="mt-2 text-[1.9rem] font-bold uppercase leading-[1.08] tracking-[-0.025em] sm:text-[2.2rem]">
            Как забрать бонус
          </h2>
        </div>
        <p className="max-w-md text-muted-foreground">
          Мы ничего не продаём и не просим регистрацию. Только каталог актуальных кодов
          и прямые ссылки на сервисы.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((step, i) => (
          <article
            key={step.title}
            className="relative overflow-hidden rounded-3xl border border-border panel-gradient p-6 transition-colors hover:border-primary/40"
          >
            <span className="absolute right-5 top-4 text-[4rem] font-bold leading-none text-foreground/5">
              0{i + 1}
            </span>
            <span className="accent-gradient grid h-12 w-12 place-items-center rounded-2xl">
              <Icon name={step.icon} size={22} className="text-primary-foreground" />
            </span>
            <h3 className="relative mt-5 text-xl font-bold tracking-[-0.02em]">
              {step.title}
            </h3>
            <p className="relative mt-2 text-muted-foreground">{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
