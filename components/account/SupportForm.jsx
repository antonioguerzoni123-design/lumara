'use client';
import { useState } from 'react';

const subjects = ['Encomenda', 'Devolução', 'Produto', 'Outro'];

const EMPTY = { name: '', email: '', subject: '', message: '' };

export function SupportForm({ defaultName = '', defaultEmail = '' }) {
  const [form, setForm] = useState({ ...EMPTY, name: defaultName, email: defaultEmail });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
    setStatus(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    try {
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Erro desconhecido');
      setStatus({ type: 'success', message: 'Mensagem enviada! Respondemos em até 24 horas.' });
      setForm({ ...EMPTY, name: defaultName, email: defaultEmail });
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#E8E0F0] rounded-2xl p-6 flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[#6B6B8A] mb-1">Nome</label>
          <input value={form.name} onChange={(e) => set('name', e.target.value)} required
            className="w-full border border-[#E8E0F0] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#8B6BE0]" />
        </div>
        <div>
          <label className="block text-xs text-[#6B6B8A] mb-1">Email</label>
          <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} required
            className="w-full border border-[#E8E0F0] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#8B6BE0]" />
        </div>
      </div>

      <div>
        <label className="block text-xs text-[#6B6B8A] mb-1">Assunto</label>
        <select value={form.subject} onChange={(e) => set('subject', e.target.value)} required
          className="w-full border border-[#E8E0F0] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#8B6BE0]">
          <option value="">Selecciona um assunto</option>
          {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-xs text-[#6B6B8A] mb-1">Mensagem</label>
        <textarea value={form.message} onChange={(e) => set('message', e.target.value)} required rows={5}
          className="w-full border border-[#E8E0F0] rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:border-[#8B6BE0]" />
      </div>

      {status && (
        <div className={`rounded-xl p-4 text-sm ${status.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
          {status.message}
        </div>
      )}

      <button type="submit" disabled={sending}
        className="bg-[#8B6BE0] hover:bg-[#7a5cd0] text-white text-sm px-6 py-3 rounded-xl disabled:opacity-50 transition-colors">
        {sending ? 'A enviar…' : 'Enviar mensagem'}
      </button>
    </form>
  );
}
