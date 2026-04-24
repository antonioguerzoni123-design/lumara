'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { featuredProducts } from '@/lib/products';
import ProductCard from '@/components/ui/ProductCard';
import SectionLabel from '@/components/ui/SectionLabel';

export default function FeaturedProducts() {
  return (
    <section className="py-24 px-6 lg:px-10 bg-lumara-offwhite" aria-label="Produtos em destaque">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div className="space-y-3">
            <SectionLabel>A Nossa Escolha</SectionLabel>
            <h2
              className="text-4xl md:text-5xl text-lumara-warm-black"
              style={{
                fontFamily: 'var(--font-nunito)',
                fontWeight: 400,
                letterSpacing: '0.02em',
              }}
            >
              O que funciona,<br className="hidden md:block" /> de verdade.
            </h2>
          </div>
          <Link
            href="/loja"
            className="text-[11px] tracking-widest uppercase text-lumara-gray hover:text-lumara-gold underline-offset-4 hover:underline transition-all self-start md:self-end"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            Ver todos
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <Link
            href="/loja"
            className="inline-flex items-center border border-lumara-warm-black text-lumara-warm-black px-8 py-4 text-[11px] tracking-widest uppercase hover:bg-lumara-warm-black hover:text-lumara-offwhite transition-all duration-300"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            Ver Todos os Produtos
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
