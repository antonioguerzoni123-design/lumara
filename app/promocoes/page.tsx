'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Tag, Package, Sparkles } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Newsletter from '@/components/sections/Newsletter';

import { bundles as bundleData } from '@/data/bundles';

const bundles = bundleData.map((b) => ({
  id: b.id,
  name: b.name,
  subtitle: b.subtitle,
  description: b.hookEmotional,
  items: b.items.map((i) => i.name),
  originalTotal: b.originalTotal,
  bundlePrice: b.bundlePrice,
  savings: b.savings,
  savingsPercent: b.savingsPercent,
  badge: b.badge,
  featured: b.featured,
  tone: b.tone,
  accent: b.accent,
  image: b.image,
}));

const promos = [
  {
    icon: <Tag size={22} />,
    title: '10% na primeira compra',
    description: 'Desconto automático aplicado no checkout para novos clientes.',
    code: 'LUMARA10',
  },
  {
    icon: <Package size={22} />,
    title: 'Envio para Portugal',
    description: 'Grátis em encomendas acima de €40. Taxa de €3,99 abaixo de €40. Rastreamento incluído.',
    code: null,
  },
  {
    icon: <Sparkles size={22} />,
    title: 'Devolução em 30 dias',
    description: 'Experimenta sem risco. Se não ficares satisfeita, devolvemos sem perguntas.',
    code: null,
  },
];

