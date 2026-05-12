'use client';

import { motion } from 'framer-motion';

const items = [
  {
    label: 'Envio para Portugal',
    sub: 'Grátis acima de €40 · €3,99 abaixo',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-[24px] h-[24px] lg:w-[30px] lg:h-[30px] text-lumara-accent-dark flex-shrink-0">
        <path d="M3 9h13l4 4v5h-2M3 9v9h14M3 9l2-4h9l2 4M7 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm11 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      </svg>
    ),
  },
  {
    label: 'Produtos testados',
    sub: 'seleccionados com cuidado',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-[24px] h-[24px] lg:w-[30px] lg:h-[30px] text-lumara-accent-dark flex-shrink-0">
        <path d="M12 2a10 10 0 1 0 10 10" /><path d="m8 12 3 3 6-6" />
      </svg>
    ),
  },
  {
    label: 'Troca fácil',
    sub: '30 dias para devolver',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-[24px] h-[24px] lg:w-[30px] lg:h-[30px] text-lumara-accent-dark flex-shrink-0">
        <path d="M3 12h18M3 12a9 9 0 0 1 18 0M3 12a9 9 0 0 0 18 0M12 3v18" />
      </svg>
    ),
  },
  {
    label: 'Pagamento seguro',
    sub: 'Cartão · MB Way · PayPal e mais',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-[24px] h-[24px] lg:w-[30px] lg:h-[30px] text-lumara-accent-dark flex-shrink-0">
        <rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18" />
      </svg>
    ),
  },
];

export default function TrustRow() {
  return (
    <section className="border-t border-b border-lumara-border bg-lumara-offwhite">
      <div className="
        max-w-[1400px] mx-auto
        flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-2 px-5 py-2
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
        lg:grid lg:grid-cols-4 lg:overflow-visible lg:gap-0 lg:px-10 lg:py-0
      ">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="
              snap-start flex-shrink-0 w-[44vw] max-w-[180px]
              flex items-center gap-2.5 lg:gap-3.5
              py-2 px-2.5 lg:py-6 lg:px-5
              bg-white/60 lg:bg-transparent
              rounded-lg lg:rounded-none
              border border-lumara-border lg:border-0 lg:border-r last:lg:border-r-0
              lg:[&:nth-child(2)]:border-r
              lg:w-auto lg:max-w-none
            "
          >
            {item.icon}
            <div>
              <strong
                className="text-[12px] lg:text-[13px] font-semibold text-lumara-warm-black block leading-tight"
                style={{ fontFamily: 'var(--font-nunito)' }}
              >
                {item.label}
              </strong>
              <span
                className="text-[10px] lg:text-xs text-lumara-gray leading-tight"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                {item.sub}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
