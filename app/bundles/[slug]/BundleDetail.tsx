'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronDown, Package, RefreshCw, ShieldCheck, Truck } from 'lucide-react';
import Link from 'next/link';
import { Bundle } from '@/data/bundles';
import { useCartStore } from '@/lib/cart';
import type { Product } from '@/lib/products';

type Props = {
  bundle: Bundle;
  products: Product[];
};

export default function BundleDetail({ bundle, products }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const fmt = (n: number) => n.toFixed(2).replace('.', ',');

  const handleAddAll = () => {
    products.forEach((product) => {
      addItem({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.images[0] ?? '',
        shopifyVariantId: product._defaultVariantId ?? undefined,
      });
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="bg-lumara-offwhite min-h-screen">

      {/* Hero */}
      <section className="py-12 px-6 lg:px-10" style={{ background: bundle.tone }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-start">

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-[52%] rounded-2xl overflow-hidden flex-shrink-0"
            >
              <img
                src={bundle.image}
                alt={bundle.name}
                className="w-full h-auto object-cover"
              />
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex-1 pt-2"
            >
              <div
                className="text-xs tracking-[0.14em] uppercase font-semibold mb-2"
                style={{ color: bundle.accent, fontFamily: 'var(--font-dm-sans)' }}
              >
                Bundle Deal · {bundle.subtitle}
              </div>

              {bundle.featured && (
                <span
                  className="inline-block mb-3 px-3 py-1 rounded-full text-[11px] font-bold text-white tracking-[0.06em]"
                  style={{ background: bundle.accent, fontFamily: 'var(--font-nunito)' }}
                >
                  ★ {bundle.badge}
                </span>
              )}

              <h1
                className="text-[38px] lg:text-[44px] font-black leading-[1.05] tracking-[-0.03em] text-lumara-warm-black mb-5"
                style={{ fontFamily: 'var(--font-nunito)' }}
              >
                {bundle.headline}
              </h1>

              {/* Main benefits */}
              <ul className="flex flex-col gap-2.5 mb-7">
                {bundle.mainBenefits.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 text-[14px] text-lumara-warm-black"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: bundle.accent }}
                    >
                      <Check size={11} strokeWidth={2.5} className="text-white" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 mb-2">
                <span
                  className="text-[42px] font-black tracking-[-0.02em] text-lumara-warm-black"
                  style={{ fontFamily: 'var(--font-nunito)' }}
                >
                  €{fmt(bundle.bundlePrice)}
                </span>
                <span
                  className="text-[18px] text-lumara-gray line-through"
                  style={{ fontFamily: 'var(--font-nunito)' }}
                >
                  €{fmt(bundle.originalTotal)}
                </span>
                <span
                  className="text-[13px] font-bold px-2.5 py-1 rounded-full text-white"
                  style={{ background: bundle.accent, fontFamily: 'var(--font-nunito)' }}
                >
                  -{bundle.savingsPercent}%
                </span>
              </div>
              <p
                className="text-xs text-lumara-gray mb-7"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                Poupas €{fmt(bundle.savings)} comprando este bundle · Envio gratuito acima de €40
              </p>

              <button
                onClick={handleAddAll}
                className="w-full py-4 rounded-full text-white font-bold text-[15px] transition-all duration-200 hover:opacity-90 hover:-translate-y-px active:scale-[0.98] mb-3"
                style={{ background: bundle.accent, fontFamily: 'var(--font-nunito)' }}
              >
                {added ? '✓ Adicionado ao carrinho' : `Adicionar Bundle ao Carrinho — €${fmt(bundle.bundlePrice)}`}
              </button>

              <p
                className="text-xs text-lumara-gray text-center"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                Teste de 30 dias sem risco · Envio com rastreamento · Devolução gratuita
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hook + Description */}
      <section className="py-[72px] px-6 lg:px-10 border-b border-lumara-border">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div
              className="text-xs tracking-[0.14em] uppercase font-semibold mb-4"
              style={{ color: bundle.accent, fontFamily: 'var(--font-dm-sans)' }}
            >
              Porquê este bundle
            </div>
            <blockquote
              className="text-[22px] font-semibold leading-[1.4] text-lumara-warm-black mb-0"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              "{bundle.hookEmotional}"
            </blockquote>
          </div>
          <div>
            {bundle.description.split('\n').map((para, i) => (
              <p
                key={i}
                className="text-[15px] text-lumara-gray leading-[1.7] mb-4 last:mb-0"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Included items */}
      <section className="py-[72px] px-6 lg:px-10 bg-lumara-nude-light border-b border-lumara-border">
        <div className="max-w-[1400px] mx-auto">
          <div
            className="text-xs tracking-[0.14em] uppercase font-semibold mb-2"
            style={{ color: bundle.accent, fontFamily: 'var(--font-dm-sans)' }}
          >
            O que está incluído
          </div>
          <h2
            className="text-[36px] font-extrabold tracking-[-0.02em] text-lumara-warm-black mb-10"
            style={{ fontFamily: 'var(--font-nunito)' }}
          >
            {bundle.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bundle.items.map((item) => {
              const product = products.find((p) => p.slug === item.slug);
              return (
                <div
                  key={item.slug}
                  className="bg-white rounded-2xl p-6 border border-lumara-border"
                >
                  {product?.images?.[0] && (
                    <div className="h-40 rounded-xl overflow-hidden mb-5 bg-lumara-nude-light">
                      <img
                        src={product.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <h3
                    className="text-[16px] font-bold text-lumara-warm-black mb-3"
                    style={{ fontFamily: 'var(--font-nunito)' }}
                  >
                    {item.name}
                  </h3>
                  <ul className="flex flex-col gap-1.5">
                    {item.includedItems.map((inc) => (
                      <li
                        key={inc}
                        className="flex items-start gap-2 text-[12px] text-lumara-gray"
                        style={{ fontFamily: 'var(--font-dm-sans)' }}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: bundle.accent }}
                        >
                          <Check size={8} strokeWidth={2.5} className="text-white" />
                        </span>
                        {inc}
                      </li>
                    ))}
                  </ul>
                  {product && (
                    <Link
                      href={`/produto/${item.slug}`}
                      className="inline-block mt-4 text-[11px] font-semibold tracking-[0.06em]"
                      style={{ color: bundle.accent, fontFamily: 'var(--font-dm-sans)' }}
                    >
                      Ver produto →
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {bundle.detailsNote && (
            <p
              className="mt-6 text-[12px] text-lumara-gray leading-[1.6]"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              {bundle.detailsNote}
            </p>
          )}
        </div>
      </section>

      {/* Secondary benefits */}
      <section className="py-[72px] px-6 lg:px-10 border-b border-lumara-border">
        <div className="max-w-[1400px] mx-auto">
          <div
            className="text-xs tracking-[0.14em] uppercase font-semibold mb-2"
            style={{ color: bundle.accent, fontFamily: 'var(--font-dm-sans)' }}
          >
            Benefícios detalhados
          </div>
          <h2
            className="text-[36px] font-extrabold tracking-[-0.02em] text-lumara-warm-black mb-10"
            style={{ fontFamily: 'var(--font-nunito)' }}
          >
            Porquê funciona.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bundle.secondaryBenefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-lumara-border"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center mb-4"
                  style={{ background: bundle.accent }}
                >
                  <Check size={14} strokeWidth={2.5} className="text-white" />
                </div>
                <h3
                  className="text-[15px] font-bold text-lumara-warm-black mb-2"
                  style={{ fontFamily: 'var(--font-nunito)' }}
                >
                  {b.title}
                </h3>
                <p
                  className="text-[13px] text-lumara-gray leading-[1.6]"
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  {b.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        className="py-[72px] px-6 lg:px-10 border-b border-lumara-border"
        style={{ background: bundle.tone }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div
            className="text-xs tracking-[0.14em] uppercase font-semibold mb-2"
            style={{ color: bundle.accent, fontFamily: 'var(--font-dm-sans)' }}
          >
            Resultados comprovados
          </div>
          <h2
            className="text-[36px] font-extrabold tracking-[-0.02em] text-lumara-warm-black mb-10"
            style={{ fontFamily: 'var(--font-nunito)' }}
          >
            Números que falam.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bundle.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-7 border border-lumara-border"
              >
                <div
                  className="text-[56px] font-black leading-none tracking-[-0.03em] mb-3"
                  style={{ color: bundle.accent, fontFamily: 'var(--font-nunito)' }}
                >
                  {stat.percent}%
                </div>
                <p
                  className="text-[13px] text-lumara-gray leading-[1.6]"
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  {stat.claim}
                </p>
              </motion.div>
            ))}
          </div>
          <p
            className="mt-6 text-[11px] text-lumara-gray/70"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            *{bundle.statsDisclaimer}
          </p>
        </div>
      </section>

      {/* Secondary headline + paragraph */}
      <section className="py-[72px] px-6 lg:px-10 border-b border-lumara-border">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2
              className="text-[36px] font-extrabold tracking-[-0.02em] text-lumara-warm-black leading-[1.1]"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              {bundle.headlineSecondary}
            </h2>
          </div>
          <div>
            {bundle.paragraphSecondary.split('\n').map((para, i) => (
              <p
                key={i}
                className="text-[15px] text-lumara-gray leading-[1.7] mb-4 last:mb-0"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[72px] px-6 lg:px-10 bg-lumara-nude-light border-b border-lumara-border">
        <div className="max-w-[900px] mx-auto">
          <div
            className="text-xs tracking-[0.14em] uppercase font-semibold mb-2"
            style={{ color: bundle.accent, fontFamily: 'var(--font-dm-sans)' }}
          >
            Perguntas frequentes
          </div>
          <h2
            className="text-[36px] font-extrabold tracking-[-0.02em] text-lumara-warm-black mb-10"
            style={{ fontFamily: 'var(--font-nunito)' }}
          >
            Tens dúvidas?
          </h2>

          <div className="flex flex-col gap-3">
            {bundle.faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-lumara-border overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span
                    className="text-[14px] font-semibold text-lumara-warm-black"
                    style={{ fontFamily: 'var(--font-nunito)' }}
                  >
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={16}
                    className="flex-shrink-0 text-lumara-gray transition-transform duration-200"
                    style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none' }}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p
                      className="text-[13px] text-lumara-gray leading-[1.65]"
                      style={{ fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping + Guarantee */}
      <section className="py-[72px] px-6 lg:px-10 border-b border-lumara-border">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-lumara-border">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
              style={{ background: bundle.accent + '20' }}
            >
              <Truck size={20} style={{ color: bundle.accent }} />
            </div>
            <h3
              className="text-[15px] font-bold text-lumara-warm-black mb-2"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              Envios & Entregas
            </h3>
            <p
              className="text-[13px] text-lumara-gray leading-[1.6]"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              Envio gratuito em encomendas acima de €40. Abaixo de €40, taxa de €3,99. Prazo: 2-10 dias úteis com rastreamento incluído.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-lumara-border">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
              style={{ background: bundle.accent + '20' }}
            >
              <RefreshCw size={20} style={{ color: bundle.accent }} />
            </div>
            <h3
              className="text-[15px] font-bold text-lumara-warm-black mb-2"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              Devoluções em 30 dias
            </h3>
            <p
              className="text-[13px] text-lumara-gray leading-[1.6]"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              Devoluções gratuitas em 30 dias para crédito na loja. Para reembolso no método de pagamento original, é cobrada uma pequena taxa de envio. Produtos em condição original com etiquetas intactas.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-lumara-border">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
              style={{ background: bundle.accent + '20' }}
            >
              <ShieldCheck size={20} style={{ color: bundle.accent }} />
            </div>
            <h3
              className="text-[15px] font-bold text-lumara-warm-black mb-2"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              Garantia de 30 dias
            </h3>
            <p
              className="text-[13px] text-lumara-gray leading-[1.6]"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              Plena confiança nos nossos produtos. Teste de 30 dias sem risco — experimenta e, se não ficares completamente satisfeita, devolvemos sem perguntas. Apoio ao cliente: seg–sex 8h–20h30.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-[72px] px-6 lg:px-10" style={{ background: bundle.tone }}>
        <div className="max-w-[600px] mx-auto text-center">
          <h2
            className="text-[36px] font-black tracking-[-0.03em] text-lumara-warm-black mb-3"
            style={{ fontFamily: 'var(--font-nunito)' }}
          >
            {bundle.name}
          </h2>
          <p
            className="text-[15px] text-lumara-gray mb-8"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            €{fmt(bundle.bundlePrice)} · Poupas €{fmt(bundle.savings)} · Envio rastreado
          </p>
          <button
            onClick={handleAddAll}
            className="px-10 py-4 rounded-full text-white font-bold text-[15px] transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
            style={{ background: bundle.accent, fontFamily: 'var(--font-nunito)' }}
          >
            {added ? '✓ Adicionado ao carrinho' : 'Adicionar ao Carrinho'}
          </button>
          <p
            className="mt-4 text-xs text-lumara-gray"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            Teste de 30 dias sem risco · Apoio ao cliente seg–sex 8h–20h30
          </p>
        </div>
      </section>
    </div>
  );
}
