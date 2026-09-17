import { useCallback, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import PrizeTile from '@/components/case/PrizeTile';
import { prizes, prizeChance, rollPrize, toneColor, type Prize } from '@/data/casePrizes';
import { openRef } from '@/lib/refLink';

const STRIP_LENGTH = 56;
const WINNER_INDEX = 48;

const buildStrip = (winner: Prize): Prize[] =>
  Array.from({ length: STRIP_LENGTH }, (_, i) =>
    i === WINNER_INDEX ? winner : prizes[Math.floor(Math.random() * prizes.length)],
  );

const CaseSimulator = () => {
  const [strip, setStrip] = useState<Prize[]>(() => buildStrip(prizes[0]));
  const [offset, setOffset] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<Prize | null>(null);
  const [history, setHistory] = useState<Prize[]>([]);
  const [opened, setOpened] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const spin = useCallback(() => {
    if (spinning) return;
    const winner = rollPrize();

    setResult(null);
    setStrip(buildStrip(winner));
    setOffset(0);
    setSpinning(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const track = trackRef.current;
        const viewport = viewportRef.current;
        if (!track || !viewport) return;
        const el = track.children[WINNER_INDEX] as HTMLElement | undefined;
        if (!el) return;
        const jitter = (Math.random() - 0.5) * el.offsetWidth * 0.55;
        setOffset(el.offsetLeft + el.offsetWidth / 2 - viewport.clientWidth / 2 + jitter);
      });
    });

    window.setTimeout(() => {
      setSpinning(false);
      setResult(winner);
      setOpened((n) => n + 1);
      setHistory((h) => [winner, ...h].slice(0, 12));
    }, 6100);
  }, [spinning]);

  const resultColor = result ? toneColor[result.site.tone] : null;

  return (
    <section id="simulator" className="mx-auto w-full max-w-[1280px] px-4 py-14 sm:px-5">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-primary">
            Демо-режим
          </p>
          <h2 className="mt-2 text-[1.9rem] font-bold uppercase leading-[1.08] tracking-[-0.025em] sm:text-[2.2rem]">
            Кейс с бонусами
          </h2>
        </div>
        <p className="max-w-md text-muted-foreground">
          Не знаете, с какого сайта начать? Крутите барабан — выпадет случайный сервис
          из нашего каталога вместе с его бонусом и промокодом.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-border panel-gradient">
        <div className="relative">
          <div
            ref={viewportRef}
            className="relative overflow-hidden py-6"
            style={{
              maskImage:
                'linear-gradient(90deg, transparent 0, #000 12%, #000 88%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(90deg, transparent 0, #000 12%, #000 88%, transparent 100%)',
            }}
          >
            <div
              ref={trackRef}
              className="flex gap-3 will-change-transform"
              style={{
                transform: `translate3d(-${offset}px, 0, 0)`,
                transition: spinning ? 'transform 6s cubic-bezier(0.12, 0.72, 0.1, 1)' : 'none',
              }}
            >
              {strip.map((prize, i) => (
                <PrizeTile
                  key={`${prize.site.id}-${i}`}
                  prize={prize}
                  highlight={!spinning && i === WINNER_INDEX && result?.site.id === prize.site.id}
                />
              ))}
            </div>
          </div>

          <span className="pointer-events-none absolute inset-y-3 left-1/2 w-[2px] -translate-x-1/2 bg-primary shadow-[0_0_18px_hsl(var(--primary))]" />
          <span className="pointer-events-none absolute left-1/2 top-1 h-0 w-0 -translate-x-1/2 border-x-[7px] border-t-[9px] border-x-transparent border-t-primary" />
          <span className="pointer-events-none absolute bottom-1 left-1/2 h-0 w-0 -translate-x-1/2 border-x-[7px] border-b-[9px] border-x-transparent border-b-primary" />
        </div>

        <div className="flex flex-col gap-4 border-t border-border px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-h-[52px]">
            {result && resultColor ? (
              <div className="flex items-center gap-3">
                <img
                  src={result.site.logo}
                  alt={result.site.name}
                  className="h-11 w-11 shrink-0 rounded-xl object-contain p-1"
                  style={{ background: `${resultColor}1f` }}
                />
                <div>
                  <p
                    className="text-[0.66rem] font-semibold uppercase tracking-[0.1em]"
                    style={{ color: resultColor }}
                  >
                    {result.site.name} · шанс {prizeChance(result)}%
                  </p>
                  <p className="text-base font-bold tracking-[-0.02em]">
                    {result.site.bonusHighlight}{' '}
                    <span className="font-medium text-muted-foreground">
                      {result.site.bonusRest}
                    </span>
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                {spinning ? 'Выбираем сервис…' : 'Нажмите «Открыть кейс» и получите случайный бонус.'}
              </p>
            )}
          </div>

          <div className="flex shrink-0 flex-wrap gap-3">
            {result && (
              <Button
                size="lg"
                variant="outline"
                onClick={() => openRef(result.site.url)}
                className="h-12 rounded-xl border-primary/40 px-6 text-base font-bold uppercase tracking-[0.02em] text-primary hover:bg-primary/10"
              >
                <Icon name="Gift" size={18} />
                Забрать бонус
              </Button>
            )}
            <Button
              size="lg"
              onClick={spin}
              disabled={spinning}
              className="accent-gradient h-12 rounded-xl px-7 text-base font-bold uppercase tracking-[0.02em] text-primary-foreground hover:opacity-90"
            >
              <Icon
                name={spinning ? 'Loader2' : 'Package'}
                size={18}
                className={spinning ? 'animate-spin' : ''}
              />
              {spinning ? 'Крутим' : result ? 'Крутить ещё' : 'Открыть кейс'}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto]">
        <div className="rounded-3xl border border-border panel-gradient p-5">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Что уже выпадало
          </p>
          {history.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {history.map((p, i) => (
                <span
                  key={`${p.site.id}-${i}`}
                  className="rounded-lg border px-2.5 py-1 text-[0.72rem] font-semibold"
                  style={{
                    borderColor: toneColor[p.site.tone],
                    color: toneColor[p.site.tone],
                  }}
                >
                  {p.site.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-muted-foreground">Пока пусто — откройте первый кейс.</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 md:w-[320px]">
          <div className="rounded-3xl border border-border panel-gradient p-5">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Прокруток
            </p>
            <p className="mt-2 text-2xl font-bold">{opened}</p>
          </div>
          <div className="rounded-3xl border border-border panel-gradient p-5">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Сервисов в кейсе
            </p>
            <p className="mt-2 text-2xl font-bold text-primary">{prizes.length}</p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-[0.78rem] leading-relaxed text-muted-foreground">
        Барабан выбирает сервис из каталога случайным образом и показывает его актуальный
        бонус. Промокоды проверяются ежедневно, переход на сайт — по прямой ссылке.
      </p>
    </section>
  );
};

export default CaseSimulator;
