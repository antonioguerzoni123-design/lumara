'use client';

import { motion } from 'framer-motion';

export default function ManifestoStrip() {
  const pillars = ['Testado', 'Investigado', 'Escolhido'];

  return (
    <section className="bg-lumara-warm-black py-16 px-6 lg:px-10" aria-label="Manifesto">
      <div className="max-w-7xl mx-auto text-center space-y-10">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl lg:text-4xl text-lumara-offwhite italic"
          style={{
            fontFamily: 'var(--font-nunito)',
            fontWeight: 400,
            letterSpacing: '0.02em',
          }}
        >
          "Os melhores produtos não gritam. Revelam-se."
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-6 md:gap-10"
        >
          {pillars.map((pillar, i) => (
            <span key={pillar}>
              <span
                className="text-lumara-gold text-[11px] tracking-[0.15em] uppercase"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                {pillar}
              </span>
              {i < pillars.length - 1 && (
                <span className="ml-6 md:ml-10 text-lumara-gray/40">·</span>
              )}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
