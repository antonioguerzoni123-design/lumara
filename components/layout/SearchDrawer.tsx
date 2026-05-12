'use client';

import { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { products } from '@/lib/products';

type Props = { open: boolean; onClose: () => void };

const chips = ['Alisadora', 'Óleo de alecrim', 'Sérum PDRN', 'Máscara colagénio', 'Secador', 'Fronha de seda'];

export default function SearchDrawer({ open, onClose }: Props) {
  const [q, setQ] = useState('');

  useEffect(() => { if (!open) setQ(''); }, [open]);

  const tokens = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const results = tokens.length
    ? products.filter((p) => {
        const synonyms =
          p.category === 'cabelo'
            ? 'alisador alisadora secador escova prancha placa cabelo styling'
            : p.category === 'skincare'
            ? 'pele rosto skincare máscara mascara sérum serum essência essencia'
            : 'cuidados touca seda cetim óleo oleo capilar';
        const haystack = [
          p.name,
          p.hook,
          p.headline,
          p.description,
          p.category,
          ...(p.benefits ?? []),
          ...(p.includedItems ?? []),
          ...(p.variants ?? []),
          synonyms,
        ]
          .join(' ')
          .toLowerCase();
        return tokens.every((t) => haystack.includes(t));
      })
    : [];

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
            aria-label="Pesquisar"
          >
            {/* Head */}
            <div className="flex items-center justify-between px-7 pt-6 pb-5 border-b border-lumara-border">
              <span className="text-[22px] font-bold tracking-[-0.02em] text-lumara-warm-black" style={{ fontFamily: 'var(--font-nunito)' }}>
                Pesquisar
              </span>
              <button onClick={onClose} className="w-9 h-9 rounded-full bg-lumara-bg2 flex items-center justify-center hover:bg-lumara-accent-soft transition-colors" aria-label="Fechar">
                <X size={16} strokeWidth={1.8} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-7 py-5">
              {/* Input */}
              <div className="flex items-center gap-2.5 bg-lumara-bg2 rounded-full px-5 py-3 mb-5">
                <Search size={18} strokeWidth={1.6} className="text-lumara-gray flex-shrink-0" />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Procurar produtos…"
                  className="flex-1 border-none outline-none bg-transparent text-sm text-lumara-warm-black placeholder:text-lumara-gray"
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                />
                {q && (
                  <button onClick={() => setQ('')} className="text-lumara-gray hover:text-lumara-warm-black">
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Results or suggestions */}
              {q.trim() ? (
                <>
                  <p className="text-[11px] tracking-[0.14em] uppercase text-lumara-gray font-semibold mb-3" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Resultados ({results.length})
                  </p>
                  {results.length === 0 ? (
                    <p className="text-sm text-lumara-gray py-4" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                      Nenhum resultado para &ldquo;{q}&rdquo;.
                    </p>
                  ) : results.map((p) => (
                    <Link
                      key={p.id}
                      href={`/produto/${p.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-3.5 py-3 border-b border-lumara-border last:border-b-0 hover:text-lumara-accent-dark transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-lumara-bg2 overflow-hidden flex-shrink-0">
                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold truncate" style={{ fontFamily: 'var(--font-nunito)' }}>{p.name}</div>
                        <div className="text-xs text-lumara-gray truncate" style={{ fontFamily: 'var(--font-dm-sans)' }}>{p.hook}</div>
                      </div>
                      <span className="text-sm font-bold flex-shrink-0" style={{ fontFamily: 'var(--font-nunito)' }}>€{p.price.toFixed(2).replace('.', ',')}</span>
                    </Link>
                  ))}
                </>
              ) : (
                <>
                  <p className="text-[11px] tracking-[0.14em] uppercase text-lumara-gray font-semibold mb-3" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Procuras populares
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {chips.map((c) => (
                      <button
                        key={c}
                        onClick={() => setQ(c)}
                        className="px-3.5 py-2 rounded-full bg-lumara-bg2 text-sm text-lumara-warm-black hover:bg-lumara-accent-soft transition-colors"
                        style={{ fontFamily: 'var(--font-dm-sans)' }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
