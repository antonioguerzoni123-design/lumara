import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import TrustRow from '@/components/sections/TrustRow';
import CategoryGrid from '@/components/sections/CategoryGrid';
import ProductSection from '@/components/sections/ProductSection';
import EditorialHow from '@/components/sections/EditorialHow';
import Testimonials from '@/components/sections/Testimonials';
import Newsletter from '@/components/sections/Newsletter';
import { products } from '@/lib/products';

const aparelhos = products.filter((p) => p.category === 'cabelo');
const skincare = products.filter((p) => p.category === 'skincare');
const cuidados = products.filter((p) => p.category === 'cuidados');

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustRow />
        <CategoryGrid />
        <EditorialHow />
        <ProductSection
          id="aparelhos"
          eyebrow="01 — Aparelhos de cabelo"
          title='Profissional,<br/>no <em style="font-style:italic;font-weight:400;color:#8B6BE0">conforto</em> da sua casa.'
          sub="Escovas, chapinhas e secadores para elevar o seu ritual."
          products={aparelhos}
          seeAllLink="/loja?categoria=cabelo"
          cols={5}
        />
        <ProductSection
          id="skincare"
          eyebrow="02 — Skin care"
          title='Pele <em style="font-style:italic;font-weight:400;color:#8B6BE0">cuidada</em>,<br/>rotina simples.'
          sub="Fórmulas focadas, resultados reais. Sem promessas vazias."
          products={skincare}
          seeAllLink="/loja?categoria=skincare"
          cols={5}
        />
        <ProductSection
          id="cuidados"
          eyebrow="03 — Cuidados com o cabelo"
          title='Do <em style="font-style:italic;font-weight:400;color:#8B6BE0">banho</em><br/>à finalização.'
          sub="Tudo para tratar, proteger e manter o brilho do cabelo."
          products={cuidados}
          seeAllLink="/loja?categoria=cuidados"
          cols={4}
        />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
