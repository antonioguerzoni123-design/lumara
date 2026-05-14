'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, ChevronDown, Star, ShoppingBag, Truck, ShieldCheck, RotateCcw, X } from 'lucide-react';
import { Product, driveImage } from '@/lib/products';
import { useCartStore } from '@/lib/cart';
import StatBar from '@/components/ui/StatBar';
import Badge from '@/components/ui/Badge';
import SectionLabel from '@/components/ui/SectionLabel';
import ProductCard from '@/components/ui/ProductCard';

function buildFaqs(product: { noReturns?: boolean }): { q: string; a: string }[] {
  return [
    {
      q: 'Qual é a política de devoluções?',
      a: product.noReturns
        ? 'Por razões de higiene e segurança, este produto não aceita devoluções após abertura da embalagem. Em caso de defeito ou dano no envio, contacta-nos com fotografias e resolvemos sem custos.'
        : 'Aceitamos devoluções em 30 dias após a recepção. O produto deve estar em condições originais.',
    },
    {
      q: 'Quanto tempo demora o envio?',
      a: 'Os envios para Portugal demoram 2–10 dias úteis com rastreamento incluído. Envio gratuito em encomendas iguais ou superiores a €40. Abaixo de €40, taxa de €3,99.',
    },
    {
      q: 'O produto tem garantia?',
      a: 'Todos os produtos electrónicos têm 2 anos de garantia legal. Para cosméticos, seguimos as recomendações do fabricante.',
    },
    {
      q: 'Como posso rastrear a minha encomenda?',
      a: 'Receberás um email com o número de rastreamento assim que a encomenda for expedida.',
    },
    {
      q: 'Posso usar em todo o tipo de cabelo?',
      a: 'Sim, salvo indicação contrária no produto. Recomendamos sempre ler as instruções específicas.',
    },
    {
      q: 'Os produtos são testados dermatologicamente?',
      a: 'Todos os produtos de skincare passaram por testes dermatológicos certificados.',
    },
  ];
}

type Props = {
  product: Product;
  related: Product[];
};

