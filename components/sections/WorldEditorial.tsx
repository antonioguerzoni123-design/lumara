'use client';

import { motion } from 'framer-motion';
import SectionLabel from '@/components/ui/SectionLabel';

const origins = [
  {
    city: 'Seul',
    detail: 'K-beauty, inovação em skincare, ingredientes clínicos',
  },
  {
    city: 'Paris',
    detail: 'Elegância funcional, minimalismo na rotina',
  },
  {
    city: 'Los Angeles',
    detail: 'Tecnologia capilar, styling sem compromisso',
  },
];

export default function WorldEditorial() {
  return (
    <section className="py-24 px-6 lg:px-10 bg-lumara-warm-black" aria-label="Do Mundo para a Tua Rotina">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16 space-y-4"
        >
          <SectionLabel light>Do Mundo para a Tua Rotina</SectionLabel>
          <h2
            className="text-4xl md:text-5xl text-lumara-offwhite"
            style={{
              fontFamily: 'var(--font-nunito)',
              fontWeight: 400,
              letterSpacing: '0.02em',
            }}
          >
            Fomos buscar o melhor<br />de cada lugar.
          </h2>
          <p
            className="text-lumara-gray text-sm leading-relaxed"
            style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 400 }}
          >
            A Lumara não tem fronteiras. Olhamos para Seul quando queremos inovação em skincare. Para Paris quando queremos elegância. Para Los Angeles quando o styling é a conversa. E trazemos isso tudo para a tua rotina diária.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-lumara-offwhite/10">
          {origins.map((origin, i) => (
            <motion.div
              key={origin.city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-lumara-warm-black p-10 space-y-4"
            >
              <p
                className="text-3xl text-lumara-offwhite"
                style={{ fontFamily: 'var(--font-nunito)', fontWeight: 400 }}
              >
                {origin.city}
              </p>
              <div className="w-8 h-px bg-lumara-gold" />
              <p
                className="text-xs text-lumara-gray leading-relaxed"
                style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 400 }}
              >
                {origin.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
