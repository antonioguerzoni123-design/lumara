'use client';
import { useState, useEffect } from 'react';
import { AddressCard } from '@/components/account/AddressCard';
import { Plus, X } from 'lucide-react';

const countries = [
  { code: 'PT', label: 'Portugal' },
  { code: 'ES', label: 'Espanha' },
  { code: 'FR', label: 'França' },
  { code: 'DE', label: 'Alemanha' },
  { code: 'GB', label: 'Reino Unido' },
];

const EMPTY_FORM = { firstName: '', lastName: '', address1: '', address2: '', zip: '', city: '', zoneCode: '', countryCode: 'PT' };

export default function MoradasPage() {
  const [addresses, setAddresses] = useState([]);
  const [defaultId, setDefaultId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  async function fetchAddresses() {
    setLoading(true);
    try {
      const res = await fetch('/api/account/addresses');
      const data = await res.json();
      setAddresses(data.addresses ?? []);
      setDefaultId(data.defaultAddressId ?? null);
    } catch {
      setError('Não foi possível carregar as moradas.');
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/account/addresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Erro ao guardar morada.');
      setShowForm(false);
      setForm(EMPTY_FORM);
      await fetchAddresses();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    try {
      await fetch(`/api/account/addresses/${id}`, { method: 'DELETE' });
      await fetchAddresses();
    } catch {
      setError('Erro ao eliminar morada.');
    }
  }

  async function handleSetDefault(id) {
    try {
      await fetch('/api/account/addresses/default', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      await fetchAddresses();
    } catch {
      setError('Erro ao definir morada padrão.');
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E]">Moradas</h1>
          <p className="text-sm text-[#6B6B8A]">As tuas moradas de entrega guardadas.</p>
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="flex items-center gap-2 text-sm bg-[#8B6BE0] hover:bg-[#7a5cd0] text-white px-4 py-2.5 rounded-xl transition-colors"
        >
          {showForm ? <X size={15} /> : <Plus size={15} />}
          {showForm ? 'Cancelar' : 'Nova morada'}
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">{error}</div>
      )}

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white border border-[#E8E0F0] rounded-2xl p-5 mb-6">
          <h2 className="text-sm font-semibold text-[#1A1A2E] mb-4">Nova morada</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[['firstName', 'Primeiro nome'], ['lastName', 'Apelido'], ['address1', 'Morada'], ['address2', 'Complemento (opcional)'], ['zip', 'Código postal'], ['city', 'Cidade']].map(([field, label]) => (
              <div key={field} className={field === 'address1' || field === 'address2' ? 'sm:col-span-2' : ''}>
                <label className="block text-xs text-[#6B6B8A] mb-1">{label}</label>
                <input
                  value={form[field]}
                  onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                  required={field !== 'address2' && field !== 'zoneCode'}
                  className="w-full border border-[#E8E0F0] rounded-xl px-3 py-2.5 text-sm text-[#1A1A2E] focus:outline-none focus:border-[#8B6BE0]"
                />
              </div>
            ))}
            <div>
              <label className="block text-xs text-[#6B6B8A] mb-1">País</label>
              <select
                value={form.countryCode}
                onChange={(e) => setForm((f) => ({ ...f, countryCode: e.target.value }))}
                className="w-full border border-[#E8E0F0] rounded-xl px-3 py-2.5 text-sm text-[#1A1A2E] focus:outline-none focus:border-[#8B6BE0]"
              >
                {countries.map((c) => <option key={c.code} value={c.code}>{c.label}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" disabled={saving}
            className="mt-4 bg-[#8B6BE0] hover:bg-[#7a5cd0] text-white text-sm px-6 py-2.5 rounded-xl disabled:opacity-50 transition-colors">
            {saving ? 'A guardar…' : 'Guardar morada'}
          </button>
        </form>
      )}

      {loading ? (
        <div className="text-sm text-[#6B6B8A]">A carregar…</div>
      ) : addresses.length === 0 ? (
        <div className="bg-white border border-[#E8E0F0] rounded-2xl p-10 text-center text-sm text-[#6B6B8A]">
          Ainda não tens moradas guardadas.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {addresses.map((addr) => (
            <AddressCard
              key={addr.id}
              address={addr}
              isDefault={addr.id === defaultId}
              onDelete={handleDelete}
              onSetDefault={handleSetDefault}
            />
          ))}
        </div>
      )}
    </div>
  );
}
