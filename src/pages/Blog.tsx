import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollTop from '@/components/ScrollTop';
import { articles, blogIntro } from '@/data/articles';

const SITE_URL = 'https://codecasecs.ru';

const Blog = () => {
  useEffect(() => {
    document.title = 'Полезное о кейс-сайтах CS2 — инструкции и разборы | CodeCase';
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', blogIntro.description);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute('href', `${SITE_URL}/blog`);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Header />

      <main className="mx-auto w-full max-w-[1280px] px-4 pb-16 sm:px-5">
        <nav className="flex items-center gap-2 py-4 text-[0.78rem] text-muted-foreground">
          <Link to="/" className="transition-colors hover:text-foreground">
            Каталог
          </Link>
          <Icon name="ChevronRight" size={14} />
          <span className="text-foreground">Полезное</span>
        </nav>

        <section className="rounded-3xl border border-border panel-gradient p-5 sm:p-8">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-primary">
            Полезное
          </p>
          <h1 className="mt-2 text-[1.9rem] font-bold uppercase leading-[1.08] tracking-[-0.025em] sm:text-[2.3rem]">
            {blogIntro.title}
          </h1>
          <p className="mt-3 max-w-[760px] text-[1.02rem] text-muted-foreground">
            {blogIntro.description}
          </p>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {articles.map((article) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="flex flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
              >
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  Обновлено {article.updated}
                </span>
                <span className="mt-2 text-[1.15rem] font-bold leading-[1.2]">
                  {article.h1}
                </span>
                <span className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
                  {article.lead.slice(0, 140)}…
                </span>
                <span className="mt-4 flex items-center gap-2 text-[0.78rem] font-bold uppercase tracking-[0.08em] text-primary">
                  Читать
                  <Icon name="ArrowRight" size={14} />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 grid gap-5 border-t border-border pt-7 lg:grid-cols-2">
            <div>
              <h2 className="text-[1.3rem] font-bold uppercase leading-[1.15] tracking-[-0.02em]">
                О чём эти материалы
              </h2>
              {blogIntro.about.map((text) => (
                <p key={text} className="mt-3 leading-relaxed text-muted-foreground">
                  {text}
                </p>
              ))}
            </div>
            <div className="rounded-2xl border border-border bg-well p-5">
              <h2 className="text-[1.05rem] font-bold uppercase tracking-[-0.02em]">
                Как мы готовим статьи
              </h2>
              <ul className="mt-3 space-y-3">
                {blogIntro.principles.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-muted-foreground">
                    <Icon name="Check" size={16} className="mt-1 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollTop />
    </div>
  );
};

export default Blog;
