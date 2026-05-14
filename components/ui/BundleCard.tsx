'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Package } from 'lucide-react';
import { Bundle } from '@/data/bundles';

type BundleCardProps = {
  bundle: Bundle;
};

export default function BundleCard({ bundle }: BundleCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const imgRef = useCallback((el: HTMLImageElement | null) => {
    if (el?.complete) setImgLoaded(true);
  }, []);

  const discountPct = bundle.savingsPercent;

  return (
    <Link href={`/bundles/${bundle.id}`} className="group block">
      {/* Image */}
      <div className="relative aspect-[4/5] lg:aspect-square rounded-lg overflow-hidden bg-lumara-nude-light">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-lumara-bg2 animate-pulse rounded-lg" />
        )}
        <img
          ref={imgRef}
          src={bundle.image}
          alt={bundle.name}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-product.svg';
            setImgLoaded(true);
          }}
        />

        {/* Discount badge */}
        {discountPct > 0 && (
          <span
            className="absolute top-2 left-2 lg:top-3 lg:left-3 text-[10px] lg:text-[11px] font-bold tracking-[0.04em] px-1.5 py-0.5 lg:px-2.5 lg:py-1.5 rounded-full bg-lumara-gold text-white"
            style={{ fontFamily: 'var(--font-nunito)' }}
          >
            -{discountPct}%
          </span>
        )}

        {/* Bundle indicator */}
        <div className="absolute top-2 right-2 lg:top-3 lg:right-3 w-7 h-7 lg:w-[34px] lg:h-[34px] rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
          <Package size={14} strokeWidth={1.6} className="text-lumara-warm-black opacity-70" />
        </div>

        {/* See bundle CTA on hover */}
        <div
          className="hidden lg:flex absolute left-3 right-3 bottom-3 py-3 rounded-full text-[13px] font-bold items-center justify-center gap-1.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[250ms] ease-out bg-lumara-warm-black text-lumara-offwhite"
          style={{ fontFamily: 'var(--font-nunito)' }}
        >
          Ver bundle
        </div>
      </div>

      {/* Info */}
      <div className="pt-2.5 lg:pt-3.5">
        <div className="flex justify-between items-start gap-2.5">
          <div className="min-w-0 flex-1">
            <div
              className="text-[13px] lg:text-sm font-bold text-lumara-warm-black leading-[1.3] line-clamp-2 lg:truncate"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              {bundle.name}
            </div>
            <div
              className="text-[10px] lg:text-[11px] text-lumara-gray mt-0.5 truncate"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              {bundle.subtitle}
            </div>
          </div>
          <div className="flex-shrink-0 text-right">
            <div
              className="text-[14px] lg:text-[15px] font-bold text-lumara-warm-black whitespace-nowrap"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              €{bundle.bundlePrice.toFixed(2).replace('.', ',')}
            </div>
            <div
              className="text-[11px] lg:text-[12px] text-lumara-gray line-through whitespace-nowrap"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              €{bundle.originalTotal.toFixed(2).replace('.', ',')}
            </div>
          </div>
        </div>

        {/* Badge */}
        <div className="mt-1.5">
          <span
            className="text-[9px] font-bold tracking-[0.08em] uppercase text-lumara-gold"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            {bundle.badge} · Poupa €{bundle.savings.toFixed(2).replace('.', ',')}
          </span>
        </div>
      </div>
    </Link>
  );
}
