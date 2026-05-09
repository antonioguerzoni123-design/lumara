import { notFound } from 'next/navigation';
import { bundles, getBundleBySlug } from '@/data/bundles';
import { getProductByHandle } from '@/lib/shopify';
import { getAdminBundleProduct } from '@/lib/shopifyAdmin';
import type { Product } from '@/lib/products';
import BundleDetail, { type ShopifyBundleProduct } from './BundleDetail';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export async function generateStaticParams() {
  return bundles.map((b) => ({ slug: b.id }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const bundle = getBundleBySlug(slug);
  if (!bundle) return {};
  return {
    title: `${bundle.name} — Lumara`,
    description: bundle.headline,
  };
}

export default async function BundlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const bundle = getBundleBySlug(slug);
  if (!bundle) notFound();

  const [products, bundleProduct] = await Promise.all([
    Promise.all(bundle.productSlugs.map((s) => getProductByHandle(s))).then(
      (arr) => arr.filter(Boolean) as Product[]
    ),
    bundle.shopifyHandle ? getAdminBundleProduct(bundle.shopifyHandle) as Promise<ShopifyBundleProduct | null> : Promise.resolve(null),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <BundleDetail bundle={bundle} products={products} bundleProduct={bundleProduct} />
      </main>
      <Footer />
    </>
  );
}
