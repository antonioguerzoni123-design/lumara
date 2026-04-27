'use client';
import { useState } from 'react';
import { usePreferences } from '@/hooks/usePreferences';

const skinTypes = [
  { value: '', label: 'Selecciona o teu tipo de pele' },
  { value: 'normal', label: 'Normal' },
  { value: 'seca', label: 'Seca' },
  { value: 'oleosa', label: 'Oleosa' },
  { value: 'mista', label: 'Mista' },
  { value: 'sensivel', label: 'Sensível' },
];

export default function PreferenciasPage() {
  const { preferences, save, loading } = usePreferences();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [local, setLocal] = useState(null);
  const current = local ?? preferences;

  function update(key, value) {
    setLocal((prev) => ({ ...(prev ?? preferences), [key]: value }));
    setSaved(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!local) return;
    setSaving(true);
    await save(local);
    setSaving(false);
    setSaved(true);
    setLocal(null);
  }

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A2E] mb-1">Preferências</h1>
        <p className="text-sm text-[#6B6B8A]">A carregar…</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A2E] mb-1">Preferências</h1>
      <p className="text-sm text-[#6B6B8A] mb-6">Personaliza a tua experiência na Lumara.</p>

      <form onSubmit={handleSubmit} className="bg-white border border-[#E8E0F0] rounded-2xl p-6 flex flex-col gap-6">
        <div>
          <label className="block text-sm font-semibold text-[#1A1A2E] mb-1">Idioma</label>
          <select
            value={current.language}
            onChange={(e) => update('language', e.target.value)}
            className="w-full border border-[#E8E0F0] rounded-xl px-3 py-2.5 text-sm text-[#1A1A2E] focus:outline-none focus:border-[#8B6BE0]"
          >
            <option value="pt">Português</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A1A2E] mb-1">Tipo de pele</label>
          <select
            value={current.skinType}
            onChange={(e) => update('skinType', e.target.value)}
            className="w-full border border-[#E8E0F0] rounded-xl px-3 py-2.5 text-sm text-[#1A1A2E] focus:outline-none focus:border-[#8B6BE0]"
          >
            {skinTypes.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-4">
          <label className="flex items-center justify-between gap-3 cursor-pointer">
            <div>
              <p className="text-sm font-semibold text-[#1A1A2E]">Newsletter</p>
              <p className="text-xs text-[#6B6B8A]">Recebe novidades, lançamentos e ofertas exclusivas.</p>
            </div>
            <button type="button" onClick={() => update('newsletter', !current.newsletter)}
              className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${current.newsletter ? 'bg-[#8B6BE0]' : 'bg-[#E8E0F0]'}`}>
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${current.newsletter ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </label>

          <label className="flex items-center justify-between gap-3 cursor-pointer">
            <div>
              <p className="text-sm font-semibold text-[#1A1A2E]">Notificações de stock</p>
              <p className="text-xs text-[#6B6B8A]">Aviso quando produtos favoritos ficam disponíveis.</p>
            </div>
            <button type="button" onClick={() => update('stockNotifications', !current.stockNotifications)}
              className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${current.stockNotifications ? 'bg-[#8B6BE0]' : 'bg-[#E8E0F0]'}`}>
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${current.stockNotifications ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </label>
        </div>

        <div className="flex items-center gap-3 pt-2 border-t border-[#E8E0F0]">
          <button type="submit" disabled={saving || !local}
            className="bg-[#8B6BE0] hover:bg-[#7a5cd0] text-white text-sm px-6 py-2.5 rounded-xl disabled:opacity-50 transition-colors">
            {saving ? 'A guardar…' : 'Guardar preferências'}
          </button>
          {saved && <span className="text-sm text-green-600">Guardado ✓</span>}
        </div>
      </form>
    </div>
  );
}
