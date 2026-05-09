'use client';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useLikesStore } from '@/lib/likes';
import { products, driveImage } from '@/lib/products';

function fmt(price) {
  return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(price);
}

export default function FavoritosPage() {
  const { likes, toggleLike } = useLikesStore();
  const likedProducts = products.filter((p) => likes.includes(p.id));

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A2E] mb-1">Favoritos</h1>
      <p className="text-sm text-[#6B6B8A] mb-6">Os produtos que guardaste.</p>

      {likedProducts.length === 0 ? (
        <div className="bg-white border border-[#E8E0F0] rounded-2xl p-12 text-center">
          <Heart size={40} className="mx-auto text-[#B89EF0] mb-3" />
          <p className="text-sm font-medium text-[#1A1A2E]">Ainda não tens favoritos</p>
          <p className="text-xs text-[#6B6B8A] mt-1">Guarda os teus produtos preferidos com o ícone de coração.</p>
          <Link href="/loja" className="mt-4 inline-block text-sm text-[#8B6BE0] hover:underline">
            Explorar produtos →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {likedProducts.map((product) => (
            <div key={product.id} className="group bg-white border border-[#E8E0F0] hover:border-[#B89EF0] rounded-2xl overflow-hidden transition-all hover:shadow-sm">
              <Link href={`/produto/${product.slug}`} className="block">
                <div className="aspect-square bg-[#F3EFFE] overflow-hidden">
                  {product.images?.[0] ? (
                    <img
                      src={driveImage(product.images[0])}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#B89EF0]">
                      <Heart size={32} />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-[#1A1A2E] truncate">{product.name}</p>
                  <p className="text-sm text-[#8B6BE0] font-semibold mt-0.5">{fmt(product.price)}</p>
                </div>
              </Link>
              <div className="px-3 pb-3">
                <button
                  onClick={() => toggleLike(product.id)}
                  className="w-full text-xs text-[#6B6B8A] hover:text-red-500 border border-[#E8E0F0] hover:border-red-200 rounded-xl py-1.5 transition-colors"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
