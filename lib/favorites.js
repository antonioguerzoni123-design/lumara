const KEY = 'lumara_favorites';

export function getFavorites() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function addFavorite(product) {
  const favs = getFavorites();
  if (!favs.some((f) => f.id === product.id)) {
    localStorage.setItem(KEY, JSON.stringify([...favs, product]));
  }
}

export function removeFavorite(productId) {
  const favs = getFavorites().filter((f) => f.id !== productId);
  localStorage.setItem(KEY, JSON.stringify(favs));
}

export async function syncFavoritesToServer(customerId, token) {
  const local = getFavorites();
  if (!local.length) return;
  try {
    await fetch('/api/favorites/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerId, favorites: local.map((f) => f.id ?? f.slug) }),
    });
  } catch {}
}

export async function loadFavoritesFromServer(customerId) {
  try {
    const res = await fetch(`/api/favorites?customerId=${customerId}`);
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}
