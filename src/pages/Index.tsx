import Header from '@/components/Header';
import Catalog from '@/components/Catalog';
import HowItWorks from '@/components/HowItWorks';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';
import SeoSchema from '@/components/SeoSchema';

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <SeoSchema />
      <Header />
      <main className="pt-2">
        <Catalog />
        <HowItWorks />
        <Faq />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
