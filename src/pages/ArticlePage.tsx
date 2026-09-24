import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollTop from '@/components/ScrollTop';
import ArticleText from '@/components/ArticleText';
import { disclaimer, getArticle, type Article } from '@/data/articles';
import { categories, sites } from '@/data/sites';

const SITE_URL = 'https://codecasecs.ru';

const useArticleSeo = (article: Article | undefined) => {
  useEffect(() => {
    if (!article) return;
    const prevTitle = document.title;
    document.title = `${article.title} | CodeCase`;

    const desc = document.querySelector('meta[name="description"]');
    const prevDesc = desc?.getAttribute('content') || '';
    desc?.setAttribute('content', article.description);

    const canonical = document.querySelector('link[rel="canonical"]');
    const prevCanonical = canonical?.getAttribute('href') || `${SITE_URL}/`;
    canonical?.setAttribute('href', `${SITE_URL}/blog/${article.slug}`);

    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.textContent = JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.h1,
        description: article.description,
        author: { '@type': 'Organization', name: 'CodeCase' },
        publisher: { '@type': 'Organization', name: 'CodeCase' },
        mainEntityOfPage: `${SITE_URL}/blog/${article.slug}`,
        image: `${SITE_URL}/og-image.jpg`,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ]);
    document.head.appendChild(ld);

    window.scrollTo(0, 0);

    return () => {
      document.title = prevTitle;
      desc?.setAttribute('content', prevDesc);
      canonical?.setAttribute('href', prevCanonical);
      ld.remove();
    };
  }, [article]);
};

const ArticlePage = () => {
  const { slug } = useParams();
  const article = getArticle(slug);
  useArticleSeo(article);

  if (!article) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="mx-auto flex w-full max-w-[720px] flex-col items-center gap-4 px-4 py-24 text-center">
          <Icon name="SearchX" size={36} className="text-muted-foreground" />
          <h1 className="text-2xl font-bold">Такой статьи нет</h1>
          <Link
            to="/blog"
            className="accent-gradient flex h-12 items-center rounded-xl px-6 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-primary-foreground"
          >
            Все материалы
          </Link>
        </div>
        <Footer />
        <ScrollTop />
      </div>
    );
  }

  const related = article.relatedSites
    .map((id) => sites.find((s) => s.id === id))
    .filter(Boolean);
  const relatedCats = article.relatedCategories
    .map((id) => categories.find((c) => c.id === id))
    .filter(Boolean);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Header />

      <main className="mx-auto w-full max-w-[1280px] px-4 pb-16 sm:px-5">
        <nav className="flex flex-wrap items-center gap-2 py-4 text-[0.78rem] text-muted-foreground">
          <Link to="/" className="transition-colors hover:text-foreground">
            Каталог
          </Link>
          <Icon name="ChevronRight" size={14} />
          <Link to="/blog" className="transition-colors hover:text-foreground">
            Полезное
          </Link>
          <Icon name="ChevronRight" size={14} />
          <span className="text-foreground">{article.h1}</span>
        </nav>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)]">
          <article className="rounded-3xl border border-border panel-gradient p-5 sm:p-8">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-primary">
              Полезное
            </p>
            <h1 className="mt-2 text-[1.9rem] font-bold uppercase leading-[1.08] tracking-[-0.025em] sm:text-[2.3rem]">
              {article.h1}
            </h1>
            <p className="mt-3 flex flex-wrap items-center gap-3 text-[0.8rem] text-muted-foreground">
              <span>CodeCase</span>
              <span aria-hidden>·</span>
              <span>Обновлено {article.updated}</span>
              <span aria-hidden>·</span>
              <span>{article.readTime}</span>
            </p>
            <p className="mt-5 text-[1.08rem] leading-relaxed text-foreground">
              {article.lead}
            </p>

            {article.sections.map((section) => (
              <section key={section.title} className="mt-8">
                <h2 className="text-[1.35rem] font-bold uppercase leading-[1.15] tracking-[-0.02em]">
                  {section.title}
                </h2>
                {section.blocks.map((block, bi) => {
                  if (block.type === 'p') {
                    return (
                      <p
                        key={bi}
                        className="mt-3 leading-relaxed text-muted-foreground"
                      >
                        <ArticleText text={block.text} />
                      </p>
                    );
                  }
                  if (block.type === 'code') {
                    return (
                      <figure key={bi} className="mt-4">
                        <pre className="overflow-x-auto rounded-2xl border border-border bg-well p-4 text-[0.8rem] leading-relaxed text-foreground">
                          <code>{block.code}</code>
                        </pre>
                        {block.caption && (
                          <figcaption className="mt-2 text-[0.82rem] text-muted-foreground">
                            {block.caption}
                          </figcaption>
                        )}
                      </figure>
                    );
                  }
                  if (block.type === 'checks') {
                    return (
                      <ul key={bi} className="mt-4 space-y-3">
                        {block.items.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <Icon
                              name="Check"
                              size={16}
                              className="mt-1 shrink-0 text-primary"
                            />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <ul key={bi} className="mt-4 list-none space-y-3">
                      {block.items.map((item, i) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary/15 text-[0.8rem] font-bold text-primary">
                            {i + 1}
                          </span>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                })}
              </section>
            ))}

            <section className="mt-10">
              <h2 className="text-[1.35rem] font-bold uppercase leading-[1.15] tracking-[-0.02em]">
                Частые вопросы
              </h2>
              <dl className="mt-4 space-y-5">
                {article.faq.map((item) => (
                  <div key={item.q}>
                    <dt className="text-[1.02rem] font-semibold">{item.q}</dt>
                    <dd className="mt-2 leading-relaxed text-muted-foreground">
                      <ArticleText text={item.a} />
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <p className="mt-10 flex items-start gap-2 rounded-2xl border border-border bg-well p-4 text-[0.88rem] text-muted-foreground">
              <Icon name="TriangleAlert" size={16} className="mt-[2px] shrink-0 text-gold" />
              {disclaimer}
            </p>
          </article>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-border panel-gradient p-5">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Площадки по теме
              </p>
              <div className="mt-3 space-y-2">
                {related.map((site) => (
                  <Link
                    key={site!.id}
                    to={`/site/${site!.id}`}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:border-primary/40"
                  >
                    <img
                      src={site!.logo}
                      alt={site!.name}
                      width={32}
                      height={32}
                      loading="lazy"
                      className="h-8 w-8 rounded-lg object-contain"
                    />
                    <span className="text-[0.9rem] font-semibold">{site!.name}</span>
                    <span className="ml-auto flex items-center gap-1 text-[0.8rem] text-muted-foreground">
                      <Icon name="Star" size={13} className="fill-gold text-gold" />
                      {site!.rating.toFixed(2)}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border panel-gradient p-5">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Разделы каталога
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {relatedCats.map((cat) => (
                  <Link
                    key={cat!.id}
                    to={`/category/${cat!.id}`}
                    className="flex h-9 items-center gap-2 rounded-[10px] border border-border bg-card px-3 text-[0.78rem] font-semibold transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    <Icon name={cat!.icon} size={14} />
                    {cat!.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border panel-gradient p-5">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Другие материалы
              </p>
              <Link
                to="/blog"
                className="ghost-gradient mt-3 flex h-11 items-center justify-center rounded-xl border border-border px-4 text-[0.78rem] font-bold uppercase tracking-[0.08em] text-foreground"
              >
                Все статьи раздела
              </Link>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
      <ScrollTop />
    </div>
  );
};

export default ArticlePage;