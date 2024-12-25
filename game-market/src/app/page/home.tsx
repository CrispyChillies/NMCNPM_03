import { useEffect, useState } from 'react';
import { CarouselBanner } from "@/components/banner";
import { ProductShowcase } from "@/components/product-showcase";
import banner1 from "@/images/banner1.jpg";
import banner2 from "@/images/banner2.jpg";
import banner3 from "@/images/banner3.jpg";

const banner = [banner1, banner2, banner3];

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

const categoryNames: { [key: string]: string } = {
  newReleases: "New Releases",
  bestSellers: "Best Sellers",
  comingSoon: "Coming Soon",
  specialOffers: "Special Offers"
};

export default function HomePage() {
  const [productsByTag, setProductsByTag] = useState<{ [key: string]: Product[] }>({});
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async (tag: string) => {
      try {
        const response = await fetch(`http://localhost:6969/api/game?tag=${tag}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching products:', error);
        return [];
      }
    };

    const fetchAllProducts = async () => {
      const tags = ['newReleases', 'bestSellers', 'comingSoon', 'specialOffers'];
      const productsByTag = await Promise.all(tags.map(tag => fetchProducts(tag)));
      const productsByTagMap = tags.reduce((acc, tag, index) => {
        acc[tag] = productsByTag[index];
        return acc;
      }, {} as { [key: string]: Product[] });
      setProductsByTag(productsByTagMap);

      const allProductsResponse = await fetch('http://localhost:6969/api/game');
      const allProducts = await allProductsResponse.json();
      setRecommendedProducts(allProducts.sort(() => 0.5 - Math.random()).slice(0, 8));
    };

    fetchAllProducts();
  }, []);

  return (
    <>
      <CarouselBanner images={banner} />
      <ProductShowcase
        category="Recommend for You"
        products={recommendedProducts}
      />
      {Object.entries(productsByTag).map(([tag, products], index) => (
        <ProductShowcase
          key={index}
          category={categoryNames[tag] || tag}
          products={products}
        />
      ))}
    </>
  );
}