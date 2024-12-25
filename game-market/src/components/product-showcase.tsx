// filepath: src/components/product-showcase.tsx
import { useState } from 'react';
import { ProductCard } from './product-card';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface Product {
  productId: number;
  sellerId: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  platform: string;
  genre: string;
  condition: string;
  image: string;
  status: string;
  releaseDay: string;
  tag: string;
  rating: number;
}

interface ProductShowcaseProps {
  category: string;
  products: Product[];
}

export function ProductShowcase({ category, products }: ProductShowcaseProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedProducts = showAll ? products : products.slice(0, 8);

  return (
    <section className="py-8">
      <h2 className="text-xl font-bold mb-4 ml-10">{category}</h2>
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4">
          {displayedProducts.map((product) => (
            <div key={product.productId} className="w-[250px] flex-shrink-0">
              <ProductCard
                name={product.name}
                price={product.price}
                rating={product.rating}
                image={product.image}
                badges={[{
                  label: "Free Shipping",
                  icon: <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                }]}
                showBadge={true}
              />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {products.length > 8 && (
        <div className="mt-1 text-right">
          <Button variant="link" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show less" : "Show more"}
          </Button>
        </div>
      )}
    </section>
  );
}