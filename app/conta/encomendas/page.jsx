import { cookies } from 'next/headers';
import { customerFetch } from '@/lib/shopifyCustomer';
import { OrderCard } from '@/components/account/OrderCard';
import { Package } from 'lucide-react';

const ORDERS_QUERY = `
  query GetOrders {
    customer {
      orders(first: 20) {
        edges {
          node {
            id
            name
            processedAt
            fulfillmentStatus
            totalPrice { amount currencyCode }
            lineItems(first: 10) {
              edges {
                node {
                  title
                  quantity
                  image { url altText }
                  price { amount currencyCode }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default async function EncomendasPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('shopify_access_token')?.value;

  let orders = [];
  let fetchError = null;

  if (token) {
    try {
      const data = await customerFetch(ORDERS_QUERY, {}, token);
      orders = data?.customer?.orders?.edges?.map((e) => e.node) ?? [];
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
