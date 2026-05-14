import { getAllProducts } from '@/lib/shopify';
import { bundles } from '@/data/bundles';
import LojaClient from './LojaClient';

export default async function LojaPage() {
  const products = await getAllProducts();
  return <LojaClient products={products} bundles={bundles} />;
}
