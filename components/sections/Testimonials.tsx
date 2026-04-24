'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Mariana F.',
    location: 'Lisboa',
    rating: 5,
    product: 'LumaGlide Pro',
    text: 'Comprei com algum ceticismo, mas desde o primeiro dia que não consigo imaginar a minha manhã sem ela. Cabelo perfeito em 5 minutos — literalmente.',
  },
  {
    name: 'Sofia R.',
    location: 'Porto',
    rating: 5,
    product: 'Máscara Bio-Colagénio',
    text: 'Uso às sextas-feiras antes de dormir e acordo sábado com a pele que gostava de ter todos os dias. A diferença é real e imediata.',
  },
  {
    name: 'Catarina M.',
    location: 'Braga',
    rating: 5,
    product: 'Touca de Cetim Lumara',
    text: 'Finalmente encontrei uma touca que fica presa a noite toda. O cabelo de manhã está definido como à noite — poupei tanto produto!',
  },
  {
    name: 'Ana L.',
    location: 'Faro',
    rating: 5,
    product: 'Essência de Mucina de Caracol',
    text: 'Em duas semanas a diferença na hidratação e textura da pele é enorme. Tornei-me completamente viciada. O ritual da noite mudou por completo.',
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={12}
          fill={i <= count ? '#E0689F' : 'none'}
          stroke={i <= count ? '#E0689F' : '#D1D5DB'}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-[88px] bg-lumara-nude-light">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div
            className="text-xs tracking-[0.14em] uppercase text-lumara-accent-dark font-semibold mb-2.5"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            Clientes Lumara
          </div>
          <h2
            className="text-[44px] leading-[1] tracking-[-0.03em] font-extrabold text-lumara-warm-black"
            style={{ fontFamily: 'var(--font-nunito)' }}
          >
            O que dizem{' '}
            <em className="not-italic text-lumara-accent-dark font-normal" style={{ fontFamily: 'var(--font-nunito)' }}>
              as nossas
            </em>
            <br />clientes.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white rounded-xl p-6 flex flex-col gap-4 border border-lumara-border"
            >
              <Stars count={t.rating} />
              <p
                className="text-[14px] text-lumara-warm-black leading-[1.6] flex-1"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                "{t.text}"
              </p>
              <div className="border-t border-lumara-border pt-4">
                <p
                  className="text-[13px] font-bold text-lumara-warm-black"
                  style={{ fontFamily: 'var(--font-nunito)' }}
                >
                  {t.name}
                </p>
                <p
                  className="text-[11px] text-lumara-gray"
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  {t.location} · {t.product}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
