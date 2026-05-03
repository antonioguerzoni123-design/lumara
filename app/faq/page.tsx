'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Newsletter from '@/components/sections/Newsletter';
import SectionLabel from '@/components/ui/SectionLabel';

const faqs = [
  {
    category: 'Envios & Entregas',
    items: [
      {
        q: 'Quanto tempo demora a entrega em Portugal?',
        a: 'Os envios para Portugal continental demoram 5 a 10 dias úteis com rastreamento incluído. Para as ilhas (Açores e Madeira) pode demorar 7 a 14 dias úteis.',
      },
      {
        q: 'O envio tem rastreamento?',
        a: 'Sim. Todos os envios incluem número de rastreamento enviado por email após expedição.',
      },
      {
        q: 'Qual é o valor mínimo para envio grátis?',
        a: 'Envio gratuito em todas as encomendas iguais ou superiores a €40 para Portugal. Abaixo de €40 é cobrada uma taxa de envio de €3,99, independentemente da localização.',
      },
      {
        q: 'Enviam para outros países?',
        a: 'De momento focamo-nos em Portugal. Se tens interesse noutro país, contacta-nos e avaliamos a situação.',
      },
    ],
  },
  {
    category: 'Devoluções & Garantias',
    items: [
      {
        q: 'Qual é a política de devoluções?',
        a: 'Podes devolver qualquer produto nos primeiros 30 dias após recepção, desde que esteja em condições originais com embalagem intacta. Para iniciar uma devolução, contacta-nos por email.',
      },
      {
        q: 'Os produtos têm garantia?',
        a: 'Todos os aparelhos electrónicos têm 2 anos de garantia legal. Para produtos de beleza e cuidados, seguimos as recomendações do fabricante.',
      },
      {
        q: 'E se o produto chegar danificado?',
        a: 'Contacta-nos imediatamente com fotografias do produto e da embalagem. Resolvemos sem custos para ti.',
      },
    ],
  },
  {
    category: 'Pagamentos',
    items: [
      {
        q: 'Que métodos de pagamento aceitam?',
        a: 'Aceitamos MB Way, Multibanco, cartão de crédito/débito (Visa, Mastercard) e PayPal.',
      },
      {
        q: 'Como uso o código de desconto de 10%?',
        a: 'Usa o código LUMARA10 no checkout antes de finalizar a compra. O desconto é aplicado automaticamente. Válido para a primeira compra.',
      },
      {
        q: 'O pagamento é seguro?',
        a: 'Sim. Todos os pagamentos são processados com encriptação SSL e nunca armazenamos dados do cartão.',
      },
    ],
  },
  {
    category: 'Produtos',
    items: [
      {
        q: 'Os aparelhos funcionam com a corrente em Portugal (220V)?',
        a: 'Sim. Todos os aparelhos têm voltagem dual (100V–240V) e funcionam em Portugal sem adaptador.',
      },
      {
        q: 'Posso usar os aparelhos no avião?',
        a: 'Os aparelhos sem fios (LumaGlide Pro e Mini) cumprem os regulamentos IATA para bagagem de mão com bateria de lítio.',
      },
      {
        q: 'Os produtos de skin care são adequados para pele sensível?',
        a: 'A maioria dos nossos produtos é formulada para todos os tipos de pele. Cada produto tem indicações específicas na sua página. Em caso de dúvida, faz sempre patch test.',
      },
      {
        q: 'Existe stock limitado?',
        a: 'Sim, dado o nosso modelo de curadoria o stock pode ser limitado. Recomendamos que não esperes demasiado se tens interesse num produto.',
      },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-lumara-border last:border-b-0">
      <button
        className="w-full text-left py-5 flex items-start justify-between gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span
          className="text-[15px] font-semibold text-lumara-warm-black leading-[1.4]"
          style={{ fontFamily: 'var(--font-nunito)' }}
        >
          {q}
        </span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 text-lumara-accent-dark transition-transform duration-200 mt-0.5 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p
              className="text-[14px] text-lumara-gray leading-[1.65] pb-5 max-w-[640px]"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main className="bg-lumara-offwhite">
        <section className="bg-lumara-nude-light py-20 px-6 lg:px-10">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl"
            >
              <SectionLabel>Ajuda</SectionLabel>
              <h1
                className="text-[52px] leading-[0.98] font-black tracking-[-0.03em] text-lumara-warm-black mt-4 mb-4"
                style={{ fontFamily: 'var(--font-nunito)' }}
              >
                Perguntas{' '}
                <em className="not-italic text-lumara-accent-dark font-normal">
                  frequentes
                </em>
                .
              </h1>
              <p
                className="text-[16px] text-lumara-gray leading-[1.6]"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                Tudo o que precisas de saber sobre envios, devoluções, produtos e pagamentos.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-[88px] px-6 lg:px-10">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
            {/* Sidebar */}
            <div className="hidden lg:block">
              <nav className="sticky top-24 space-y-1">
                {faqs.map((cat) => (
                  <a
                    key={cat.category}
                    href={`#${cat.category.replace(/\s/g, '-').toLowerCase()}`}
                    className="block text-[13px] text-lumara-gray hover:text-lumara-warm-black transition-colors py-1.5"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {cat.category}
                  </a>
                ))}
              </nav>
            </div>

            {/* FAQ content */}
            <div className="space-y-14">
              {faqs.map((cat, i) => (
                <motion.div
                  key={cat.category}
                  id={cat.category.replace(/\s/g, '-').toLowerCase()}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <h2
                    className="text-[11px] tracking-[0.16em] uppercase text-lumara-accent-dark font-semibold mb-6"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {cat.category}
                  </h2>
                  <div>
                    {cat.items.map((item) => (
                      <FaqItem key={item.q} q={item.q} a={item.a} />
                    ))}
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
