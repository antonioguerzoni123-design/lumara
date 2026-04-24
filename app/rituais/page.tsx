import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Newsletter from '@/components/sections/Newsletter';
import SectionLabel from '@/components/ui/SectionLabel';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Rituais — Lumara',
  description: 'Guias práticos para simplificar a tua rotina de beleza. Do cabelo à pele, aprende como cuidar de ti em poucos minutos por dia.',
};

const rituais = [
  {
    slug: 'ritual-da-manha',
    label: 'Cabelo',
    title: 'O ritual da manhã em 10 minutos',
    intro: 'Tens dez minutos antes de sair de casa. Usados bem, chegam para transformar o teu cabelo. Este guia mostra-te como estruturar a rotina matinal para que sejas sempre rápida — e o teu cabelo fique sempre bem.',
    steps: [
      {
        num: '01',
        title: 'Turbante de microfibra na saída do duche (1 min)',
        body: 'Troca a toalha convencional pelo turbante de microfibra imediatamente depois do duche. A absorção é 3× superior e, ao contrário da toalha, não cria atrito que quebra a cutícula. Enquanto te vestes, o turbante faz o trabalho.',
      },
      {
        num: '02',
        title: 'Aplica protetor térmico em cabelo levemente húmido (1 min)',
        body: 'Cabelo húmido ainda a 20–30% de humidade é o momento ideal para aplicar protetor térmico. Distribui em toda a extensão com um pente de dentes largos. Nunca apliques calor direto em cabelo molhado.',
      },
      {
        num: '03',
        title: 'Alisa ou modela com a escova sem fio (5–7 min)',
        body: 'A LumaGlide Pro chega à temperatura ideal em segundos. Passa do cabelo da raiz para as pontas em secções organizadas — primeiro os lados, depois a parte de cima. Não precisas de passar mais do que uma ou duas vezes por secção.',
      },
      {
        num: '04',
        title: 'Finaliza com uma gota de óleo de cabelo (30 seg)',
        body: 'Uma gota do óleo de alecrim nas palmas das mãos, esfregada e passada pelas pontas, sela a cutícula e dá brilho duradouro. Evita a raiz para não pesar o volume.',
      },
    ],
    tip: 'Se não tiveres tempo nem para os 10 minutos, prioriza o turbante e o óleo. O resto podes adaptar — mas começar sem atrito nunca é negociável.',
    products: [
      { name: 'LumaGlide Pro', slug: 'lumaglide-pro' },
      { name: 'Turbante de Microfibras', slug: 'turbante-microfibra' },
      { name: 'Eelhoe Rosemary Hair Oil', slug: 'rosemary-hair-oil' },
    ],
  },
  {
    slug: 'cabelo-pintado',
    label: 'Cuidados capilares',
    title: 'Como cuidar do cabelo pintado',
    intro: 'O cabelo pintado é estruturalmente mais poroso. Isso significa que perde humidade mais depressa, reage pior ao calor e pede atenção diferente do cabelo virgem. Estas regras simples garantem que a cor dura mais e o fio fica saudável.',
    steps: [
      {
        num: '01',
        title: 'Espera 48 horas para lavar após coloração',
        body: 'A cutícula precisa de tempo para se fechar depois da tintura. Se lavares demasiado cedo, a cor sai com a água antes de fixar completamente. Usa esses dois dias como desculpa para experimentar um turbante elegante.',
      },
      {
        num: '02',
        title: 'Dorme com touca de cetim',
        body: 'O algodão da fronha convencional absorve a humidade do cabelo e cria fricção que dilui a cor ao longo das noites. Uma touca de cetim ou uma fronha de seda eliminam esse problema de forma imediata. Começa esta noite.',
      },
      {
        num: '03',
        title: 'Reduz a temperatura do styling',
        body: 'Cabelo pintado tolera menos calor do que cabelo virgem. Se usas o ferro a 230°C no cabelo natural, experimenta 180–200°C no pintado. Os resultados são idênticos — a diferença é a integridade do fio ao longo do tempo.',
      },
      {
        num: '04',
        title: 'Aplica óleo de alecrim semanalmente',
        body: 'Uma aplicação semanal de óleo de alecrim no couro cabeludo mantém a microcirculação activa e compensa a tendência para queda capilar que muitas pessoas sentem após coloração. Deixa actuar 30 minutos antes de lavar.',
      },
      {
        num: '05',
        title: 'Usa turbante em vez de toalha',
        body: 'A toalha convencional cria fricção que parte os fios já enfraquecidos pela tintura. O turbante de microfibra absorve a água suavemente, preservando a cutícula e a cor ao mesmo tempo.',
      },
    ],
    tip: 'A cor não sai por um único erro — sai pela acumulação de pequenos hábitos errados. Muda um de cada vez e vais notar a diferença ao fim de duas semanas.',
    products: [
      { name: 'Touca de Cetim Lumara', slug: 'touca-cetim-lumara' },
      { name: 'Fronha de Seda Lumara', slug: 'fronha-seda-lumara' },
      { name: 'Turbante de Microfibras', slug: 'turbante-microfibra' },
      { name: 'Eelhoe Rosemary Hair Oil', slug: 'rosemary-hair-oil' },
    ],
  },
];

