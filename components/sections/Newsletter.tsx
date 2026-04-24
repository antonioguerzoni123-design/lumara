'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-[88px] text-center" style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #2D1B4E 100%)' }}>
      <div className="max-w-[580px] mx-auto px-6 lg:px-10">
        <div
          className="text-[11px] tracking-[0.18em] uppercase font-semibold mb-5 opacity-60"
          style={{ fontFamily: 'var(--font-dm-sans)', color: '#E0689F' }}
        >
          ✦ Comunidade Lumara
        </div>
        <h2
          className="text-[44px] leading-[1.02] tracking-[-0.03em] font-extrabold text-white mb-3.5"
          style={{ fontFamily: 'var(--font-nunito)' }}
        >
          Entre na{' '}
          <em
            className="not-italic font-normal"
            style={{ color: '#E0689F' }}
          >
            lista
          </em>
          .
        </h2>
        <p
          className="text-[15px] mb-8 leading-[1.6]"
          style={{ fontFamily: 'var(--font-dm-sans)', color: 'rgba(255,255,255,0.65)' }}
        >
          Novidades, rituais e ofertas exclusivas para Portugal —
          apenas quando fizer sentido. Nunca spam.
        </p>

        {submitted ? (
          <p
            className="text-[15px] tracking-wider font-medium"
            style={{ fontFamily: 'var(--font-nunito)', color: '#E0689F' }}
          >
            Obrigado por se inscrever ✦
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 bg-white/10 border border-white/20 rounded-full px-[22px] py-1.5 items-center backdrop-blur-sm"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="flex-1 border-none outline-none bg-transparent text-sm py-2.5 text-white placeholder:text-white/40"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
              aria-label="Endereço de email"
            />
            <button
              type="submit"
              className="text-white px-[22px] py-3 rounded-full text-[13px] font-bold transition-all hover:-translate-y-px"
              style={{ background: '#E0689F', fontFamily: 'var(--font-nunito)' }}
            >
              Inscrever
            </button>
          </form>
        )}

        <p
          className="text-[11px] mt-5 opacity-40"
          style={{ fontFamily: 'var(--font-dm-sans)', color: 'white' }}
        >
          Sem spam · Cancelar a qualquer momento · Dados protegidos (RGPD)
        </p>
      </div>
    </section>
  );
}
