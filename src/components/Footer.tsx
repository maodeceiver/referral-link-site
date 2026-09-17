import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { categories } from '@/data/sites';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-panel">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-12 sm:px-5">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <div className="flex items-center gap-3">
              <span className="accent-gradient grid h-10 w-10 place-items-center rounded-xl">
                <Icon name="Box" size={22} className="text-primary-foreground" />
              </span>
              <span className="text-[1.15rem] font-bold tracking-[-0.02em]">
                CodeCase
              </span>
            </div>
            <p className="mt-4 max-w-sm text-muted-foreground">
              Справочник промокодов и бонусов сайтов по открытию кейсов CS2. Мы не
              принимаем платежи и не проводим игры — только собираем и проверяем коды.
            </p>
            <p className="mt-4 flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              <Icon name="TriangleAlert" size={15} className="text-gold" />
              18+ · играйте ответственно
            </p>
          </div>

          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Категории
            </p>
            <ul className="mt-4 space-y-2">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.id}`}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Контакты
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:hi@codecase.ru"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Icon name="Mail" size={16} />
                  hi@codecase.ru
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/codecasecs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Icon name="Send" size={16} />
                  Telegram-канал с кодами и розыгрышами
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Icon name="Clock" size={16} />
                Ответ в течение суток
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-[0.82rem] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 CodeCase. Все права защищены.</p>
          <p>
            Часть ссылок — реферальные. Это не влияет на цену и бонус для вас.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;