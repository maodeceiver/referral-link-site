import { useEffect } from 'react';
import { faq, sites } from '@/data/sites';

const SITE_URL = 'https://codecasecs.ru';

const buildSchema = () => {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Промокоды сайтов с кейсами CS2',
    numberOfItems: sites.length,
    itemListElement: sites.map((site, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: site.name,
        url: `${SITE_URL}/site/${site.id}`,
        image: `${SITE_URL}${site.logo}`,
        description: `${site.kind}: ${site.bonusHighlight} ${site.bonusRest}.`,
        brand: { '@type': 'Brand', name: site.name },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: site.rating.toFixed(2),
          bestRating: '5',
          worstRating: '1',
          ratingCount: site.reviews,
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'RUB',
          availability: 'https://schema.org/InStock',
          url: `${SITE_URL}/site/${site.id}`,
        },
      },
    })),
  };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CodeCase',
    url: `${SITE_URL}/`,
    inLanguage: 'ru-RU',
    description:
      'Каталог проверенных промокодов и бонусов сайтов по открытию кейсов CS2.',
  };

  return [itemList, faqPage, website];
};

const SeoSchema = () => {
  useEffect(() => {
    const nodes = buildSchema().map((schema) => {
      const el = document.createElement('script');
      el.type = 'application/ld+json';
      el.dataset.seoSchema = 'true';
      el.textContent = JSON.stringify(schema);
      document.head.appendChild(el);
      return el;
    });
    return () => nodes.forEach((el) => el.remove());
  }, []);

  return null;
};

export default SeoSchema;