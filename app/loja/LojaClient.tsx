'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Product } from '@/lib/products';
import { Bundle } from '@/data/bundles';
import ProductCard from '@/components/ui/ProductCard';
import BundleCard from '@/components/ui/BundleCard';
import SectionLabel from '@/components/ui/SectionLabel';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

type Category = Product['category'] | 'all' | 'promocoes';
type SortOption = 'featured' | 'price-asc' | 'price-desc';

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'cabelo', label: 'Aparelhos' },
  { value: 'skincare', label: 'Skin care' },
  { value: 'cuidados', label: 'Cuidados capilares' },
  { value: 'promocoes', label: 'Promoções' },
];

function LojaContent({ products, bundles }: { products: Product[]; bundles: Bundle[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Derivar categoria directamente do URL — garante coerência com historial do browser
  const category: Category = (searchParams.get('categoria') as Category) || 'all';
  const [sort, setSort] = useState<SortOption>('featured');

  const setCategory = (cat: Category) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === 'all') {
      params.delete('categoria');
    } else {
      params.set('categoria', cat as string);
    }
    const qs = params.toString();
    router.replace(`/loja${qs ? `?${qs}` : ''}`);
  };

  const filteredProducts = products
    .filter((p) => {
      if (category === 'all') return true;
      if (category === 'promocoes') return false;
      return p.category === category;
    })
    .sort((a, b) => {
      if (sort === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      if (sort === 'price-asc') return a.price - b.price;
      return b.price - a.price;
    });

  // Variant deals: products with featuredPromoVariant set (non-empty)
  const variantDeals = products.filter((p) => p.featuredPromoVariant);

  const getTabCount = (cat: Category) => {
    if (cat === 'all') return products.length + bundles.length;
    if (cat === 'promocoes') return bundles.length + variantDeals.length;
    return products.filter((p) => p.category === cat).length;
  };

  const isPromo = category === 'promocoes';
  const isAll = category === 'all';
  const isEmpty = !isPromo && filteredProducts.length === 0;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-lumara-offwhite">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 space-y-2"
          >
            <SectionLabel>Loja</SectionLabel>
            <h1
              className="text-4xl md:text-5xl font-extrabold text-lumara-warm-black tracking-[-0.02em]"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              Tudo o que funciona.
            </h1>
          </motion.div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const count = getTabCount(cat.value);
                const active = category === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setCategory(cat.value)}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                      active
                        ? 'bg-lumara-warm-black text-lumara-offwhite'
                        : 'bg-lumara-bg2 text-lumara-warm-black hover:bg-lumara-accent-soft'
                    }`}
                    style={{ fontFamily: 'var(--font-nunito)' }}
                  >
                    {cat.label}
                    <span
                      className={`ml-1.5 text-[11px] ${
                        active ? 'opacity-60' : 'text-lumara-gray'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {!isPromo && (
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="text-sm text-lumara-warm-black bg-lumara-bg2 border-none rounded-full px-4 py-2.5 outline-none cursor-pointer hover:bg-lumara-accent-soft transition-colors"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
                aria-label="Ordenar produtos"
              >
                <option value="featured">Em Destaque</option>
                <option value="price-asc">Preço: Menor</option>
                <option value="price-desc">Preço: Maior</option>
              </select>
            )}
          </div>

          {isEmpty ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center space-y-4"
            >
              <p
                className="text-3xl font-bold text-lumara-warm-black tracking-[-0.02em]"
                style={{ fontFamily: 'var(--font-nunito)' }}
              >
                Nada encontrado.
              </p>
              <p
                className="text-sm text-lumara-gray"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                Experimenta outra categoria.
              </p>
              <button
                onClick={() => setCategory('all')}
                className="mt-2 px-6 py-3 rounded-full bg-lumara-warm-black text-lumara-offwhite text-sm font-bold"
                style={{ fontFamily: 'var(--font-nunito)' }}
              >
                Ver todos
              </button>
            </motion.div>
          ) : isPromo ? (
            /* Promoções: bundles + variant deals */
            <div className="space-y-12">
              {/* Bundles */}
              {bundles.length > 0 && (
                <div>
                  <p
                    className="text-[11px] tracking-[0.12em] uppercase text-lumara-gray mb-6"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    Bundles
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
                    {bundles.map((bundle, i) => (
                      <motion.div
                        key={bundle.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.04 }}
                      >
                        <BundleCard bundle={bundle} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Variant deals */}
              {variantDeals.length > 0 && (
                <div>
                  <p
                    className="text-[11px] tracking-[0.12em] uppercase text-lumara-gray mb-6"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    Packs & Multi-unidades
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
                    {variantDeals.map((p, i) => {
                      const featuredVariant = p.featuredPromoVariant!;
                      const variantPrice = p._shopifyVariantPrices?.[featuredVariant] ?? p.price;
                      const variantProduct: Product = {
                        ...p,
                        price: variantPrice,
                        originalPrice: p.price,
                        discount: undefined,
                        badge: featuredVariant,
                      };
                      return (
                        <motion.div
                          key={`${p.id}-promo`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: (bundles.length + i) * 0.04 }}
                        >
                          <ProductCard product={variantProduct} />
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Todos + categorias: produtos regulares + bundles no fim (apenas em 'all') */
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
              {isAll && bundles.map((bundle, i) => (
                <motion.div
                  key={bundle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: (filteredProducts.length + i) * 0.04 }}
                >
                  <BundleCard bundle={bundle} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function LojaClient({ products, bundles }: { products: Product[]; bundles: Bundle[] }) {
  return (
    <Suspense>
      <LojaContent products={products} bundles={bundles} />
    </Suspense>
  );
}
