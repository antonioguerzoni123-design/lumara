'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/lib/products';
import ProductCard from '@/components/ui/ProductCard';

type Props = {
  id?: string;
  eyebrow: string;
  title: string;
  sub: string;
  products: Product[];
  seeAllLink: string;
  cols?: 4 | 5;
};

export default function ProductSection({
  id,
  eyebrow,
  title,
  sub,
  products,
  seeAllLink,
  cols = 5,
}: Props) {
  return (
    <section id={id} className="py-[88px] bg-lumara-offwhite">
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
            <div
              className="text-xs tracking-[0.14em] uppercase text-lumara-accent-dark font-semibold mb-2.5"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              {eyebrow}
            </div>
            <h2
              className="text-[44px] leading-[1] tracking-[-0.03em] font-extrabold text-lumara-warm-black"
              style={{ fontFamily: 'var(--font-nunito)' }}
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <p
              className="text-[15px] text-lumara-gray max-w-[380px] mt-2.5"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              {sub}
            </p>
          </div>
          <Link
            href={seeAllLink}
            className="text-sm font-semibold inline-flex items-center gap-1.5 pb-1 border-b-[1.5px] border-lumara-warm-black hover:border-lumara-accent-dark hover:text-lumara-accent-dark transition-all duration-200 whitespace-nowrap flex-shrink-0"
            style={{ fontFamily: 'var(--font-nunito)' }}
          >
            Ver tudo <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Grid (carousel on mobile, grid on sm+) */}
        <div
          className={`
            flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-3 pb-1
            -mx-6 px-6 lg:mx-0 lg:px-0
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
            sm:grid sm:overflow-visible sm:gap-5 sm:px-0 sm:mx-0
            ${cols === 5 ? 'sm:grid-cols-3 lg:grid-cols-5' : 'sm:grid-cols-2 lg:grid-cols-4'}
          `}
        >
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="snap-start flex-shrink-0 w-[46vw] max-w-[200px] sm:w-auto sm:max-w-none"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* Scroll dots indicator — apenas mobile */}
        <div className="flex gap-1 justify-center mt-4 sm:hidden" aria-hidden="true">
          {products.map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-lumara-pink-mid" />
          ))}
        </div>

      </div>
    </section>
  );
}
