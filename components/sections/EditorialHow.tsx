'use client';

import { motion } from 'framer-motion';

const principles = [
  { title: 'Simples', desc: 'Cheguei, encontrei, comprei.' },
  { title: 'Bonita', desc: 'Design que respira, produto que brilha.' },
  { title: 'Direta', desc: 'Sem filtros, sem promessas vazias.' },
];

export default function EditorialHow() {
  return (
    <section
      id="editorial"
      className="py-[72px] bg-lumara-accent-softer"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-15 lg:gap-[60px] items-center">

        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-[36px] lg:text-[52px] leading-[1] tracking-[-0.03em] font-extrabold text-lumara-warm-black mb-4 lg:mb-[18px]"
            style={{ fontFamily: 'var(--font-nunito)' }}
          >
            Bonita
            <br />
            por ser{' '}
            <em
              className="not-italic text-lumara-accent-dark font-normal"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              simples
            </em>
            .
          </h2>
          <p
            className="text-[16px] leading-[1.6] text-lumara-gray mb-6 max-w-[440px]"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            A Lumara é para a mulher que cuida de si mesma — e quer encontrar
            o que precisa sem ruído. Não somos farmácia, não somos salão. Somos
            prateleira limpa: produto no centro, caminho óbvio.
          </p>

          <div className="grid grid-cols-3 gap-2 lg:gap-4 mt-6 lg:mt-8">
            {principles.map((p) => (
              <div
                key={p.title}
                className="p-2.5 lg:p-[18px] bg-white/60 rounded-lg text-center lg:text-left"
              >
                <h4
                  className="text-[13px] lg:text-[17px] font-bold text-lumara-warm-black mb-0.5 lg:mb-1"
                  style={{ fontFamily: 'var(--font-nunito)' }}
                >
                  {p.title}
                </h4>
                <p
                  className="text-[11px] lg:text-[13px] text-lumara-gray leading-[1.35] lg:leading-[1.45]"
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="aspect-square rounded-lg overflow-hidden"
        >
          <img
            src="/banners/editorial-bonita.png"
            alt="O ritual de beleza — Lumara"
            className="w-full h-full object-cover"
          />
        </motion.div>

      </div>
    </section>
  );
}
