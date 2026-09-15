import Icon from '@/components/ui/icon';
import { categoryContent } from '@/data/categoryContent';
import { categories, sites, type CategoryId } from '@/data/sites';

interface CategoryIntroProps {
  categoryId: CategoryId;
}

const CategoryIntro = ({ categoryId }: CategoryIntroProps) => {
  const content = categoryContent[categoryId];
  const category = categories.find((c) => c.id === categoryId);
  if (!content || !category) return null;

  const count = sites.filter((s) => s.categories.includes(categoryId)).length;

  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 pt-10 sm:px-5">
      <div className="rounded-3xl border border-border panel-gradient p-5 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="accent-gradient grid h-10 w-10 place-items-center rounded-xl">
            <Icon name={category.icon} size={20} className="text-primary-foreground" />
          </span>
          <span className="flex h-8 items-center rounded-[9px] border border-border bg-well px-3 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            {count} сайтов в разделе
          </span>
        </div>

        <h2 className="mt-4 text-[1.5rem] font-bold uppercase leading-[1.1] tracking-[-0.025em] sm:text-[1.9rem]">
          {content.heading}
        </h2>
        <p className="mt-2 max-w-[760px] text-[1.02rem] text-foreground">{content.lead}</p>

        <div className="mt-5 grid gap-5 text-[0.97rem] leading-relaxed text-muted-foreground lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            {content.body.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-well p-5">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Что проверить
            </p>
            <ul className="mt-3 space-y-3">
              {content.tips.map((tip) => (
                <li key={tip} className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="mt-1 shrink-0 text-primary" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryIntro;
