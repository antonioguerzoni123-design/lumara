'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Heart, Star, Check } from 'lucide-react';
import { driveImage, Product } from '@/lib/products';
import { useCartStore } from '@/lib/cart';
import { useLikesStore } from '@/lib/likes';

type ProductCardProps = {
  product: Product;
};

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1 mt-0.5 lg:mt-1">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={10}
            fill={i <= Math.round(rating) ? '#E0689F' : 'none'}
            stroke={i <= Math.round(rating) ? '#E0689F' : '#9CA3AF'}
            strokeWidth={1.5}
          />
        ))}
      </div>
      <span
        className="text-[10px] text-lumara-gray"
        style={{ fontFamily: 'var(--font-dm-sans)' }}
      >
        ({count})
      </span>
    </div>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [added, setAdded] = useState(false);
  const imgRef = useCallback((el: HTMLImageElement | null) => {
    if (el?.complete) setImgLoaded(true);
  }, []);
  const addItem = useCartStore((s) => s.addItem);
  const { likes, toggleLike } = useLikesStore();
  const liked = likes.includes(product.id);

  const cardPrice =
    product.defaultVariant && product._shopifyVariantPrices?.[product.defaultVariant]
      ? product._shopifyVariantPrices[product.defaultVariant]
      : product.price;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: cardPrice,
      image: product.images[0] ?? '',
      shopifyVariantId:
        (product.defaultVariant && product._shopifyVariantIds?.[product.defaultVariant])
        ?? product._defaultVariantId
        ?? undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike(product.id);
  };

  return (
    <Link href={`/produto/${product.slug}`} className="group block">
      {/* Image */}
      <div className="relative aspect-[4/5] lg:aspect-square rounded-lg overflow-hidden bg-lumara-nude-light">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-lumara-bg2 animate-pulse rounded-lg" />
        )}
        <img
          ref={imgRef}
          src={driveImage(product.images[0])}
          alt={product.name}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImgLoaded(true)}
          onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder-product.svg'; setImgLoaded(true); }}
        />

        {/* Discount badge */}
        {product.discount && (
          <span
            className="absolute top-2 left-2 lg:top-3 lg:left-3 text-[10px] lg:text-[11px] font-bold tracking-[0.04em] px-1.5 py-0.5 lg:px-2.5 lg:py-1.5 rounded-full bg-lumara-gold text-white"
            style={{ fontFamily: 'var(--font-nunito)' }}
          >
            -{product.discount}%
          </span>
        )}

        {/* Named badge (only if no discount, to avoid overlap) */}
        {product.badge && !product.discount && (
          <span
            className={`absolute top-2 left-2 lg:top-3 lg:left-3 text-[10px] lg:text-[11px] font-bold tracking-[0.04em] px-1.5 py-0.5 lg:px-2.5 lg:py-1.5 rounded-full ${
              product.featured
                ? 'bg-lumara-gold text-white'
                : 'bg-white text-lumara-warm-black'
            }`}
            style={{ fontFamily: 'var(--font-nunito)' }}
          >
            {product.badge}
          </span>
        )}

        {/* Heart */}
        <button
          onClick={handleLike}
          aria-label={liked ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          className="absolute top-2 right-2 lg:top-3 lg:right-3 w-7 h-7 lg:w-[34px] lg:h-[34px] rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-opacity duration-200"
          style={{ opacity: liked ? 1 : undefined }}
        >
          <Heart
            size={16}
            fill={liked ? '#E0689F' : 'none'}
            stroke={liked ? '#E0689F' : '#1A1A2E'}
            strokeWidth={1.6}
            className={liked ? '' : 'opacity-0 group-hover:opacity-100 transition-opacity duration-200'}
          />
        </button>

        {/* Add to cart */}
        <button
          onClick={handleAdd}
          aria-label={`Adicionar ${product.name} ao carrinho`}
          className={`hidden lg:flex absolute left-3 right-3 bottom-3 py-3 rounded-full text-[13px] font-bold items-center justify-center gap-1.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[250ms] ease-out ${added ? 'bg-emerald-500 text-white' : 'bg-lumara-warm-black text-lumara-offwhite'}`}
          style={{ fontFamily: 'var(--font-nunito)' }}
        >
          {added ? <><Check size={13} strokeWidth={2.5} /> Adicionado</> : '+ Adicionar ao carrinho'}
        </button>
      </div>

      {/* Info */}
      <div className="pt-2.5 lg:pt-3.5">
        <div className="flex justify-between items-start gap-2.5">
          <div className="min-w-0 flex-1">
            <div
              className="text-[13px] lg:text-sm font-bold text-lumara-warm-black leading-[1.3] line-clamp-2 lg:truncate"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              {product.name}
            </div>
            <div
              className="text-[10px] lg:text-[11px] text-lumara-gray mt-0.5 truncate"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              {product.hook}
            </div>
          </div>
          <div className="flex-shrink-0 text-right">
            <div
              className="text-[14px] lg:text-[15px] font-bold text-lumara-warm-black whitespace-nowrap"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              €{cardPrice.toFixed(2).replace('.', ',')}
            </div>
            {product.originalPrice && (
              <div
                className="text-[11px] lg:text-[12px] text-lumara-gray line-through whitespace-nowrap"
                style={{ fontFamily: 'var(--font-nunito)' }}
              >
                €{product.originalPrice.toFixed(2).replace('.', ',')}
              </div>
            )}
          </div>
        </div>

        {/* Stars */}
        {product.rating && product.reviewCount && (
          <StarRating rating={product.rating} count={product.reviewCount} />
        )}
      </div>
    </Link>
  );
}
