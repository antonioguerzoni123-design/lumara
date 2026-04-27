import { AccountMenu } from '@/components/account/AccountMenu';

export const metadata = {
  title: 'A minha conta — Lumara',
};

export default function ContaLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#FAF8FB]">
      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <AccountMenu />
        </aside>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
