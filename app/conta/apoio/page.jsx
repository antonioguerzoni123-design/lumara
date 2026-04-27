import { cookies } from 'next/headers';
import { customerFetch } from '@/lib/shopifyCustomer';
import { SupportForm } from '@/components/account/SupportForm';

const ME_QUERY = `
  query Me {
    customer {
      firstName lastName emailAddress { emailAddress }
    }
  }
`;

export default async function ApoioPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('shopify_customer_token')?.value;

  let defaultName = '';
  let defaultEmail = '';

  if (token) {
    try {
      const data = await customerFetch(ME_QUERY, {}, token);
      const c = data?.customer;
      defaultName = [c?.firstName, c?.lastName].filter(Boolean).join(' ');
      defaultEmail = c?.emailAddress?.emailAddress ?? '';
    } catch {}
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A2E] mb-1">Apoio ao cliente</h1>
      <p className="text-sm text-[#6B6B8A] mb-6">Estamos aqui para ajudar. Resposta em até 24 horas.</p>
      <SupportForm defaultName={defaultName} defaultEmail={defaultEmail} />
    </div>
  );
}
