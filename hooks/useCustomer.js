'use client';
import { useState, useEffect } from 'react';

export function useCustomer() {
  const [state, setState] = useState({ customer: null, isLoading: true, isLoggedIn: false });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch('/api/account/me', { cache: 'no-store' });
        if (!res.ok) throw new Error('not logged in');
        const customer = await res.json();
        if (!cancelled) setState({ customer, isLoading: false, isLoggedIn: true });
      } catch {
        if (!cancelled) setState({ customer: null, isLoading: false, isLoggedIn: false });
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return state;
}
