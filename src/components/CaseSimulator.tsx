import { useCallback, useMemo, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import SkinTile from '@/components/case/SkinTile';
import { caseSkins, rarityStyles, rollSkin, type Skin } from '@/data/skins';

const STRIP_LENGTH = 56;
const WINNER_INDEX = 48;

const buildStrip = (winner: Skin): Skin[] =>
  Array.from({ length: STRIP_LENGTH }, (_, i) =>
    i === WINNER_INDEX ? winner : caseSkins[Math.floor(Math.random() * caseSkins.length)],
  );

const CaseSimulator = () => {
  const [strip, setStrip] = useState<Skin[]>(() => buildStrip(caseSkins[0]));
  const [offset, setOffset] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<Skin | null>(null);
  const [history, setHistory] = useState<Skin[]>([]);
  const [opened, setOpened] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const best = useMemo(
    () => history.reduce<Skin | null>((acc, s) => (!acc || s.price > acc.price ? s : acc), null),
    [history],
  );

  const spin = useCallback(() => {
    if (spinning) return;
    const winner = rollSkin();
    const nextStrip = buildStrip(winner);

    setResult(null);
    setStrip(nextStrip);
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

  const resultStyle = result ? rarityStyles[result.rarity] : null;

  return (
    <section
      id="simulator"
      className="mx-auto w-full max-w-[1280px] px-4 py-14 sm:px-5"
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-primary">
            Демо-режим
          </p>
          <h2 className="mt-2 text-[1.9rem] font-bold uppercase leading-[1.08] tracking-[-0.025em] sm:text-[2.2rem]">
            Симулятор открытия кейса
          </h2>
        </div>
        <p className="max-w-md text-muted-foreground">
          Бесплатная тренировка без депозита и регистрации. Шансы приближены к реальным —
          посмотрите, как часто на самом деле выпадает нож.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-border panel-gradient">
        <div className="relative">
          <div
            ref={viewportRef}
            className="relative overflow-hidden px-0 py-6"
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
                transition: spinning
                  ? 'transform 6s cubic-bezier(0.12, 0.72, 0.1, 1)'
                  : 'none',
              }}
            >
              {strip.map((skin, i) => (
                <SkinTile
                  key={`${skin.id}-${i}`}
                  skin={skin}
                  highlight={!spinning && result?.id === skin.id && i === WINNER_INDEX}
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
            {result && resultStyle ? (
              <div className="flex items-center gap-3">
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                  style={{ background: resultStyle.glow }}
                >
                  <Icon name="Sparkles" size={20} style={{ color: resultStyle.color }} />
                </span>
                <div>
                  <p
                    className="text-[0.66rem] font-semibold uppercase tracking-[0.1em]"
                    style={{ color: resultStyle.color }}
                  >
                    {resultStyle.label} · шанс {resultStyle.chance}%
                  </p>
                  <p className="text-base font-bold tracking-[-0.02em]">
                    {result.weapon} | {result.skin} —{' '}
                    {result.price.toLocaleString('ru-RU')} ₽
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                {spinning ? 'Кейс открывается…' : 'Нажмите «Открыть кейс» и испытайте удачу.'}
              </p>
            )}
          </div>

          <Button
            size="lg"
            onClick={spin}
            disabled={spinning}
            className="accent-gradient h-12 shrink-0 rounded-xl px-7 text-base font-bold uppercase tracking-[0.02em] text-primary-foreground hover:opacity-90"
          >
            <Icon name={spinning ? 'Loader2' : 'Package'} size={18} className={spinning ? 'animate-spin' : ''} />
            {spinning ? 'Открываем' : 'Открыть кейс'}
          </Button>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto]">
        <div className="rounded-3xl border border-border panel-gradient p-5">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Последние дропы
          </p>
          {history.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {history.map((s, i) => (
                <span
                  key={`${s.id}-${i}`}
                  className="rounded-lg border px-2.5 py-1 text-[0.72rem] font-semibold"
                  style={{
                    borderColor: rarityStyles[s.rarity].color,
                    color: rarityStyles[s.rarity].color,
                  }}
                >
                  {s.skin}
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
              Открыто
            </p>
            <p className="mt-2 text-2xl font-bold">{opened}</p>
          </div>
          <div className="rounded-3xl border border-border panel-gradient p-5">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Лучший дроп
            </p>
            <p className="mt-2 text-2xl font-bold text-primary">
              {best ? `${best.price.toLocaleString('ru-RU')} ₽` : '—'}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-[0.78rem] leading-relaxed text-muted-foreground">
        Симулятор носит развлекательный характер: предметы виртуальные, вывод и покупка
        недоступны. Реальные кейсы открываются только на сайтах из каталога — там же
        действуют промокоды на бонус.
      </p>
    </section>
  );
};

export default CaseSimulator;
