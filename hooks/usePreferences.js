'use client';
import { useState, useEffect, useCallback } from 'react';
import { useCustomer } from './useCustomer';

const DEFAULTS = {
  language: 'pt',
  skinType: '',
  newsletter: true,
  stockNotifications: false,
};

export function usePreferences() {
  const { customer } = useCustomer();
  // null = ainda não carregado; DEFAULTS shape quando carregado
  const [preferences, setPreferences] = useState(null);

  useEffect(() => {
    if (!customer?.id) return;
    fetch('/api/preferences')
      .then((r) => r.ok ? r.json() : {})
      .then((data) => setPreferences({ ...DEFAULTS, ...data }))
      .catch(() => setPreferences(DEFAULTS));
  }, [customer]);

  const save = useCallback(async (updates) => {
    if (!customer?.id) return;
    const merged = { ...DEFAULTS, ...(preferences ?? {}), ...updates };
    setPreferences(merged);
    await fetch('/api/preferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ preferences: updates }),
    });
  }, [preferences, customer]);

  // loading derivado: true só quando há customer mas dados ainda não chegaram
  const loading = Boolean(customer?.id) && preferences === null;

  return { preferences: preferences ?? DEFAULTS, loading, save };
}
