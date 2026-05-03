'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, Clock, AlertTriangle, Loader2 } from 'lucide-react';
import { useCartStore } from '@/lib/cart';

type PollingStatus = 'polling' | 'paid' | 'failed' | 'timeout' | 'invalid';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');
  const clearCart = useCartStore((s) => s.clearCart);

  const [pollingStatus, setPollingStatus] = useState<PollingStatus>('polling');
  const [shopifyOrderName, setShopifyOrderName] = useState<string | null>(null);
  const cartClearedRef = useRef(false);
  const attemptsRef = useRef(0);
  const MAX_ATTEMPTS = 15;

  useEffect(() => {
    if (!sessionId) {
      setPollingStatus('invalid');
      return;
    }

    const poll = async () => {
      if (attemptsRef.current >= MAX_ATTEMPTS) {
        setPollingStatus('timeout');
        if (!cartClearedRef.current) {
          clearCart();
          cartClearedRef.current = true;
        }
        return;
      }

      attemptsRef.current += 1;

      try {
        const res = await fetch(`/api/checkout/status?session_id=${sessionId}`);
        if (!res.ok) {
          setTimeout(poll, 2000);
          return;
        }
        const data = await res.json();

        if (data.status === 'PAID') {
          setShopifyOrderName(data.shopifyOrderName);
          setPollingStatus('paid');
          if (!cartClearedRef.current) {
            clearCart();
            cartClearedRef.current = true;
          }
          return;
        }

        if (data.status === 'PAID_BUT_SHOPIFY_FAILED') {
          setPollingStatus('failed');
          if (!cartClearedRef.current) {
            clearCart();
            cartClearedRef.current = true;
          }
          return;
        }

        if (data.status === 'EXPIRED' || data.status === 'CANCELLED') {
          router.replace('/checkout/cancelado');
          return;
        }

        setTimeout(poll, 2000);
      } catch {
        setTimeout(poll, 2000);
      }
    };

    poll();
  }, [sessionId, clearCart, router]);

  if (pollingStatus === 'invalid') {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <AlertTriangle className="mx-auto mb-4 text-red-400" size={48} strokeWidth={1.5} />
          <h1 className="text-2xl font-bold text-lumara-warm-black mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>
            Sessão inválida
          </h1>
          <p className="text-lumara-gray mb-6" style={{ fontFamily: 'var(--font-dm-sans)' }}>
            Este link não é válido. Se acabaste de pagar, verifica o teu email de confirmação.
          </p>
          <a href="/" className="inline-block bg-lumara-warm-black text-lumara-offwhite px-6 py-3 rounded-full text-sm font-bold" style={{ fontFamily: 'var(--font-nunito)' }}>
            Voltar à loja
          </a>
        </div>
      </main>
    );
  }

  if (pollingStatus === 'polling') {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <Loader2 className="mx-auto mb-4 text-lumara-accent-dark animate-spin" size={48} strokeWidth={1.5} />
          <h1 className="text-2xl font-bold text-lumara-warm-black mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>
            A confirmar pagamento...
          </h1>
          <p className="text-lumara-gray" style={{ fontFamily: 'var(--font-dm-sans)' }}>
            Aguarda um momento enquanto processamos o teu pedido.
          </p>
        </div>
      </main>
    );
  }

  if (pollingStatus === 'paid') {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <CheckCircle className="mx-auto mb-4 text-green-500" size={56} strokeWidth={1.5} />
          <h1 className="text-2xl font-bold text-lumara-warm-black mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>
            Pedido confirmado!
          </h1>
          {shopifyOrderName && (
            <p className="text-lumara-gray mb-2" style={{ fontFamily: 'var(--font-dm-sans)' }}>
              Número do pedido: <span className="font-semibold text-lumara-warm-black">{shopifyOrderName}</span>
            </p>
          )}
          <p className="text-lumara-gray mb-6" style={{ fontFamily: 'var(--font-dm-sans)' }}>
            Vais receber um email de confirmação em breve. O teu pedido está a ser preparado.
          </p>
          <a href="/" className="inline-block bg-lumara-warm-black text-lumara-offwhite px-6 py-3 rounded-full text-sm font-bold" style={{ fontFamily: 'var(--font-nunito)' }}>
            Continuar a comprar
          </a>
        </div>
      </main>
    );
  }

  if (pollingStatus === 'failed') {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <CheckCircle className="mx-auto mb-4 text-green-500" size={56} strokeWidth={1.5} />
          <h1 className="text-2xl font-bold text-lumara-warm-black mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>
            Pagamento confirmado!
          </h1>
          <p className="text-lumara-gray mb-6" style={{ fontFamily: 'var(--font-dm-sans)' }}>
            O teu pagamento foi recebido com sucesso. O pedido está a ser processado manualmente e vais receber um email em breve com todos os detalhes.
          </p>
          <a href="/" className="inline-block bg-lumara-warm-black text-lumara-offwhite px-6 py-3 rounded-full text-sm font-bold" style={{ fontFamily: 'var(--font-nunito)' }}>
            Voltar à loja
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <Clock className="mx-auto mb-4 text-lumara-accent-dark" size={48} strokeWidth={1.5} />
        <h1 className="text-2xl font-bold text-lumara-warm-black mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>
          Pagamento recebido!
        </h1>
        <p className="text-lumara-gray mb-6" style={{ fontFamily: 'var(--font-dm-sans)' }}>
          O teu pagamento foi confirmado. Vais receber um email com os detalhes do pedido assim que o processamento estiver concluído.
        </p>
        <a href="/" className="inline-block bg-lumara-warm-black text-lumara-offwhite px-6 py-3 rounded-full text-sm font-bold" style={{ fontFamily: 'var(--font-nunito)' }}>
          Continuar a comprar
        </a>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <Loader2 className="mx-auto mb-4 text-lumara-accent-dark animate-spin" size={48} strokeWidth={1.5} />
          <h1 className="text-2xl font-bold text-lumara-warm-black mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>
            A carregar...
          </h1>
        </div>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  );
}