export default function ProductDetail({ product, related }: Props) {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);
  const [mainImgLoaded, setMainImgLoaded] = useState(false);
  const mainImgRef = useCallback((el: HTMLImageElement | null) => {
    if (el?.complete) setMainImgLoaded(true);
  }, []);
  const [selectedVariant, setSelectedVariant] = useState(product.defaultVariant ?? product.variants?.[0]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqs = buildFaqs(product);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  // Price shown: variant-specific if available, otherwise product base price
  const displayPrice = selectedVariant && product._shopifyVariantPrices?.[selectedVariant]
    ? product._shopifyVariantPrices[selectedVariant]
    : product.price;

  const handleVariantSelect = (v: string) => {
    setSelectedVariant(v);
  };

  const handleAdd = () => {
    const shopifyVariantId = selectedVariant
      ? (product._shopifyVariantIds?.[selectedVariant] ?? product._defaultVariantId ?? undefined)
      : (product._defaultVariantId ?? undefined);

    const priceToUse = selectedVariant && product._shopifyVariantPrices?.[selectedVariant]
      ? product._shopifyVariantPrices[selectedVariant]
      : product.price;

    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: priceToUse,
      image: product.images[0] ?? '',
      variant: selectedVariant,
      shopifyVariantId: shopifyVariantId ?? undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-10">
      <div className="pt-4 lg:pt-6">
        <button
          onClick={() => router.back()}
          aria-label="Voltar à página anterior"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-lumara-border bg-white hover:border-lumara-warm-black hover:bg-lumara-bg2 transition-colors text-lumara-warm-black"
        >
          <ArrowLeft size={18} strokeWidth={1.8} />
        </button>
      </div>
      <div className="py-6 lg:py-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20">
        <div className="space-y-3 lg:space-y-4">
          {/* Mobile: swipe carousel com peek + dots */}
          <div className="lg:hidden">
            <div
              className="
                flex overflow-x-auto snap-x snap-mandatory scroll-smooth
                gap-2 -mx-5 px-5 pb-1
                [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
              "
            >
              {product.images.map((imgId, i) => (
                <div
                  key={imgId}
                  className="snap-center flex-shrink-0 w-[88vw] aspect-square bg-lumara-nude-light rounded-lg overflow-hidden"
                >
                  <img
                    src={driveImage(imgId)}
                    alt={`${product.name} — imagem ${i + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder-product.svg'; }}
                  />
                </div>
              ))}
            </div>
            {product.images.length > 1 && (
              <div className="flex justify-center gap-1.5 mt-3" aria-hidden="true">
                {product.images.map((_, i) => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-lumara-pink-mid" />
                ))}
              </div>
            )}
          </div>

          {/* Desktop: main image + thumbnails */}
          <div className="hidden lg:block space-y-4">
            <div className="relative aspect-square bg-lumara-nude-light overflow-hidden">
              {!mainImgLoaded && (
                <div className="absolute inset-0 bg-lumara-bg2 animate-pulse" />
              )}
              <img
                ref={mainImgRef}
                src={driveImage(product.images[activeImage])}
                alt={`${product.name} — imagem ${activeImage + 1}`}
                className={`w-full h-full object-cover transition-opacity duration-300 ${mainImgLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setMainImgLoaded(true)}
                onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder-product.svg'; setMainImgLoaded(true); }}
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((imgId, i) => (
                  <button
                    key={imgId}
                    onClick={() => { setActiveImage(i); setMainImgLoaded(false); }}
                    className={`shrink-0 w-16 h-20 overflow-hidden border-b-2 transition-colors ${
                      activeImage === i ? 'border-lumara-gold' : 'border-transparent'
                    }`}
                    aria-label={`Ver imagem ${i + 1} de ${product.name}`}
                  >
                    <img
                      src={driveImage(imgId)}
                      alt={`${product.name} miniatura ${i + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder-product.svg'; }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:py-4 space-y-5 lg:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <SectionLabel>
                {product.category === 'cabelo'
                  ? 'Aparelhos de Cabelo'
                  : product.category === 'skincare'
                  ? 'Skin Care'
                  : 'Cuidados Capilares'}
              </SectionLabel>
              {product.badge && <Badge>{product.badge}</Badge>}
            </div>
            <h1
              className="text-3xl lg:text-4xl font-black text-lumara-warm-black leading-[1.1] tracking-[-0.02em]"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              {product.name}
            </h1>
            <p
              className="text-lumara-gray text-sm leading-relaxed"
              style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 400 }}
            >
              {product.hook}
            </p>
            <div className="flex items-baseline gap-3 flex-wrap">
              <p
                className="text-[28px] lg:text-2xl font-bold text-lumara-warm-black"
                style={{ fontFamily: 'var(--font-nunito)' }}
              >
                €{displayPrice.toFixed(2).replace('.', ',')}
              </p>
              {product.originalPrice && !selectedVariant && (
                <p
                  className="text-lg text-lumara-gray line-through"
                  style={{ fontFamily: 'var(--font-nunito)' }}
                >
                  €{product.originalPrice.toFixed(2).replace('.', ',')}
                </p>
              )}
              {product.discount && !selectedVariant && (
                <span
                  className="text-[13px] font-bold bg-lumara-gold text-white px-2.5 py-1 rounded-full"
                  style={{ fontFamily: 'var(--font-nunito)' }}
                >
                  -{product.discount}%
                </span>
              )}
            </div>
            {product.rating && product.reviewCount && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={13}
                      fill={i <= Math.round(product.rating!) ? '#E0689F' : 'none'}
                      stroke={i <= Math.round(product.rating!) ? '#E0689F' : '#9CA3AF'}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                <span
                  className="text-[13px] text-lumara-gray"
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  {product.rating} · Avaliado por {product.reviewCount} clientes
                </span>
              </div>
            )}
          </motion.div>

          {product.variants && product.variants.length > 0 && (
            <div className="space-y-3">
              <p
                className="text-[11px] tracking-[0.12em] uppercase text-lumara-gray"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                {selectedVariant
                  ? `Selecionado: ${selectedVariant}`
                  : 'Escolhe uma opção'}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => {
                  const variantPrice = product._shopifyVariantPrices?.[v];
                  return (
                    <button
                      key={v}
                      onClick={() => handleVariantSelect(v)}
                      className={`relative px-5 py-3 lg:px-4 lg:py-2 text-sm lg:text-xs rounded-full border transition-colors font-semibold ${
                        selectedVariant === v
                          ? 'border-lumara-warm-black bg-lumara-warm-black text-lumara-offwhite'
                          : 'border-lumara-border text-lumara-warm-black hover:border-lumara-warm-black hover:bg-lumara-bg2'
                      }`}
                      style={{ fontFamily: 'var(--font-nunito)' }}
                      aria-pressed={selectedVariant === v}
                    >
                      {v}
                      {variantPrice !== undefined && variantPrice !== product.price && (
                        <span className={`ml-1.5 text-[10px] font-normal ${selectedVariant === v ? 'opacity-70' : 'text-lumara-gray'}`}>
                          €{variantPrice.toFixed(2).replace('.', ',')}
                        </span>
                      )}
                      {v === product.bestValueVariant && (
                        <span className="absolute -top-2 -right-1 text-[8px] font-bold text-lumara-gold bg-white border border-lumara-gold px-1.5 py-0.5 rounded-full uppercase tracking-wide leading-none">
                          Melhor oferta
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <button
            onClick={handleAdd}
            className={`w-full px-8 py-4 text-[13px] font-bold tracking-[0.04em] uppercase rounded-full transition-all duration-200 flex items-center justify-center gap-2 ${added ? 'bg-emerald-500 text-white border border-emerald-500' : 'bg-lumara-warm-black text-lumara-offwhite border border-lumara-warm-black hover:bg-lumara-accent-dark hover:border-lumara-accent-dark'}`}
            style={{ fontFamily: 'var(--font-nunito)' }}
          >
            {added ? <><Check size={15} strokeWidth={2.5} /> Adicionado ao Carrinho</> : <><ShoppingBag size={15} strokeWidth={1.8} /> Adicionar ao Carrinho</>}
          </button>

          {/* Trust row sob CTA — mobile only, tom calmo */}
          <div
            className="lg:hidden flex items-center justify-center gap-3 text-[11px] text-lumara-gray pt-1"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            <span className="flex items-center gap-1"><Truck size={12} className="text-lumara-accent-dark" /> 2–10 dias</span>
            <span aria-hidden="true">·</span>
            {product.noReturns
              ? <span className="flex items-center gap-1 text-red-400"><X size={12} /> Sem devoluções</span>
              : <span className="flex items-center gap-1"><RotateCcw size={12} className="text-lumara-accent-dark" /> 30 dias</span>
            }
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-lumara-accent-dark" /> Seguro</span>
          </div>

          <div className="pt-2 border-t border-lumara-border">
            <p
              className="text-sm text-lumara-gray leading-relaxed"
              style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 400 }}
            >
              {product.description}
            </p>
          </div>

          <div className="space-y-3">
            <p
              className="text-[11px] tracking-[0.12em] uppercase text-lumara-gray"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              O que inclui
            </p>
            <ul className="space-y-2">
              {product.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Check size={14} className="text-lumara-gold mt-0.5 shrink-0" />
                  <span
                    className="text-sm text-lumara-warm-black"
                    style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 400 }}
                  >
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {product.includedItems && product.includedItems.length > 0 && (
            <div className="space-y-3">
              <p
                className="text-[11px] tracking-[0.12em] uppercase text-lumara-gray"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                O que está incluído
              </p>
              <ul className="space-y-1.5">
                {product.includedItems.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-lumara-gold shrink-0" />
                    <span
                      className="text-sm text-lumara-warm-black"
                      style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 400 }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <section className="py-16 border-t border-lumara-border" aria-label="Resultados comprovados">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3 mb-10"
          >
            <SectionLabel>Resultados Comprovados</SectionLabel>
            <h2
              className="text-2xl font-bold text-lumara-warm-black tracking-[-0.02em]"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              Os números falam por si.
            </h2>
          </motion.div>
          <div className="space-y-8">
            {product.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <StatBar percent={stat.percent} claim={stat.claim} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-lumara-border" aria-label="Perguntas frequentes">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3 mb-10"
          >
            <SectionLabel>Perguntas Frequentes</SectionLabel>
            <h2
              className="text-2xl font-bold text-lumara-warm-black tracking-[-0.02em]"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              Temos respostas.
            </h2>
          </motion.div>
          <div className="divide-y divide-lumara-border">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left gap-4"
                  aria-expanded={openFaq === i}
                >
                  <span
                    className="text-sm text-lumara-warm-black"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-lumara-gray shrink-0 transition-transform duration-200 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pb-5"
                  >
                    <p
                      className="text-sm text-lumara-gray leading-relaxed"
                      style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 400 }}
                    >
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 border-t border-lumara-border" aria-label="Outros produtos relacionados">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3 mb-10"
          >
            <SectionLabel>Outros que podem interessar-te</SectionLabel>
            <h2
              className="text-2xl font-bold text-lumara-warm-black tracking-[-0.02em]"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              Da mesma família.
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {related.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