export default function PromocoesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-lumara-offwhite">

        {/* Hero */}
        <section className="bg-lumara-nude-light py-20 px-6 lg:px-10">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl"
            >
              <div
                className="flex items-center gap-2.5 text-lumara-accent-dark text-xs tracking-[0.14em] uppercase font-semibold mb-5"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                <span className="w-7 h-px bg-lumara-accent-dark block" />
                Promoções de abertura · Lumara Portugal
              </div>
              <h1
                className="text-[52px] leading-[0.98] font-black tracking-[-0.03em] text-lumara-warm-black mb-5"
                style={{ fontFamily: 'var(--font-nunito)' }}
              >
                Ofertas de{' '}
                <em className="not-italic text-lumara-accent-dark font-normal">
                  abertura
                </em>
                .
              </h1>
              <p
                className="text-[17px] text-lumara-gray max-w-[480px] leading-[1.55]"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                Celebramos a chegada da Lumara a Portugal com preços de lançamento
                e bundles exclusivos. Aproveita enquanto dura.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Promo pills */}
        <section className="py-10 px-6 lg:px-10 border-b border-lumara-border">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
            {promos.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-4 bg-white rounded-xl p-5 border border-lumara-border"
              >
                <div className="w-10 h-10 rounded-full bg-lumara-nude-light flex items-center justify-center text-lumara-accent-dark flex-shrink-0">
                  {p.icon}
                </div>
                <div>
                  <p
                    className="text-sm font-bold text-lumara-warm-black mb-1"
                    style={{ fontFamily: 'var(--font-nunito)' }}
                  >
                    {p.title}
                  </p>
                  <p
                    className="text-xs text-lumara-gray leading-[1.5]"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {p.description}
                  </p>
                  {p.code && (
                    <span
                      className="inline-block mt-2 px-3 py-1 bg-lumara-nude-light rounded-full text-[11px] font-bold tracking-[0.08em] text-lumara-accent-dark border border-lumara-accent-dark/20"
                      style={{ fontFamily: 'var(--font-nunito)' }}
                    >
                      {p.code}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Bundle Deals */}
        <section className="py-[88px] px-6 lg:px-10">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div
                className="text-xs tracking-[0.14em] uppercase text-lumara-accent-dark font-semibold mb-2.5"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                Bundle Deals · Poupança garantida
              </div>
              <h2
                className="text-[44px] leading-[1] tracking-[-0.03em] font-extrabold text-lumara-warm-black"
                style={{ fontFamily: 'var(--font-nunito)' }}
              >
                Juntos{' '}
                <em className="not-italic text-lumara-accent-dark font-normal">
                  poupas mais
                </em>
                .
              </h2>
              <p
                className="text-[15px] text-lumara-gray max-w-[440px] mt-2.5"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                Combinámos os produtos que funcionam melhor em conjunto para te oferecer o melhor preço.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bundles.map((bundle, i) => (
                <motion.div
                  key={bundle.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`relative rounded-2xl overflow-hidden border border-lumara-border ${bundle.featured ? 'ring-2 ring-lumara-accent-dark' : ''}`}
                  style={{ background: bundle.tone }}
                >
                  {/* Bundle image */}
                  <div className="relative aspect-[16/7] overflow-hidden">
                    <img
                      src={bundle.image}
                      alt={bundle.name}
                      className="w-full h-full object-cover"
                    />
                    {bundle.featured && (
                      <div
                        className="absolute top-4 right-4 bg-lumara-accent-dark text-white text-[11px] font-bold tracking-[0.06em] px-3 py-1.5 rounded-full"
                        style={{ fontFamily: 'var(--font-nunito)' }}
                      >
                        ★ {bundle.badge}
                      </div>
                    )}
                    {!bundle.featured && (
                      <div
                        className="absolute top-4 right-4 text-white text-[11px] font-bold tracking-[0.06em] px-3 py-1.5 rounded-full"
                        style={{ background: bundle.accent, fontFamily: 'var(--font-nunito)' }}
                      >
                        {bundle.badge}
                      </div>
                    )}
                  </div>

                  <div className="p-7 lg:p-9">
                    <span
                      className="text-[11px] tracking-[0.14em] uppercase font-semibold mb-2 block"
                      style={{ color: bundle.accent, fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {bundle.subtitle}
                    </span>
                    <h3
                      className="text-[28px] font-extrabold tracking-[-0.02em] text-lumara-warm-black mb-3"
                      style={{ fontFamily: 'var(--font-nunito)' }}
                    >
                      {bundle.name}
                    </h3>
                    <p
                      className="text-[14px] text-lumara-gray leading-[1.55] mb-5 max-w-[440px]"
                      style={{ fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {bundle.description}
                    </p>

                    {/* Items list */}
                    <ul className="flex flex-col gap-2 mb-7">
                      {bundle.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2.5 text-[13px] text-lumara-warm-black font-medium"
                          style={{ fontFamily: 'var(--font-dm-sans)' }}
                        >
                          <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: bundle.accent }}>
                            <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Pricing */}
                    <div className="flex items-end justify-between gap-4 flex-wrap">
                      <div>
                        <div className="flex items-baseline gap-2.5">
                          <span
                            className="text-[32px] font-black tracking-[-0.02em] text-lumara-warm-black"
                            style={{ fontFamily: 'var(--font-nunito)' }}
                          >
                            €{bundle.bundlePrice.toFixed(2).replace('.', ',')}
                          </span>
                          <span
                            className="text-[16px] text-lumara-gray line-through"
                            style={{ fontFamily: 'var(--font-nunito)' }}
                          >
                            €{bundle.originalTotal.toFixed(2).replace('.', ',')}
                          </span>
                          <span
                            className="text-[13px] font-bold px-2.5 py-1 rounded-full text-white"
                            style={{ background: bundle.accent, fontFamily: 'var(--font-nunito)' }}
                          >
                            -{bundle.savingsPercent}%
                          </span>
                        </div>
                        <p
                          className="text-xs text-lumara-gray mt-1"
                          style={{ fontFamily: 'var(--font-dm-sans)' }}
                        >
                          Poupas €{bundle.savings.toFixed(2).replace('.', ',')} neste bundle
                        </p>
                      </div>

                      <Link
                        href={`/bundles/${bundle.id}`}
                        className="inline-flex items-center gap-2 text-white text-[13px] font-bold px-6 py-3 rounded-full transition-all duration-200 hover:-translate-y-px"
                        style={{ background: bundle.accent, fontFamily: 'var(--font-nunito)' }}
                      >
                        Ver bundle <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
