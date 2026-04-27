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
  const [preferences, setPreferences] = useState(DEFAULTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!customer?.id) { setLoading(false); return; }
    const customerId = customer.id.split('/').pop();
    fetch(`/api/preferences?customerId=${customerId}`)
      .then((r) => r.json())
      .then((data) => {
        setPreferences({ ...DEFAULTS, ...data });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [customer]);

  const save = useCallback(async (updates) => {
    if (!customer?.id) return;
    const customerId = customer.id.split('/').pop();
    const merged = { ...preferences, ...updates };
    setPreferences(merged);
    await fetch('/api/preferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerId, preferences: updates }),
    });
  }, [preferences, customer]);

  return { preferences, save, loading };
}
