import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faq } from '@/data/sites';

const Faq = () => {
  return (
    <section id="faq" className="mx-auto w-full max-w-[1280px] px-4 pb-16 sm:px-5">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-primary">
            FAQ
          </p>
          <h2 className="mt-2 text-[1.9rem] font-bold uppercase leading-[1.08] tracking-[-0.025em] sm:text-[2.2rem]">
            Частые вопросы
          </h2>
          <p className="mt-3 text-muted-foreground">
            Коротко о том, как работают промокоды на сайтах с кейсами CS2 и почему код
            иногда не срабатывает.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faq.map((item, i) => (
            <AccordionItem
              key={item.q}
              value={`item-${i}`}
              className="mb-3 overflow-hidden rounded-2xl border border-border panel-gradient px-5"
            >
              <AccordionTrigger className="py-5 text-left text-[1.02rem] font-semibold hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[0.98rem] text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
