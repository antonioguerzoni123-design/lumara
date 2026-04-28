'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { ShoppingBag, Search, Heart, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/lib/cart';
import { useLikesStore } from '@/lib/likes';
import CartDrawer from './CartDrawer';
import SearchDrawer from './SearchDrawer';
import LikesDrawer from './LikesDrawer';
import ProfileDrawer from './ProfileDrawer';

const leftLinks: { href: string; label: string; accent?: boolean }[] = [
  { href: '/', label: 'Início' },
  { href: '/loja?categoria=cabelo', label: 'Aparelhos' },
  { href: '/loja?categoria=skincare', label: 'Skin care' },
  { href: '/loja?categoria=cuidados', label: 'Cuidados capilares' },
  { href: '/promocoes', label: 'Promoções', accent: true },
];

const rightLinks: { href: string; label: string; accent?: boolean }[] = [
  { href: '/rituais', label: 'Rituais' },
  { href: '/sobre-nos', label: 'Sobre Nós' },
];

const navLinks = [...leftLinks, ...rightLinks];

function LumaraLogo() {
  return (
    <span className="flex items-baseline gap-0.5">
      <span
        className="text-[24px] font-black tracking-[-0.5px] text-lumara-warm-black leading-none"
        style={{ fontFamily: 'var(--font-nunito)' }}
      >
        lumara
      </span>
      <span
        className="text-[10px] leading-none"
        style={{ color: '#E0689F', verticalAlign: 'super', lineHeight: 1 }}
      >
        ●
      </span>
    </span>
  );
}

type Drawer = 'cart' | 'search' | 'likes' | 'profile' | null;

export default function Navbar() {
  const [drawer, setDrawer] = useState<Drawer>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const count = useCartStore((s) => s.count);
  const likesCount = useLikesStore((s) => s.likes.length);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (searchParams.get('conta') === 'aberta') {
      setDrawer('profile');
      router.replace('/', { scroll: false });
    }
  }, [searchParams, router]);

  const close = () => setDrawer(null);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-lumara-warm-black text-lumara-offwhite text-[12px] tracking-[0.08em] uppercase py-2.5 text-center font-medium" style={{ fontFamily: 'var(--font-dm-sans)' }}>
        ✦ Frete grátis acima de €40 · Entrega em 5-10 dias úteis · 10% off primeira compra: LUMARA10 ✦
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-30 bg-[rgba(250,248,251,0.95)] backdrop-blur-[10px] border-b border-lumara-border">
        <div className="max-w-[1400px] mx-auto grid grid-cols-[1fr_auto_1fr] items-center px-6 lg:px-10 py-3 gap-6">

          {/* Left links */}
          <div className="hidden lg:flex gap-6 items-center">
            {leftLinks.map((link) => (
              <Link key={link.href + link.label} href={link.href}
                className={`text-sm font-medium transition-colors whitespace-nowrap ${link.accent ? 'text-lumara-gold hover:text-lumara-accent-dark' : 'text-lumara-warm-black hover:text-lumara-accent-dark'}`}
                style={{ fontFamily: 'var(--font-dm-sans)' }}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu trigger */}
          <button className="lg:hidden text-lumara-warm-black" onClick={() => setMobileOpen(true)} aria-label="Abrir menu">
            <Menu size={22} strokeWidth={1.6} />
          </button>

          {/* Center logo */}
          <Link href="/" aria-label="Lumara — Início" className="flex items-center justify-center">
            <LumaraLogo />
          </Link>

          {/* Right: secondary links + icons */}
          <div className="flex gap-4 lg:gap-5 justify-end items-center">
            {rightLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className="hidden lg:block text-sm font-medium text-lumara-warm-black hover:text-lumara-accent-dark transition-colors whitespace-nowrap"
                style={{ fontFamily: 'var(--font-dm-sans)' }}>
                {link.label}
              </Link>
            ))}
            <button aria-label="Pesquisar" onClick={() => setDrawer('search')} className="hidden md:block text-lumara-warm-black hover:text-lumara-accent-dark transition-colors">
              <Search size={22} strokeWidth={1.6} />
            </button>
            <button aria-label="Conta" onClick={() => setDrawer('profile')} className="hidden md:block text-lumara-warm-black hover:text-lumara-accent-dark transition-colors">
              <User size={22} strokeWidth={1.6} />
            </button>
            <button aria-label={`Favoritos — ${mounted ? likesCount : 0} itens`} onClick={() => setDrawer('likes')} className="hidden md:block relative text-lumara-warm-black hover:text-lumara-accent-dark transition-colors">
              <Heart size={22} strokeWidth={1.6} />
              {mounted && likesCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-lumara-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center" style={{ fontFamily: 'var(--font-nunito)' }}>
                  {likesCount}
                </span>
              )}
            </button>
            <button onClick={() => setDrawer('cart')} aria-label={`Carrinho — ${mounted ? count() : 0} itens`} className="relative flex items-center gap-1.5 text-lumara-warm-black hover:text-lumara-accent-dark transition-colors">
              <ShoppingBag size={22} strokeWidth={1.6} />
              <span className="bg-lumara-gold text-white text-[11px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center" style={{ fontFamily: 'var(--font-nunito)' }}>
                {mounted ? count() : 0}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30 z-40" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'tween', duration: 0.3 }} className="fixed left-0 top-0 h-full w-72 bg-lumara-offwhite z-50 flex flex-col p-8">
              <div className="flex items-center justify-between mb-10">
                <LumaraLogo />
                <button onClick={() => setMobileOpen(false)} aria-label="Fechar menu" className="text-lumara-gray hover:text-lumara-warm-black transition-colors">
                  <X size={20} />
                </button>
              </div>
              <nav className="flex flex-col gap-5" aria-label="Navegação mobile">
                {navLinks.map((link) => (
                  <Link key={link.href + link.label} href={link.href} onClick={() => setMobileOpen(false)}
                    className={`text-sm font-medium transition-colors ${link.accent ? 'text-lumara-gold' : 'text-lumara-warm-black hover:text-lumara-accent-dark'}`}
                    style={{ fontFamily: 'var(--font-dm-sans)' }}>
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex gap-4 pt-8 border-t border-lumara-border">
                <button onClick={() => { setMobileOpen(false); setDrawer('search'); }} className="text-lumara-warm-black hover:text-lumara-accent-dark transition-colors"><Search size={20} /></button>
                <button onClick={() => { setMobileOpen(false); setDrawer('likes'); }} className="relative text-lumara-warm-black hover:text-lumara-accent-dark transition-colors">
                  <Heart size={20} />
                  {likesCount > 0 && <span className="absolute -top-1 -right-1.5 bg-lumara-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{likesCount}</span>}
                </button>
                <button onClick={() => { setMobileOpen(false); setDrawer('profile'); }} className="text-lumara-warm-black hover:text-lumara-accent-dark transition-colors"><User size={20} /></button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Drawers */}
      <CartDrawer open={drawer === 'cart'} onClose={close} />
      <SearchDrawer open={drawer === 'search'} onClose={close} />
      <LikesDrawer open={drawer === 'likes'} onClose={close} />
      <ProfileDrawer open={drawer === 'profile'} onClose={close} />
    </>
  );
}
