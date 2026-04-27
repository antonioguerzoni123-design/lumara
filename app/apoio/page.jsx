import { SupportForm } from '@/components/account/SupportForm';
import { MessageCircle } from 'lucide-react';

export const metadata = {
  title: 'Apoio ao cliente — Lumara',
  description: 'Fala connosco. Estamos aqui para ajudar.',
};

export default function ApoioPublicPage() {
  return (
    <div className="min-h-screen bg-[#FAF8FB]">
      <div className="max-w-xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#F3EFFE] flex items-center justify-center mx-auto mb-4">
            <MessageCircle size={22} className="text-[#8B6BE0]" />
          </div>
          <h1 className="text-2xl font-bold text-[#1A1A2E]">Apoio ao cliente</h1>
          <p className="text-sm text-[#6B6B8A] mt-2">Estamos aqui para ajudar. Respondemos em até 24 horas.</p>
        </div>
        <SupportForm />
      </div>
    </div>
  );
}
