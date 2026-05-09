'use client';
import { useState, useCallback } from 'react';
import { getFavorites, addFavorite, removeFavorite } from '@/lib/favorites';
import { useCustomer } from './useCustomer';

export function useFavorites() {
  const { customer } = useCustomer();
  const [favorites, setFavorites] = useState(() => getFavorites());

  const toggle = useCallback((product) => {
    const isFav = favorites.some((f) => f.id === product.id);
    if (isFav) {
      removeFavorite(product.id);
      setFavorites((prev) => prev.filter((f) => f.id !== product.id));
    } else {
      addFavorite(product);
      setFavorites((prev) => [...prev, product]);
    }

    if (customer?.id) {
      fetch('/api/favorites/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favorites: [product.id ?? product.slug] }),
      }).catch(() => {});
    }
  }, [favorites, customer]);

  const isFavorite = useCallback((productId) => favorites.some((f) => f.id === productId), [favorites]);

  return { favorites, toggle, isFavorite };
}
