import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { useSteamAuth } from '@/hooks/useSteamAuth';
import { toast } from '@/hooks/use-toast';
import func2url from '../../backend/func2url.json';

interface ReviewItem {
  id: number;
  rating: number;
  text: string;
  createdAt: string;
  nickname: string;
  avatar: string;
}

const SiteReviews = ({ siteId, siteName }: { siteId: string; siteName: string }) => {
  const { user, token, login } = useSteamAuth();
  const [items, setItems] = useState<ReviewItem[]>([]);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);

  const load = () => {
    fetch(`${func2url.reviews}?site_id=${encodeURIComponent(siteId)}`)
      .then((r) => r.json())
      .then((data) => setItems(data.reviews || []))
      .catch(() => undefined);
  };

  useEffect(load, [siteId]);

  const submit = async () => {
    if (!token) return;
    setSending(true);
    try {
      const res = await fetch(func2url.reviews, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Auth-Token': token },
        body: JSON.stringify({ siteId, rating, text }),
      });
      const data = await res.json();
      if (res.ok) {
        toast({ title: 'Спасибо за отзыв', description: `Ваша оценка сайта ${siteName} сохранена.` });
        setText('');
        load();
      } else {
        toast({ title: 'Не получилось', description: data.error || 'Попробуйте ещё раз' });
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-4 border-t border-border pt-4">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
        Отзывы игроков
      </p>

      {user ? (
        <div className="space-y-3 rounded-2xl border border-border bg-well p-4">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                aria-label={`Оценка ${n}`}
              >
                <Icon
                  name="Star"
                  size={22}
                  className={n <= rating ? 'fill-gold text-gold' : 'text-muted-foreground'}
                />
              </button>
            ))}
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={1000}
            rows={3}
            placeholder="Расскажите о своём опыте: бонус зашёл, вывод скинов, поддержка..."
            className="w-full resize-none rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-primary/50"
          />
          <button
            type="button"
            onClick={submit}
            disabled={sending}
            className="accent-gradient flex h-11 items-center rounded-xl px-5 text-[0.78rem] font-bold uppercase tracking-[0.08em] text-primary-foreground disabled:opacity-60"
          >
            {sending ? 'Отправляем...' : 'Оставить отзыв'}
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-dashed border-border bg-well p-4">
          <p className="flex-1 text-sm text-muted-foreground">
            Оставлять отзывы могут только игроки, вошедшие через Steam.
          </p>
          <button
            type="button"
            onClick={login}
            className="flex h-10 items-center gap-2 rounded-xl border border-sky/50 bg-sky/10 px-4 text-[0.76rem] font-bold uppercase tracking-[0.06em]"
          >
            <Icon name="Gamepad2" size={16} className="text-sky" />
            Войти через Steam
          </button>
        </div>
      )}

      {items.length > 0 ? (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center gap-2">
                {item.avatar ? (
                  <img
                    src={item.avatar}
                    alt={item.nickname}
                    width={28}
                    height={28}
                    className="h-7 w-7 rounded-full object-cover"
                  />
                ) : (
                  <Icon name="User" size={18} className="text-muted-foreground" />
                )}
                <span className="text-sm font-semibold">{item.nickname}</span>
                <span className="ml-auto flex items-center gap-1 text-sm font-semibold">
                  <Icon name="Star" size={14} className="fill-gold text-gold" />
                  {item.rating}
                </span>
              </div>
              {item.text && <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">
          Отзывов пока нет — станьте первым, кто оценит {siteName}.
        </p>
      )}
    </div>
  );
};

export default SiteReviews;
