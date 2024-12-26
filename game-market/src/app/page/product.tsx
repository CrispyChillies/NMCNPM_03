'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '@/components/product-card';
import { ProductFilters } from '@/components/product-filters';

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

interface ProductCardProps {
  name: string
  price: number
  rating: number
  image: string
  reviews?: number     // Make optional
  badges?: {           // Make optional
    label: string
    icon: React.ReactNode
  }[]
  discount?: string
  showBadge?: boolean
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [productsToShow, setProductsToShow] = useState(50);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:6969/api/game${query ? `?query=${query}` : ''}`);
        const data = await response.json();
        setProducts(data);
        setDisplayedProducts(data.slice(0, productsToShow));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [query, productsToShow]);

  const handleShowMore = () => {
    setProductsToShow(productsToShow + 50);
    setDisplayedProducts(products.slice(0, productsToShow + 50));
  };

  const handleReset = () => {
    setDisplayedProducts(products.slice(0, 50));
    setProductsToShow(50);
  };

  const applyFilters = (
    platforms: string[], 
    genres: string[], 
    conditions: string[],
    statuses: string[],
    tags: string[],
    sortBy: string
  ) => {
    let filtered = [...products];

    if (platforms.length) {
      filtered = filtered.filter(product =>
        platforms.includes(product.platform)
      );
    }

    if (genres.length) {
      filtered = filtered.filter(product =>
        genres.includes(product.genre)
      );
    }

    if (conditions.length) {
      filtered = filtered.filter(product =>
        conditions.includes(product.condition)
      );
    }

    if (statuses.length) {
      filtered = filtered.filter(product =>
        statuses.includes(product.status)
      );
    }

    if (tags.length) {
      filtered = filtered.filter(product =>
        tags.includes(product.tag)
      );
    }

    const [field, direction] = sortBy.split('-');
    if (field === 'price' || field === 'rating') {
      filtered.sort((a, b) =>
        direction === 'asc' ? a[field] - b[field] : b[field] - a[field]
      );
    }

    setDisplayedProducts(filtered.slice(0, productsToShow));
  };

  return (
    <>
      <ProductFilters onApplyFilters={applyFilters} onReset={handleReset} />
      <div className="w-full px-6 py-4 flex justify-center">
        <div className="flex flex-wrap gap-4 justify-center ml-[0%]">
          {displayedProducts.map((product) => (
            <div className="w-[250px] flex-shrink-0" key={product.productId}>
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
                productId={product.productId} // Pass productId prop
              />
            </div>
          ))}
        </div>
      </div>
      {productsToShow < products.length && (
        <div className="w-full flex justify-center py-4">
          <button onClick={handleShowMore} className="px-4 py-2 bg-foreground text-background rounded-lg">
            Show more
          </button>
        </div>
      )}
    </>
  );
}