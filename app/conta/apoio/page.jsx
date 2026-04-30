import { currentUser } from '@clerk/nextjs/server';
import { SupportForm } from '@/components/account/SupportForm';

export default async function ApoioPage() {
  const user = await currentUser();
  const defaultName = [user?.firstName, user?.lastName].filter(Boolean).join(' ');
  const defaultEmail = user?.primaryEmailAddress?.emailAddress ?? '';

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A2E] mb-1">Apoio ao cliente</h1>
      <p className="text-sm text-[#6B6B8A] mb-6">Estamos aqui para ajudar. Resposta em até 24 horas.</p>
      <SupportForm defaultName={defaultName} defaultEmail={defaultEmail} />
    </div>
  );
}