export default function RituaisPage() {
  return (
    <>
      <Navbar />
      <main className="bg-lumara-offwhite">

        {/* Hero */}
        <section className="bg-lumara-nude-light px-6 lg:px-10 py-20">
          <div className="max-w-7xl mx-auto">
            <SectionLabel>Guias práticos</SectionLabel>
            <h1
              className="text-5xl md:text-6xl font-black text-lumara-warm-black leading-[1.0] tracking-[-0.03em] mt-4 mb-4"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              Rituais
            </h1>
            <p
              className="text-[18px] text-lumara-gray max-w-[520px] leading-[1.6]"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              Guias curtos e práticos para simplificar a tua rotina de beleza e criar uma relação intencional com os teus produtos.
            </p>
          </div>
        </section>

        {/* Ritual list */}
        <section className="py-16 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto space-y-6">
            {rituais.map((ritual, i) => (
              <a
                key={ritual.slug}
                href={`#${ritual.slug}`}
                className="block group rounded-2xl border border-lumara-border bg-white hover:border-lumara-accent-dark transition-colors duration-200 p-8"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <span
                      className="text-[11px] tracking-[0.14em] uppercase font-semibold text-lumara-accent-dark block mb-2"
                      style={{ fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {ritual.label}
                    </span>
                    <h2
                      className="text-2xl font-extrabold text-lumara-warm-black tracking-[-0.02em]"
                      style={{ fontFamily: 'var(--font-nunito)' }}
                    >
                      {ritual.title}
                    </h2>
                    <p
                      className="text-[14px] text-lumara-gray mt-2 max-w-[520px] leading-[1.55]"
                      style={{ fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {ritual.intro}
                    </p>
                  </div>
                  <ArrowRight
                    size={20}
                    className="text-lumara-accent-dark flex-shrink-0 mt-1 group-hover:translate-x-1 transition-transform duration-200"
                  />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Ritual content */}
        {rituais.map((ritual) => (
          <article
            key={ritual.slug}
            id={ritual.slug}
            className="py-20 px-6 lg:px-10 border-t border-lumara-border"
          >
            <div className="max-w-3xl mx-auto">
              <SectionLabel>{ritual.label}</SectionLabel>
              <h2
                className="text-4xl md:text-5xl font-black text-lumara-warm-black leading-[1.05] tracking-[-0.03em] mt-4 mb-6"
                style={{ fontFamily: 'var(--font-nunito)' }}
              >
                {ritual.title}
              </h2>
              <p
                className="text-[17px] text-lumara-gray leading-[1.65] mb-12"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                {ritual.intro}
              </p>

              <div className="space-y-10">
                {ritual.steps.map((step) => (
                  <div key={step.num} className="flex gap-6">
                    <span
                      className="text-[11px] tracking-[0.14em] uppercase font-bold text-lumara-accent-dark flex-shrink-0 pt-1 w-7"
                      style={{ fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {step.num}
                    </span>
                    <div>
                      <h3
                        className="text-[18px] font-bold text-lumara-warm-black mb-2 tracking-[-0.01em]"
                        style={{ fontFamily: 'var(--font-nunito)' }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="text-[15px] text-lumara-gray leading-[1.65]"
                        style={{ fontFamily: 'var(--font-dm-sans)' }}
                      >
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tip */}
              <div className="mt-12 bg-lumara-nude-light border-l-4 border-lumara-gold rounded-r-xl px-6 py-5">
                <p
                  className="text-[14px] text-lumara-warm-black leading-[1.65] font-medium"
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  <strong className="font-bold">Nota:</strong> {ritual.tip}
                </p>
              </div>

              {/* Products */}
              <div className="mt-12">
                <p
                  className="text-[11px] tracking-[0.14em] uppercase font-semibold text-lumara-gray mb-4"
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  Produtos neste ritual
                </p>
                <div className="flex flex-wrap gap-3">
                  {ritual.products.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/produto/${p.slug}`}
                      className="inline-flex items-center gap-2 border border-lumara-border rounded-full px-4 py-2 text-[13px] font-semibold text-lumara-warm-black hover:border-lumara-accent-dark hover:text-lumara-accent-dark transition-colors duration-200"
                      style={{ fontFamily: 'var(--font-nunito)' }}
                    >
                      {p.name} <ArrowRight size={12} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}

        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
