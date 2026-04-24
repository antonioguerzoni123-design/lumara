'use client';

import { motion } from 'framer-motion';

const items = [
  {
    label: 'Envio para Portugal',
    sub: '5 a 10 dias úteis com rastreamento',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-[30px] h-[30px] text-lumara-accent-dark flex-shrink-0">
        <path d="M3 9h13l4 4v5h-2M3 9v9h14M3 9l2-4h9l2 4M7 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm11 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      </svg>
    ),
  },
  {
    label: 'Produtos testados',
    sub: 'seleccionados com cuidado',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-[30px] h-[30px] text-lumara-accent-dark flex-shrink-0">
        <path d="M12 2a10 10 0 1 0 10 10" /><path d="m8 12 3 3 6-6" />
      </svg>
    ),
  },
  {
    label: 'Troca fácil',
    sub: '30 dias para devolver',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-[30px] h-[30px] text-lumara-accent-dark flex-shrink-0">
        <path d="M3 12h18M3 12a9 9 0 0 1 18 0M3 12a9 9 0 0 0 18 0M12 3v18" />
      </svg>
    ),
  },
  {
    label: 'Pagamento seguro',
    sub: 'MB Way · Multibanco · cartão',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-[30px] h-[30px] text-lumara-accent-dark flex-shrink-0">
        <rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18" />
      </svg>
    ),
  },
];

export default function TrustRow() {
  return (
    <section className="border-t border-b border-lumara-border bg-lumara-offwhite">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 px-6 lg:px-10">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="flex items-center gap-3.5 py-6 px-5 border-r border-lumara-border last:border-r-0 [&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r"
          >
            {item.icon}
            <div>
              <strong
                className="text-[13px] font-semibold text-lumara-warm-black block"
                style={{ fontFamily: 'var(--font-nunito)' }}
              >
                {item.label}
              </strong>
              <span
                className="text-xs text-lumara-gray"
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
