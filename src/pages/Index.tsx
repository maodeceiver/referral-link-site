import Header from '@/components/Header';
import Catalog from '@/components/Catalog';
import HowItWorks from '@/components/HowItWorks';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
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
