'use client';

import { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser, useClerk } from '@clerk/nextjs';
import { useCartStore } from '@/lib/cart';
import { driveImage } from '@/lib/products';

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, total, count } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const subtotal = total();
  const shipping = subtotal >= 40 || subtotal === 0 ? 0 : 3.99;
  const grandTotal = subtotal + shipping;
  const fmt = (n: number) => n.toFixed(2).replace('.', ',');

  const checkoutableItems = items.filter((item) => item.shopifyVariantId);
  const nonCheckoutableItems = items.filter((item) => !item.shopifyVariantId);

  const handleCheckout = async () => {
    if (!checkoutableItems.length) {
      setCheckoutError(
        nonCheckoutableItems.length
          ? `${nonCheckoutableItems.map((i) => i.name).join(', ')} ainda não ${nonCheckoutableItems.length === 1 ? 'está disponível' : 'estão disponíveis'} para compra online.`
          : 'Erro ao iniciar o checkout. Tenta novamente.'
      );
      return;
    }

    if (!isSignedIn) {
      openSignIn({ fallbackRedirectUrl: window.location.href });
      return;
    }

    setLoading(true);
    setCheckoutError(null);
    try {
      const res = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: checkoutableItems.map((item) => ({
            shopifyVariantId: item.shopifyVariantId!,
            quantity: item.quantity,
          })),
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setCheckoutError(data.error ?? 'Erro ao iniciar o checkout.');
        setLoading(false);
      }
    } catch {
      setCheckoutError('Erro de ligação. Tenta novamente.');
      setLoading(false);
    }
  };

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
            aria-label="Carrinho"
          >
            {/* Head */}
            <div className="flex items-center justify-between px-7 pt-6 pb-5 border-b border-lumara-border">
              <div>
                <span
                  className="text-[22px] font-bold tracking-[-0.02em] text-lumara-warm-black"
                  style={{ fontFamily: 'var(--font-nunito)' }}
                >
                  Carrinho
                </span>
                <span
                  className="text-[13px] text-lumara-gray font-medium ml-2"
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  ({count()})
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-lumara-bg2 flex items-center justify-center text-lumara-warm-black hover:bg-lumara-accent-soft transition-colors"
                aria-label="Fechar carrinho"
              >
                <X size={16} strokeWidth={1.8} />
              </button>
            </div>

            {/* Body */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-7 py-16">
                <div className="w-14 h-14 rounded-full bg-lumara-bg2 flex items-center justify-center text-lumara-gray mb-[18px]">
                  <ShoppingBag size={22} strokeWidth={1.6} />
                </div>
                <h3
                  className="text-xl font-bold text-lumara-warm-black mb-2"
                  style={{ fontFamily: 'var(--font-nunito)' }}
                >
                  Carrinho vazio
                </h3>
                <p
                  className="text-sm text-lumara-gray mb-5 max-w-[28ch]"
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  Os produtos que adicionar aparecem aqui.
                </p>
                <button
                  onClick={onClose}
                  className="bg-lumara-warm-black text-lumara-offwhite px-6 py-3 rounded-full text-sm font-bold"
                  style={{ fontFamily: 'var(--font-nunito)' }}
                >
                  Explorar loja
                </button>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto px-7 py-5 divide-y divide-lumara-border">
                  {items.map((item) => (
                    <li key={`${item.id}-${item.variant}`} className="grid grid-cols-[72px_1fr_auto] gap-4 py-4 items-start">
                      <div className="w-[72px] h-[72px] rounded-lg bg-lumara-bg2 overflow-hidden flex-shrink-0">
                        <img
                          src={driveImage(item.image)}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p
                          className="text-sm font-semibold text-lumara-warm-black truncate"
                          style={{ fontFamily: 'var(--font-nunito)' }}
                        >
                          {item.name}
                        </p>
                        {item.variant && (
                          <p className="text-xs text-lumara-gray mt-0.5" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                            {item.variant}
                          </p>
                        )}
                        {/* Qty */}
                        <div className="inline-flex items-center border border-lumara-border rounded-full overflow-hidden bg-white mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}
                            className="px-2.5 py-1 text-sm text-lumara-warm-black hover:bg-lumara-bg2 transition-colors"
                            aria-label="Diminuir"
                          >
                            <Minus size={12} />
                          </button>
                          <span
                            className="px-2 text-sm font-semibold text-lumara-warm-black"
                            style={{ fontFamily: 'var(--font-nunito)' }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                            className="px-2.5 py-1 text-sm text-lumara-warm-black hover:bg-lumara-bg2 transition-colors"
                            aria-label="Aumentar"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end gap-1.5">
                        <span
                          className="text-sm font-bold text-lumara-warm-black"
                          style={{ fontFamily: 'var(--font-nunito)' }}
                        >
                          €{fmt(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id, item.variant)}
                          className="text-xs text-lumara-gray underline hover:text-lumara-accent-dark transition-colors"
                          style={{ fontFamily: 'var(--font-dm-sans)' }}
                        >
                          Remover
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div className="border-t border-lumara-border px-7 pt-5 pb-6">
                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex justify-between text-sm text-lumara-gray" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                      <span>Subtotal</span><span>€{fmt(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-lumara-gray" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                      <span>Envio</span><span>{shipping === 0 ? 'Grátis' : `€${fmt(shipping)}`}</span>
                    </div>
                    {shipping > 0 && subtotal > 0 && (
                      <p className="text-[11px] text-lumara-accent-dark" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                        Faltam €{fmt(40 - subtotal)} para envio grátis
                      </p>
                    )}
                    <div
                      className="flex justify-between text-[17px] font-bold text-lumara-warm-black pt-2.5 border-t border-lumara-border"
                      style={{ fontFamily: 'var(--font-nunito)' }}
                    >
                      <span>Total</span><span>€{fmt(grandTotal)}</span>
                    </div>
                  </div>
                  {nonCheckoutableItems.length > 0 && !checkoutError && (
                    <p className="text-xs text-lumara-gray mb-2 text-center" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                      {nonCheckoutableItems.map((i) => i.name).join(', ')} ainda não {nonCheckoutableItems.length === 1 ? 'está disponível' : 'estão disponíveis'} para compra online.
                    </p>
                  )}
                  {checkoutError && (
                    <p className="text-xs text-red-500 mb-2 text-center" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                      {checkoutError}
                    </p>
                  )}
                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="flex w-full justify-center items-center gap-2 bg-lumara-warm-black text-lumara-offwhite py-3.5 rounded-full text-sm font-bold tracking-[0.02em] hover:bg-lumara-accent-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'var(--font-nunito)' }}
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : null}
                    {loading ? 'A processar...' : 'Finalizar compra'}
                  </button>
                  <button
                    onClick={onClose}
                    className="flex w-full justify-center mt-2.5 bg-transparent text-lumara-warm-black border-[1.5px] border-lumara-warm-black py-3.5 rounded-full text-sm font-bold hover:bg-lumara-warm-black hover:text-lumara-offwhite transition-colors"
                    style={{ fontFamily: 'var(--font-nunito)' }}
                  >
                    Continuar a ver
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
