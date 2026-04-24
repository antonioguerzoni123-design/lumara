'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  {
    num: '01 — Hair Tools',
    href: '/loja?categoria=cabelo',
    name: 'Aparelhos\nde cabelo',
    sub: 'Profissional, no conforto da sua casa',
    cta: 'Ver 5 produtos',
    tone: 'linear-gradient(170deg, #F3EFFE 0%, #E0D4F9 100%)',
    image: '/banners/cat-cabelo.png',
  },
  {
    num: '02 — Skin Care',
    href: '/loja?categoria=skincare',
    name: 'Skin\ncare',
    sub: 'Pele cuidada, rotina simples',
    cta: 'Ver 5 produtos',
    tone: 'linear-gradient(170deg, #FDF0F5 0%, #F9D8E8 100%)',
    image: '/banners/cat-skincare.png',
  },
  {
    num: '03 — Hair Care',
    href: '/loja?categoria=cuidados',
    name: 'Cuidados\ncom o cabelo',
    sub: 'Do banho à finalização',
    cta: 'Ver 4 produtos',
    tone: 'linear-gradient(170deg, #F3EFFE 0%, #FDF0F5 100%)',
    image: '/banners/cat-cuidados.png',
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-[88px] bg-lumara-offwhite">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10 gap-10"
        >
          <div>
            <h2
              className="text-[44px] leading-[1] tracking-[-0.03em] font-extrabold text-lumara-warm-black"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              Três{' '}
              <em className="not-italic text-lumara-accent-dark font-normal" style={{ fontFamily: 'var(--font-nunito)' }}>
                mundos
              </em>
              ,<br />um só cuidado.
            </h2>
            <p
              className="text-[15px] text-lumara-gray max-w-[380px] mt-2.5"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              Tudo o que precisa, organizado para encontrar rápido.
            </p>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={cat.href}
                className="group relative flex flex-col justify-end rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1"
                style={{ aspectRatio: '4/5' }}
                aria-label={cat.name.replace('\n', ' ')}
              >
                {/* Background image */}
                <img
                  src={cat.image}
                  alt={cat.name.replace('\n', ' ')}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-lumara-warm-black/80 via-lumara-warm-black/20 to-transparent" />

                {/* Content */}
                <div className="relative px-6 pb-7 pt-4">
                  <span
                    className="text-[11px] tracking-[0.14em] uppercase text-white/60 font-medium block mb-1.5"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {cat.num}
                  </span>
                  <h3
                    className="text-[28px] leading-[1.02] font-bold tracking-[-0.02em] text-white mb-1.5 whitespace-pre-line"
                    style={{ fontFamily: 'var(--font-nunito)' }}
                  >
                    {cat.name}
                  </h3>
                  <p
                    className="text-sm text-white/70 mb-4 leading-[1.4]"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {cat.sub}
                  </p>
                  <span
                    className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm group-hover:bg-lumara-gold text-white text-[13px] font-bold px-5 py-2.5 rounded-full transition-colors duration-200 border border-white/30"
                    style={{ fontFamily: 'var(--font-nunito)' }}
                  >
                    {cat.cta} <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
