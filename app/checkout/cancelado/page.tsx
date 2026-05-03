'use client';

import { XCircle } from 'lucide-react';

export default function CanceladoPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <XCircle className="mx-auto mb-4 text-lumara-gray" size={56} strokeWidth={1.5} />
        <h1
          className="text-2xl font-bold text-lumara-warm-black mb-2"
          style={{ fontFamily: 'var(--font-nunito)' }}
        >
          Pagamento cancelado
        </h1>
        <p
          className="text-lumara-gray mb-6"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        >
          O pagamento foi cancelado. Os produtos continuam no teu carrinho — podes retomar a compra quando quiseres.
        </p>
        <a
          href="/"
          className="inline-block bg-lumara-warm-black text-lumara-offwhite px-6 py-3 rounded-full text-sm font-bold"
          style={{ fontFamily: 'var(--font-nunito)' }}
        >
          Voltar à loja
        </a>
      </div>
    </main>
  );
}
