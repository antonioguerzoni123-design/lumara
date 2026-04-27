import { cookies } from 'next/headers';
import { customerFetch } from '@/lib/shopifyCustomer';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const statusMap = {
  FULFILLED: { label: 'Entregue', color: 'bg-green-100 text-green-700' },
  PARTIALLY_FULFILLED: { label: 'Parcialmente entregue', color: 'bg-yellow-100 text-yellow-700' },
  UNFULFILLED: { label: 'Em preparação', color: 'bg-blue-100 text-blue-700' },
  ON_HOLD: { label: 'Em espera', color: 'bg-gray-100 text-gray-600' },
};

const ORDER_QUERY = `
  query GetOrder($id: ID!) {
    order(id: $id) {
      id
      name
      processedAt
      fulfillmentStatus
      totalPrice { amount currencyCode }
      subtotalPrice { amount currencyCode }
      totalShippingPrice { amount currencyCode }
      totalTax { amount currencyCode }
      shippingAddress {
        firstName lastName address1 address2 city zoneCode zip countryCode
      }
      lineItems(first: 20) {
        edges {
          node {
            title
            quantity
            image { url altText }
            price { amount currencyCode }
            variantTitle
          }
        }
      }
      fulfillments(first: 5) {
        trackingInfo { number url }
        status
      }
    }
  }
`;

function fmt(amount, currency) {
  return new Intl.NumberFormat('pt-PT', { style: 'currency', currency }).format(amount);
}

export default async function OrderDetailPage({ params }) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get('shopify_access_token')?.value;

  const gid = `gid://shopify/Order/${id}`;
  let order = null;
  let fetchError = null;

  if (token) {
    try {
      const data = await customerFetch(ORDER_QUERY, { id: gid }, token);
      order = data?.order;
    } catch (err) {
      fetchError = err.message;
    }
  }

  if (fetchError || !order) {
    return (
      <div>
        <Link href="/conta/encomendas" className="flex items-center gap-2 text-sm text-[#6B6B8A] hover:text-[#8B6BE0] mb-6">
          <ArrowLeft size={16} /> Voltar às encomendas
        </Link>
        <div className="bg-white border border-[#E8E0F0] rounded-2xl p-8 text-center text-sm text-[#6B6B8A]">
          {fetchError ?? 'Encomenda não encontrada.'}
        </div>
      </div>
    );
  }

  const status = statusMap[order.fulfillmentStatus] ?? { label: order.fulfillmentStatus, color: 'bg-gray-100 text-gray-600' };
  const date = new Date(order.processedAt).toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' });
  const items = order.lineItems.edges.map((e) => e.node);
  const tracking = order.fulfillments?.[0]?.trackingInfo?.[0];
  const addr = order.shippingAddress;

  return (
    <div>
      <Link href="/conta/encomendas" className="flex items-center gap-2 text-sm text-[#6B6B8A] hover:text-[#8B6BE0] mb-6">
        <ArrowLeft size={16} /> Voltar às encomendas
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E]">{order.name}</h1>
          <p className="text-sm text-[#6B6B8A]">{date}</p>
        </div>
        <span className={`text-sm font-medium px-3 py-1 rounded-full ${status.color}`}>{status.label}</span>
      </div>

      <div className="grid gap-4">
        <section className="bg-white border border-[#E8E0F0] rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-[#1A1A2E] mb-4">Produtos</h2>
          <div className="flex flex-col divide-y divide-[#E8E0F0]">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                {item.image && (
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#F3EFFE] shrink-0">
                    <Image src={item.image.url} alt={item.image.altText ?? item.title} width={56} height={56} className="object-cover w-full h-full" unoptimized />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1A1A2E] truncate">{item.title}</p>
                  {item.variantTitle && item.variantTitle !== 'Default Title' && (
                    <p className="text-xs text-[#6B6B8A]">{item.variantTitle}</p>
                  )}
                  <p className="text-xs text-[#6B6B8A]">Qtd: {item.quantity}</p>
                </div>
                <span className="text-sm font-medium text-[#1A1A2E] shrink-0">
                  {fmt(item.price.amount, item.price.currencyCode)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-[#E8E0F0] mt-4 pt-4 flex flex-col gap-1 text-sm">
            {order.subtotalPrice && (
              <div className="flex justify-between text-[#6B6B8A]">
                <span>Subtotal</span>
                <span>{fmt(order.subtotalPrice.amount, order.subtotalPrice.currencyCode)}</span>
              </div>
            )}
            {order.totalShippingPrice && (
              <div className="flex justify-between text-[#6B6B8A]">
                <span>Envio</span>
                <span>{parseFloat(order.totalShippingPrice.amount) === 0 ? 'Grátis' : fmt(order.totalShippingPrice.amount, order.totalShippingPrice.currencyCode)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold text-[#1A1A2E] mt-1">
              <span>Total</span>
              <span>{fmt(order.totalPrice.amount, order.totalPrice.currencyCode)}</span>
            </div>
          </div>
        </section>

        <div className="grid sm:grid-cols-2 gap-4">
          {addr && (
            <section className="bg-white border border-[#E8E0F0] rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-[#1A1A2E] mb-3">Morada de entrega</h2>
              <p className="text-sm text-[#6B6B8A] leading-relaxed">
                {addr.firstName} {addr.lastName}<br />
                {addr.address1}{addr.address2 ? `, ${addr.address2}` : ''}<br />
                {addr.zip} {addr.city}<br />
                {addr.countryCode}
              </p>
            </section>
          )}

          {tracking && (
            <section className="bg-white border border-[#E8E0F0] rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-[#1A1A2E] mb-3">Rastreio</h2>
              <p className="text-sm text-[#6B6B8A] mb-2">Nº: {tracking.number}</p>
              {tracking.url && (
                <a href={tracking.url} target="_blank" rel="noopener noreferrer"
                  className="text-sm text-[#8B6BE0] hover:underline">
                  Rastrear envio →
                </a>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
