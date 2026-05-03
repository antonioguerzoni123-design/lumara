'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronDown, Star } from 'lucide-react';
import { Product, driveImage } from '@/lib/products';
import { useCartStore } from '@/lib/cart';
import StatBar from '@/components/ui/StatBar';
import Badge from '@/components/ui/Badge';
import SectionLabel from '@/components/ui/SectionLabel';
import ProductCard from '@/components/ui/ProductCard';
import Button from '@/components/ui/Button';

const FAQS: { q: string; a: string }[] = [
  {
    q: 'Qual é a política de devoluções?',
    a: 'Aceitamos devoluções em 30 dias após a recepção. O produto deve estar em condições originais.',
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

type Props = {
  product: Product;
  related: Product[];
};

export default function ProductDetail({ product, related }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
      <div className="py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div className="space-y-4">
          <div className="aspect-square bg-lumara-nude-light overflow-hidden">
            <img
              src={driveImage(product.images[activeImage])}
              alt={`${product.name} — imagem ${activeImage + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((imgId, i) => (
                <button
                  key={imgId}
                  onClick={() => setActiveImage(i)}
                  className={`shrink-0 w-16 h-20 overflow-hidden border-b-2 transition-colors ${
                    activeImage === i ? 'border-lumara-gold' : 'border-transparent'
                  }`}
                  aria-label={`Ver imagem ${i + 1} de ${product.name}`}
                >
                  <img
                    src={driveImage(imgId)}
                    alt={`${product.name} miniatura ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:py-4 space-y-8">
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
                className="text-2xl font-bold text-lumara-warm-black"
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
                      className={`px-4 py-2 text-xs rounded-full border transition-colors font-semibold ${
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
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <Button onClick={handleAdd} size="lg" className="w-full">
            Adicionar ao Carrinho
          </Button>

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
            {FAQS.map((faq, i) => (
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
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
