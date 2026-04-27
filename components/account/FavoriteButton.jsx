'use client';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';

export function FavoriteButton({ product, className = '' }) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(product.id);

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(product); }}
      aria-label={active ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      className={`flex items-center justify-center w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm transition-all hover:scale-110 ${className}`}
    >
      <Heart
        size={16}
        className={active ? 'fill-[#E0689F] text-[#E0689F]' : 'text-[#6B6B8A]'}
      />
    </button>
  );
}
