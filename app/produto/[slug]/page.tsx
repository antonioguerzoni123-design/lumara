import { notFound } from 'next/navigation';
import { getProductByHandle, getAllProducts } from '@/lib/shopify';
import { Product } from '@/lib/products';
import ProductDetail from './ProductDetail';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p: { slug: string }) => ({ slug: p.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductByHandle(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Lumara`,
    description: product.headline,
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([
    getProductByHandle(slug) as Promise<Product | null>,
    getAllProducts() as Promise<Product[]>,
  ]);

  if (!product) notFound();

  const related = allProducts
    .filter((p) => p.category === product.category && p.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="bg-lumara-offwhite min-h-screen">
        <ProductDetail product={product} related={related} />
      </main>
      <Footer />
    </>
  );
}
