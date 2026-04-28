'use client';

import { useState } from 'react';
import { X, ChevronRight, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCustomer } from '@/hooks/useCustomer';

type Props = { open: boolean; onClose: () => void };

const links = [
  { label: 'As minhas encomendas', href: '/conta/encomendas' },
  { label: 'Moradas & envio', href: '/conta/moradas' },
  { label: 'Favoritos guardados', href: '/conta/favoritos' },
  { label: 'Preferências', href: '/conta/preferencias' },
  { label: 'Apoio ao cliente', href: '/conta/apoio' },
];

export default function ProfileDrawer({ open, onClose }: Props) {
  const { customer, isLoggedIn, isLoading } = useCustomer();
  const [nameInput, setNameInput] = useState('');
  const [savingName, setSavingName] = useState(false);
  const [nameSaved, setNameSaved] = useState(false);

  const firstName = customer?.firstName ?? '';
  const lastName = customer?.lastName ?? '';
  const name = [firstName, lastName].filter(Boolean).join(' ') || 'Cliente';
  const email = customer?.emailAddress?.emailAddress ?? '';
  const initial = isLoggedIn ? (firstName || name).charAt(0).toUpperCase() : '✦';
  const needsName = isLoggedIn && !firstName && !nameSaved;

  async function handleSaveName(e: React.FormEvent) {
    e.preventDefault();
    if (!nameInput.trim()) return;
    setSavingName(true);
    try {
      await fetch('/api/account/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: nameInput.trim() }),
      });
      setNameSaved(true);
    } finally {
      setSavingName(false);
    }
  }

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
            aria-label="Conta"
          >
            {/* Head */}
            <div className="flex items-center justify-between px-7 pt-6 pb-5 border-b border-lumara-border">
              <span className="text-[22px] font-bold tracking-[-0.02em] text-lumara-warm-black" style={{ fontFamily: 'var(--font-nunito)' }}>Conta</span>
              <button onClick={onClose} className="w-9 h-9 rounded-full bg-lumara-bg2 flex items-center justify-center hover:bg-lumara-accent-soft transition-colors" aria-label="Fechar">
                <X size={16} strokeWidth={1.8} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-7 py-5">
              {/* Profile hero */}
              <div className="flex items-center gap-3.5 pb-5 border-b border-lumara-border mb-5">
                <div className="w-[52px] h-[52px] rounded-full bg-lumara-accent-soft text-lumara-accent-dark flex items-center justify-center text-lg font-bold" style={{ fontFamily: 'var(--font-nunito)' }}>
                  {initial}
                </div>
                <div>
                  {isLoading ? (
                    <p className="text-[17px] font-bold text-lumara-warm-black" style={{ fontFamily: 'var(--font-nunito)' }}>A carregar…</p>
                  ) : isLoggedIn ? (
                    <>
                      <p className="text-[17px] font-bold text-lumara-warm-black" style={{ fontFamily: 'var(--font-nunito)' }}>
                        {nameSaved && nameInput ? `Olá, ${nameInput} ✦` : firstName ? `Olá, ${firstName} ✦` : 'Bem-vinda ✦'}
                      </p>
                      {email && <p className="text-sm text-lumara-gray" style={{ fontFamily: 'var(--font-dm-sans)' }}>{email}</p>}
                    </>
                  ) : (
                    <>
                      <p className="text-[17px] font-bold text-lumara-warm-black" style={{ fontFamily: 'var(--font-nunito)' }}>Bem-vinda à Lumara ✦</p>
                      <p className="text-sm text-lumara-gray" style={{ fontFamily: 'var(--font-dm-sans)' }}>Inicia sessão para ver as tuas encomendas</p>
                    </>
                  )}
                </div>
              </div>

              {/* Ask for name after first login */}
              {needsName && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 bg-lumara-accent-soft border border-lumara-accent-dark/20 rounded-2xl p-5"
                >
                  <p className="text-sm font-semibold text-lumara-warm-black mb-1" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Como te chamamos? ✦
                  </p>
                  <p className="text-xs text-lumara-gray mb-3" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                    Personaliza a tua experiência Lumara.
                  </p>
                  <form onSubmit={handleSaveName} className="flex gap-2">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="O teu nome"
                      className="flex-1 text-sm px-3 py-2 rounded-xl border border-lumara-border bg-white focus:outline-none focus:border-lumara-accent-dark"
                      style={{ fontFamily: 'var(--font-dm-sans)' }}
                      autoFocus
                    />
                    <button
                      type="submit"
                      disabled={savingName || !nameInput.trim()}
                      className="text-sm font-bold px-4 py-2 rounded-xl bg-lumara-accent-dark text-white disabled:opacity-50 transition-opacity"
                      style={{ fontFamily: 'var(--font-nunito)' }}
                    >
                      {savingName ? '…' : 'Guardar'}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Links — always visible */}
              <ul className="divide-y divide-lumara-border">
                {links.map((link) => (
                  <li key={link.label}>
                    {isLoggedIn ? (
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="flex items-center justify-between py-3.5 text-sm text-lumara-warm-black hover:text-lumara-accent-dark transition-colors"
                        style={{ fontFamily: 'var(--font-dm-sans)' }}
                      >
                        <span>{link.label}</span>
                        <ChevronRight size={14} className="text-lumara-gray" />
                      </Link>
                    ) : (
                      <a
                        href="/api/auth/shopify"
                        className="flex items-center justify-between py-3.5 text-sm text-lumara-gray hover:text-lumara-accent-dark transition-colors"
                        style={{ fontFamily: 'var(--font-dm-sans)' }}
                        title="Inicia sessão para aceder"
                      >
                        <span>{link.label}</span>
                        <Lock size={13} className="text-lumara-gray/60" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="px-7 pb-6 pt-4 border-t border-lumara-border">
              {isLoggedIn ? (
                <a
                  href="/api/auth/logout"
                  className="flex w-full justify-center bg-transparent text-lumara-warm-black border-[1.5px] border-lumara-warm-black py-3.5 rounded-full text-sm font-bold hover:bg-red-50 hover:border-red-400 hover:text-red-600 transition-colors"
                  style={{ fontFamily: 'var(--font-nunito)' }}
                >
                  Terminar sessão
                </a>
              ) : (
                <a
                  href="/api/auth/shopify"
                  className="flex w-full justify-center bg-transparent text-lumara-warm-black border-[1.5px] border-lumara-warm-black py-3.5 rounded-full text-sm font-bold hover:bg-lumara-warm-black hover:text-lumara-offwhite transition-colors"
                  style={{ fontFamily: 'var(--font-nunito)' }}
                >
                  Iniciar sessão
                </a>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
