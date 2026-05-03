import { notFound } from 'next/navigation';
import { bundles, getBundleBySlug } from '@/data/bundles';
import { getProductByHandle } from '@/lib/shopify';
import type { Product } from '@/lib/products';
import BundleDetail from './BundleDetail';
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

  const products = (
    await Promise.all(bundle.productSlugs.map((s) => getProductByHandle(s)))
  ).filter(Boolean) as Product[];

  return (
    <>
      <Navbar />
      <main>
        <BundleDetail bundle={bundle} products={products} />
      </main>
      <Footer />
    </>
  );
}
