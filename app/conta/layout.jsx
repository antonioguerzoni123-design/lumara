import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AccountMenu } from '@/components/account/AccountMenu';

export const metadata = {
  title: 'A minha conta — Lumara',
};

export default async function ContaLayout({ children }) {
  const { userId } = await auth();
  if (!userId) redirect('/login');

  return (
    <div className="min-h-screen bg-[#FAF8FB]">
      {/* Header bar */}
      <div className="border-b border-[#E8E0F0] bg-white">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#6B6B8A] hover:text-[#8B6BE0] transition-colors"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            <ArrowLeft size={15} strokeWidth={1.8} />
            Voltar à Lumara
          </Link>
          <span
            className="text-[18px] font-black tracking-[-0.5px] text-[#1A1A2E]"
            style={{ fontFamily: 'var(--font-nunito)' }}
          >
            lumara<span style={{ color: '#E0689F', fontSize: '9px', verticalAlign: 'super' }}>●</span>
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <AccountMenu />
        </aside>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
