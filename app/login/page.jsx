'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const errorMessages = {
  access_denied: 'Acesso negado. Tenta novamente.',
  invalid_state: 'Sessão expirada. Tenta novamente.',
  server_error: 'Erro de servidor. Tenta novamente.',
};

function LoginContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8FB] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="text-2xl font-bold tracking-widest text-[#1A1A2E]">LUMARA</span>
          <p className="mt-2 text-sm text-[#6B6B8A]">A tua conta de beleza</p>
        </div>

        <div className="bg-white border border-[#E8E0F0] rounded-2xl p-8 shadow-sm">
          <h1 className="text-xl font-semibold text-[#1A1A2E] mb-2">Iniciar sessão</h1>
          <p className="text-sm text-[#6B6B8A] mb-6">
            Acede às tuas encomendas, moradas favoritas e preferências.
          </p>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {errorMessages[error] ?? 'Ocorreu um erro. Tenta novamente.'}
            </div>
          )}

          <a
            href="/api/auth/shopify"
            className="block w-full text-center bg-[#8B6BE0] hover:bg-[#7a5cd0] text-white font-medium py-3 px-6 rounded-xl transition-colors"
          >
            Iniciar sessão com a Lumara
          </a>

          <p className="mt-4 text-xs text-[#6B6B8A] text-center">
            Ao continuares, aceitas os nossos{' '}
            <a href="/termos" className="underline">Termos de Serviço</a> e{' '}
            <a href="/privacidade" className="underline">Política de Privacidade</a>.
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-[#6B6B8A]">
          Não tens conta?{' '}
          <a href="/api/auth/shopify" className="text-[#8B6BE0] hover:underline font-medium">
            Cria uma agora
          </a>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
