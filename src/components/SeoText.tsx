import { Link } from 'react-router-dom';
import { sites } from '@/data/sites';

const SeoText = () => {
  const top = [...sites].sort((a, b) => b.rating - a.rating).slice(0, 5);

  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 pb-16 sm:px-5">
      <div className="rounded-3xl border border-border panel-gradient p-5 sm:p-8">
        <h2 className="text-[1.5rem] font-bold uppercase leading-[1.1] tracking-[-0.025em] sm:text-[1.8rem]">
          Промокоды на кейсы CS2 — как пользоваться каталогом
        </h2>

        <div className="mt-4 grid gap-5 text-[0.97rem] leading-relaxed text-muted-foreground lg:grid-cols-2">
          <div className="space-y-4">
            <p>
              CodeCase — справочник промокодов и бонусов сайтов с кейсами CS2. Мы собираем
              рабочие коды на бесплатные кейсы, бонусы на первый депозит, стартовые монеты
              и подарочные скины, а затем каждый день проверяем, что они действительно
              срабатывают. В каталоге {sites.length} площадок: открытие кейсов, апгрейдеры,
              контракты, рулетка, краш, батлы и трейд-сервисы для обмена скинов.
            </p>
            <p>
              Чтобы забрать бонус, скопируйте промокод в карточке нужного сайта и перейдите
              по кнопке — код активируется в профиле или в разделе «Бонусы». Часть площадок
              работает без кода: там бонус закрепляется автоматически при переходе по нашей
              ссылке. Для вывода скинов почти везде нужен аккаунт Steam с открытым
              инвентарём и ссылкой на обмен.
            </p>
          </div>

          <div className="space-y-4">
            <p>
              Мы оцениваем сайты по скорости вывода скинов, размеру минимального депозита,
              честности дропа и работе поддержки. Рейтинг в карточке — это средняя оценка
              игроков, а метка «проверено сегодня» означает, что бонус тестировался в
              последние сутки. Если код перестал работать, он уходит из каталога.
            </p>
            <p>
              Открытие кейсов CS2 — развлечение со случайным исходом. Играйте только на
              суммы, которые не жалко потерять, и не используйте сайты, если вам нет 18 лет.
              Часть ссылок реферальные: цена и размер бонуса для вас от этого не меняются.
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-5">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Популярные обзоры
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {top.map((site) => (
              <Link
                key={site.id}
                to={`/site/${site.id}`}
                className="flex h-9 items-center rounded-[10px] border border-border bg-card px-4 text-[0.78rem] font-semibold transition-colors hover:border-primary/40 hover:text-primary"
              >
                Промокод {site.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeoText;
