import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const statusMap = {
  FULFILLED: { label: 'Entregue', color: 'bg-green-100 text-green-700' },
  PARTIALLY_FULFILLED: { label: 'Parcialmente entregue', color: 'bg-yellow-100 text-yellow-700' },
  UNFULFILLED: { label: 'Em preparação', color: 'bg-blue-100 text-blue-700' },
  SCHEDULED: { label: 'Agendado', color: 'bg-purple-100 text-purple-700' },
  ON_HOLD: { label: 'Em espera', color: 'bg-gray-100 text-gray-600' },
};

function fmt(amount, currency) {
  return new Intl.NumberFormat('pt-PT', { style: 'currency', currency }).format(amount);
}

export function OrderCard({ order }) {
  const status = statusMap[order.fulfillmentStatus] ?? { label: order.fulfillmentStatus, color: 'bg-gray-100 text-gray-600' };
  const date = new Date(order.processedAt).toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' });
  const id = order.id.split('/').pop();

  return (
    <Link
      href={`/conta/encomendas/${id}`}
      className="group flex items-center justify-between bg-white border border-[#E8E0F0] hover:border-[#B89EF0] rounded-2xl p-5 transition-all hover:shadow-sm"
    >
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-[#1A1A2E]">{order.name}</span>
        <span className="text-xs text-[#6B6B8A]">{date}</span>
        <span className={`mt-1 inline-block text-xs font-medium px-2 py-0.5 rounded-full w-fit ${status.color}`}>
          {status.label}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-[#1A1A2E]">
          {fmt(order.totalPrice.amount, order.totalPrice.currencyCode)}
        </span>
        <ArrowRight size={16} className="text-[#B89EF0] group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Link>
  );
}
