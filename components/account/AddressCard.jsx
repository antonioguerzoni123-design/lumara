'use client';
import { useState } from 'react';
import { Trash2, Star } from 'lucide-react';

export function AddressCard({ address, isDefault, onDelete, onSetDefault }) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm('Eliminar esta morada?')) return;
    setLoading(true);
    await onDelete(address.id);
    setLoading(false);
  }

  async function handleSetDefault() {
    setLoading(true);
    await onSetDefault(address.id);
    setLoading(false);
  }

  return (
    <div className={`bg-white border rounded-2xl p-5 ${isDefault ? 'border-[#8B6BE0]' : 'border-[#E8E0F0]'}`}>
      {isDefault && (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-[#8B6BE0] bg-[#F3EFFE] px-2 py-0.5 rounded-full mb-3">
          <Star size={11} fill="currentColor" /> Morada padrão
        </span>
      )}
      <p className="text-sm font-medium text-[#1A1A2E]">{address.firstName} {address.lastName}</p>
      <p className="text-sm text-[#6B6B8A] mt-1 leading-relaxed">
        {address.address1}
        {address.address2 && <>, {address.address2}</>}<br />
        {address.zip} {address.city}<br />
        {address.countryCode}
      </p>
      <div className="flex items-center gap-3 mt-4">
        {!isDefault && (
          <button onClick={handleSetDefault} disabled={loading}
            className="text-xs text-[#8B6BE0] hover:underline disabled:opacity-50">
            Definir como padrão
          </button>
        )}
        <button onClick={handleDelete} disabled={loading}
          className="ml-auto text-[#6B6B8A] hover:text-red-500 transition-colors disabled:opacity-50">
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}
