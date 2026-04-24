'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionLabel from '@/components/ui/SectionLabel';
import Newsletter from '@/components/sections/Newsletter';

const manifesto = [
  {
    quote:
      'Em Portugal, sempre fomos exigentes com o que entra em casa. Sabemos o que queremos — e sabemos quando algo vale mesmo o que custa. A Lumara nasceu dessa exigência.',
  },
  {
    quote:
      'Não vendemos tendências. Vendemos resultados. Cada produto que entra no nosso catálogo foi testado, investigado e escolhido com um critério único: funciona, faz sentido, e merece um lugar na tua rotina.',
  },
  {
    quote:
      'A simplicidade é a nossa filosofia. Não precisas de 30 produtos — precisas dos certos. É por isso que a Lumara tem menos de 15 produtos: porque cada um tem um motivo claro para estar aqui.',
  },
  {
    quote:
      'Acreditamos que cuidar de ti não deve ser complicado. O ritual de beleza ideal não é o mais extenso — é o mais teu.',
  },
];

const values = [
  {
    title: 'Curadoria',
    text: 'Nunca mais de 14 produtos em simultâneo. Cada um passou por uma selecção rigorosa antes de chegar até ti.',
  },
  {
    title: 'Transparência',
    text: 'Dizemos o que funciona, como funciona, e porquê. Sem promessas vazias, sem ingredientes escondidos.',
  },
  {
    title: 'Intenção',
    text: 'Cada compra deve ser uma decisão consciente, não um impulso. Existimos para facilitar a escolha certa.',
  },
];

const portugal = [
  {
    num: '01',
    title: 'Enviamos para todo Portugal',
    text: 'Entregas em Portugal Continental e Ilhas, com rastreamento incluído em cada encomenda.',
  },
  {
    num: '02',
    title: 'Suporte em português',
    text: 'A nossa equipa responde em português, de segunda a sexta, das 9h às 20h.',
  },
  {
    num: '03',
    title: 'Pagamentos locais',
    text: 'MB Way, Multibanco, cartão de crédito — os métodos que usas no dia a dia.',
  },
  {
    num: '04',
    title: 'Novidade em Portugal',
    text: 'Trazemos produtos de beleza que ainda não existiam cá. Somos a primeira loja com esta curadoria em Portugal.',
  },
];

export default function SobreNosPage() {
  return (
    <>
      <Navbar />
      <main className="bg-lumara-offwhite">

        {/* Hero */}
        <section className="min-h-[60vh] flex items-center bg-lumara-nude-light px-6 lg:px-10 py-24">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <SectionLabel>A nossa filosofia</SectionLabel>
              <h1
                className="text-5xl md:text-7xl font-bold text-lumara-warm-black leading-[1.0] tracking-[-0.03em]"
                style={{ fontFamily: 'var(--font-nunito)' }}
              >
                Beleza com<br />
                <em className="not-italic text-lumara-accent-dark">intenção</em>.
              </h1>
              <p
                className="text-[18px] text-lumara-gray max-w-[520px] leading-[1.6]"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                A Lumara é a primeira loja de beleza curada especialmente para Portugal.
                Não trazemos tudo — trazemos o que funciona.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="hidden lg:block rounded-2xl overflow-hidden"
            >
              <img
                src="/banners/sobre-nos-banner.png"
                alt="A nossa filosofia — Lumara"
                className="w-full h-full object-cover"
                style={{ aspectRatio: '1/1', maxHeight: '520px' }}
              />
            </motion.div>
          </div>
        </section>

        {/* Manifesto */}
        <section className="py-24 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mx-auto space-y-14">
              {manifesto.map((block, i) => (
                <motion.blockquote
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative pl-8 border-l-2 border-lumara-gold"
                >
                  <p
                    className="text-xl md:text-2xl text-lumara-warm-black leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-nunito)',
                      fontWeight: 400,
                      letterSpacing: '0.01em',
                    }}
                  >
                    "{block.quote}"
                  </p>
                </motion.blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 px-6 lg:px-10 bg-lumara-nude-light">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-3 mb-16"
            >
              <SectionLabel>O que nos define</SectionLabel>
              <h2
                className="text-4xl font-bold text-lumara-warm-black tracking-[-0.02em]"
                style={{ fontFamily: 'var(--font-nunito)' }}
              >
                Três palavras.<br />Uma marca.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((val, i) => (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="space-y-4"
                >
                  <div className="w-8 h-px bg-lumara-gold" />
                  <p
                    className="text-xl font-bold text-lumara-warm-black tracking-[-0.01em]"
                    style={{ fontFamily: 'var(--font-nunito)' }}
                  >
                    {val.title}
                  </p>
                  <p
                    className="text-sm text-lumara-gray leading-relaxed"
                    style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 400 }}
                  >
                    {val.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portugal section */}
        <section className="py-24 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-14"
            >
              <SectionLabel>Feito para Portugal</SectionLabel>
              <h2
                className="text-4xl font-bold text-lumara-warm-black tracking-[-0.02em] mt-3"
                style={{ fontFamily: 'var(--font-nunito)' }}
              >
                A primeira loja de beleza curada{' '}
                <em className="not-italic text-lumara-accent-dark font-normal">
                  para Portugal
                </em>
                .
              </h2>
              <p
                className="text-[15px] text-lumara-gray max-w-[500px] mt-3 leading-[1.6]"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                Existimos para trazer o que ainda não existia cá. Produtos globais,
                serviço local. Porque mereces o melhor — sem barreiras.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {portugal.map((item, i) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-lumara-nude-light rounded-xl p-6 border border-lumara-border"
                >
                  <span
                    className="text-[11px] tracking-[0.14em] uppercase text-lumara-accent-dark font-semibold block mb-3"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {item.num}
                  </span>
                  <p
                    className="text-[16px] font-bold text-lumara-warm-black mb-2 leading-[1.3]"
                    style={{ fontFamily: 'var(--font-nunito)' }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="text-[13px] text-lumara-gray leading-[1.55]"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {item.text}
                  </p>
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
