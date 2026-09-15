import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Catalog from '@/components/Catalog';
import HowItWorks from '@/components/HowItWorks';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';
import SeoSchema from '@/components/SeoSchema';
import SeoText from '@/components/SeoText';
import { categories, sites } from '@/data/sites';

const SITE_URL = 'https://codecasecs.ru';

const Index = () => {
  const { categoryId } = useParams();

  useEffect(() => {
    const cat = categories.find((c) => c.id === categoryId);
    const count = cat
      ? sites.filter((s) => s.categories.includes(cat.id)).length
      : sites.length;

    const title = cat
      ? `${cat.label} CS2 — промокоды и бонусы ${new Date().getFullYear()} | CodeCase`
      : 'CodeCase — промокоды и бонусы сайтов с кейсами CS2';
    const description = cat
      ? `${cat.label} в CS2: ${count} проверенных сайтов с рабочими промокодами и бонусами. Коды обновляются каждый день.`
      : 'Каталог проверенных промокодов и бонусов сайтов по открытию кейсов CS2. Бесплатные кейсы, бонусы на депозит, апгрейдеры и рулетки — коды обновляются каждый день.';

    document.title = title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', description);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute('href', cat ? `${SITE_URL}/category/${cat.id}` : `${SITE_URL}/`);
  }, [categoryId]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <SeoSchema />
      <Header />
      <main className="pt-2">
        <Catalog />
        <HowItWorks />
        <Faq />
        <SeoText />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
