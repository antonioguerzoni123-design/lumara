'use client';

import Link from 'next/link';
import { ArrowRight, Truck, ShieldCheck, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCustomer } from '@/hooks/useCustomer';

export default function Hero() {
  const { customer, isLoggedIn } = useCustomer();
  const firstName = customer?.firstName ?? '';

  return (
    <section className="bg-lumara-offwhite py-10 lg:py-[56px]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-[0.9fr_1.15fr] gap-10 lg:gap-[56px] items-center">

        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center lg:text-left"
        >
          {/* Greeting when logged in */}
          {isLoggedIn && firstName && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-lumara-accent-soft border border-lumara-accent-dark/20 rounded-full px-4 py-1.5 mb-4"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              <span className="text-[13px] text-lumara-accent-dark font-medium">
                Olá, <strong className="font-bold">{firstName}</strong> — bem-vinda de volta ✦
              </span>
            </motion.div>
          )}

          {/* Eyebrow */}
          <div
            className="hidden lg:flex items-center gap-2.5 text-lumara-accent-dark text-xs tracking-[0.14em] uppercase font-semibold mb-5"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            <span className="w-7 h-px bg-lumara-accent-dark block" />
            Novidade em Portugal · Primavera 2026
          </div>

          {/* Title */}
          <h1
            className="leading-[0.98] font-black tracking-[-0.02em] mb-4 lg:mb-6 text-lumara-warm-black"
            style={{
              fontFamily: 'var(--font-nunito)',
              fontSize: 'clamp(44px, 5.5vw, 76px)',
            }}
          >
            O teu ritual.
            <br />
            <em
              className="not-italic font-normal text-lumara-accent-dark"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              Simples assim
            </em>
            .
          </h1>

          {/* Sub */}
          <p
            className="text-[15px] lg:text-[17px] leading-[1.55] text-lumara-gray max-w-[440px] mx-auto lg:mx-0 mb-5"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            A primeira loja de beleza curada para Portugal. Equipamentos profissionais,
            skin care e cuidados capilares — seleccionados com intenção.
          </p>

          {/* First purchase discount banner */}
          <div
            className="hidden lg:inline-flex items-center gap-2.5 bg-lumara-nude-light border border-lumara-gold/30 rounded-full px-4 py-2 mb-7"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            <span className="w-2 h-2 rounded-full bg-lumara-gold block flex-shrink-0" />
            <span className="text-[13px] text-lumara-warm-black">
              <strong className="font-bold">10% de desconto</strong> na primeira compra · código{' '}
              <span className="font-bold text-lumara-accent-dark tracking-[0.05em]">LUMARA10</span>
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col lg:flex-row lg:flex-wrap gap-3 lg:gap-3.5 mb-6 lg:mb-14">
            <Link
              href="/loja"
              className="inline-flex items-center justify-center gap-2 bg-lumara-gold text-white px-7 py-3.5 rounded-full text-sm font-extrabold tracking-[0.02em] transition-all duration-200 hover:bg-lumara-accent-dark hover:-translate-y-px w-full lg:w-auto"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              Explorar coleção <ArrowRight size={16} />
            </Link>
            <Link
              href="/sobre-nos"
              className="hidden lg:inline-flex items-center bg-transparent text-lumara-warm-black border-[1.5px] border-lumara-warm-black px-7 py-3.5 rounded-full text-sm font-bold transition-all duration-200 hover:bg-lumara-warm-black hover:text-lumara-offwhite"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              Nossa filosofia
            </Link>
          </div>

          {/* Mobile trust row — premium, calma, não promocional */}
          <div
            className="lg:hidden flex items-center justify-center gap-3 text-[12px] text-lumara-gray mb-6"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            <span className="flex items-center gap-1.5">
              <Truck size={14} className="text-lumara-accent-dark" /> Envio rápido
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-lumara-accent-dark" /> Pagamentos seguros
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              4.8 <Star size={12} fill="#E0689F" stroke="#E0689F" />
            </span>
          </div>

          {/* Meta stats */}
          <div className="hidden lg:flex gap-10 pt-7 border-t border-lumara-border">
            {[
              { num: '14', lbl: 'produtos curados' },
              { num: 'Exclusivo', lbl: 'para Portugal' },
              { num: '5-10', lbl: 'dias úteis de entrega' },
            ].map((item) => (
              <div key={item.lbl}>
                <div
                  className="text-[26px] font-extrabold tracking-[-0.02em] text-lumara-warm-black"
                  style={{ fontFamily: 'var(--font-nunito)' }}
                >
                  {item.num}
                </div>
                <div
                  className="text-xs text-lumara-gray mt-0.5 tracking-[0.04em]"
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  {item.lbl}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="w-full max-w-[360px] mx-auto lg:max-w-none lg:mx-0"
        >
          <Link
            href="/produto/lumaglide-pro"
            className="relative block rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1"
            style={{
              aspectRatio: '1/1.05',
              background: 'linear-gradient(170deg, #F3EFFE 0%, #E0D4F9 100%)',
            }}
            aria-label="Ver LumaGlide Pro"
          >
            <img
              src="/banners/hero-lumaglide.png"
              alt="LumaGlide Pro"
              className="w-full h-full object-cover"
            />
            {/* Badge */}
            <div
              className="absolute left-5 bottom-5 bg-white/95 backdrop-blur-sm px-[18px] py-3.5 rounded-full flex items-center gap-2.5 text-sm font-semibold text-lumara-warm-black"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              <span className="w-2 h-2 rounded-full bg-lumara-gold block" />
              LumaGlide Pro · em destaque
            </div>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
