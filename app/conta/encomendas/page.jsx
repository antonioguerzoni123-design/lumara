import { currentUser } from '@clerk/nextjs/server';
import { findCustomerByEmail, getCustomerOrders, mapOrder } from '@/lib/shopifyAdmin';
import { OrderCard } from '@/components/account/OrderCard';
import { Package } from 'lucide-react';

export default async function EncomendasPage() {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  let orders = [];
  let fetchError = null;

  if (email) {
    try {
      const shopifyCustomer = await findCustomerByEmail(email);
      if (shopifyCustomer) {
        const rawOrders = await getCustomerOrders(shopifyCustomer.id);
        orders = rawOrders.map(mapOrder);
      }
    } catch (err) {
      fetchError = err.message;
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A2E] mb-1">Encomendas</h1>
      <p className="text-sm text-[#6B6B8A] mb-6">Histórico e estado das tuas encomendas.</p>

      {fetchError && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700 mb-4">
          Não foi possível carregar as encomendas: {fetchError}
        </div>
      )}

      {orders.length === 0 && !fetchError ? (
        <div className="bg-white border border-[#E8E0F0] rounded-2xl p-12 text-center">
          <Package size={40} className="mx-auto text-[#B89EF0] mb-3" />
          <p className="text-sm font-medium text-[#1A1A2E]">Ainda não fizeste nenhuma encomenda</p>
          <p className="text-xs text-[#6B6B8A] mt-1">Descobre os nossos produtos e faz a tua primeira encomenda.</p>
          <a href="/loja" className="mt-4 inline-block text-sm text-[#8B6BE0] hover:underline">
            Ir à loja →
          </a>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
