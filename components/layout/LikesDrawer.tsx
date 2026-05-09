'use client';

import { X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { products } from '@/lib/products';
import { useLikesStore } from '@/lib/likes';
import { useCartStore } from '@/lib/cart';

type Props = { open: boolean; onClose: () => void };

export default function LikesDrawer({ open, onClose }: Props) {
  const { likes, toggleLike } = useLikesStore();
  const addItem = useCartStore((s) => s.addItem);

  const likedProducts = products.filter((p) => likes.includes(p.id));

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(26,26,46,0.35)', backdropFilter: 'blur(3px)' }}
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.22, 0.9, 0.35, 1] }}
            className="fixed right-0 top-0 h-full w-full max-w-[440px] bg-lumara-offwhite z-50 flex flex-col"
            style={{ boxShadow: '-20px 0 60px rgba(26,26,46,0.12)' }}
            role="dialog"
            aria-modal="true"
            aria-label="Favoritos"
          >
            {/* Head */}
            <div className="flex items-center justify-between px-7 pt-6 pb-5 border-b border-lumara-border">
              <div>
                <span className="text-[22px] font-bold tracking-[-0.02em] text-lumara-warm-black" style={{ fontFamily: 'var(--font-nunito)' }}>Favoritos</span>
                <span className="text-[13px] text-lumara-gray font-medium ml-2" style={{ fontFamily: 'var(--font-dm-sans)' }}>({likedProducts.length})</span>
              </div>
              <button onClick={onClose} className="w-9 h-9 rounded-full bg-lumara-bg2 flex items-center justify-center hover:bg-lumara-accent-soft transition-colors" aria-label="Fechar">
                <X size={16} strokeWidth={1.8} />
              </button>
            </div>

            {/* Body */}
            {likedProducts.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-7 py-16">
                <div className="w-14 h-14 rounded-full bg-lumara-bg2 flex items-center justify-center text-lumara-gray mb-[18px]">
                  <Heart size={22} strokeWidth={1.6} />
                </div>
                <h3 className="text-xl font-bold text-lumara-warm-black mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>Sem favoritos ainda</h3>
                <p className="text-sm text-lumara-gray mb-5 max-w-[28ch]" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                  Guarda produtos que gostas para encontrar depois.
                </p>
                <button onClick={onClose} className="bg-lumara-warm-black text-lumara-offwhite px-6 py-3 rounded-full text-sm font-bold" style={{ fontFamily: 'var(--font-nunito)' }}>
                  Explorar loja
                </button>
              </div>
            ) : (
              <ul className="flex-1 overflow-y-auto px-7 py-5 divide-y divide-lumara-border">
                {likedProducts.map((p) => (
                  <li key={p.id} className="grid grid-cols-[72px_1fr_auto] gap-4 py-4 items-start">
                    <Link href={`/produto/${p.slug}`} onClick={onClose} className="w-[72px] h-[72px] rounded-lg bg-lumara-bg2 overflow-hidden block">
                      <img src={p.images[0]} alt={p.name} loading="lazy" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder-product.svg'; }} />
                    </Link>
                    <div className="min-w-0">
                      <Link href={`/produto/${p.slug}`} onClick={onClose}>
                        <p className="text-sm font-semibold text-lumara-warm-black truncate hover:text-lumara-accent-dark transition-colors" style={{ fontFamily: 'var(--font-nunito)' }}>{p.name}</p>
                      </Link>
                      <p className="text-xs text-lumara-gray mt-0.5 mb-2" style={{ fontFamily: 'var(--font-dm-sans)' }}>{p.hook}</p>
                      <button
                        onClick={() => { addItem({ id: p.id, slug: p.slug, name: p.name, price: p.price, image: p.images[0] }); onClose(); }}
                        className="text-xs font-semibold text-lumara-accent-dark underline underline-offset-2 hover:text-lumara-warm-black transition-colors"
                        style={{ fontFamily: 'var(--font-nunito)' }}
                      >
                        + Adicionar ao carrinho
                      </button>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="text-sm font-bold text-lumara-warm-black" style={{ fontFamily: 'var(--font-nunito)' }}>€{p.price.toFixed(2).replace('.', ',')}</span>
                      <button onClick={() => toggleLike(p.id)} className="text-xs text-lumara-gray underline hover:text-lumara-accent-dark transition-colors" style={{ fontFamily: 'var(--font-dm-sans)' }}>Remover</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
