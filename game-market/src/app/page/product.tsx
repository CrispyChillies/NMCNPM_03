'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/product-card';
import { ProductFilters } from '@/components/product-filters'
import { CreditCard, Truck } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  reviews: number;
  discount?: string;
  image: string;
  badges: {
    label: string;
    icon: React.ReactNode;
  }[];
  platforms?: string[];
  genres?: string[];
  condition?: string;
}


const products: Product[] = [
  {
    id: 1,
    name: 'The Witcher 3',
    price: 39.99,
    category: 'RPG',
    rating: 4.9,
    reviews: 1000,
    discount: '20% OFF',
    image: 'https://i0.wp.com/safezonegames.com/wp-content/uploads/2023/03/Sword-Art.webp?fit=1920%2C1080&ssl=1',
    badges: [
      { label: 'Best Seller', icon: <Truck className='h-4 w-4' /> },
      { label: 'Top Rated', icon: <CreditCard className='h-4 w-4' /> },
    ],
    platforms: ['PlayStation 4', 'Xbox One', 'PC'],
    genres: ['Action', 'RPG'],
    condition: 'New',
  },
  {
    id: 2,
    name: 'FIFA 22',
    price: 59.99,
    category: 'Sports',
    rating: 4.5,
    reviews: 500,
    image: 'https://i0.wp.com/safezonegames.com/wp-content/uploads/2023/03/Sword-Art.webp?fit=1920%2C1080&ssl=1',
    badges: [
      { label: 'New', icon: <Truck className='h-4 w-4' /> },
    ],
    platforms: ['PlayStation 5', 'Xbox Series X', 'PC'],
    genres: ['Sports'],
    condition: 'New',
  },
  {
    id: 3,
    name: 'Call of Duty: Vanguard',
    price: 69.99,
    category: 'FPS',
    rating: 4.7,
    reviews: 800,
    image: 'https://i0.wp.com/safezonegames.com/wp-content/uploads/2023/03/Sword-Art.webp?fit=1920%2C1080&ssl=1',
    badges: [
      { label: 'New', icon: <Truck className='h-4 w-4' /> },
    ],
    platforms: ['PlayStation 5', 'Xbox Series X', 'PC'],
    genres: ['FPS'],
    condition: 'New',
  },
  {
    id: 4,
    name: 'Red Dead Redemption 2',
    price: 49.99,
    category: 'Action',
    rating: 4.8,
    reviews: 900,
    discount: '10% OFF',
    image: 'https://i0.wp.com/safezonegames.com/wp-content/uploads/2023/03/Sword-Art.webp?fit=1920%2C1080&ssl=1',
    badges: [
      { label: 'Best Seller', icon: <Truck className='h-4 w-4' /> },
    ],
    platforms: ['PlayStation 4', 'Xbox One', 'PC'],
    genres: ['Action', 'Adventure'],
    condition: 'New',
  },
  {
    id: 5,
    name: 'Cyberpunk 2077',
    price: 59.99,
    category: 'RPG',
    rating: 4.3,
    reviews: 600,
    image: 'https://i0.wp.com/safezonegames.com/wp-content/uploads/2023/03/Sword-Art.webp?fit=1920%2C1080&ssl=1',
    badges: [
      { label: 'New', icon: <Truck className='h-4 w-4' /> },
    ],
    platforms: ['PlayStation 4', 'Xbox One', 'PC'],
    genres: ['Action', 'RPG'],
    condition: 'New',
  },
  {
    id: 6,
    name: 'Minecraft',
    price: 26.95,
    category: 'Sandbox',
    rating: 4.6,
    reviews: 700,
    image: 'https://i0.wp.com/safezonegames.com/wp-content/uploads/2023/03/Sword-Art.webp?fit=1920%2C1080&ssl=1',
    badges: [
      { label: 'Top Rated', icon: <CreditCard className='h-4 w-4' /> },
    ],
    platforms: ['PlayStation 4', 'Xbox One', 'Nintendo Switch', 'PC'],
    genres: ['Sandbox'],
    condition: 'New',
  },
  {
    id: 7,
    name: 'Assassin\'s Creed Valhalla',
    price: 49.99,
    category: 'Action',
    rating: 4.4,
    reviews: 400,
    image: 'https://i0.wp.com/safezonegames.com/wp-content/uploads/2023/03/Sword-Art.webp?fit=1920%2C1080&ssl=1',
    badges: [
      { label: 'New', icon: <Truck className='h-4 w-4' /> },
    ],
    platforms: ['PlayStation 5', 'Xbox Series X', 'PC'],
    genres: ['Action', 'RPG'],
    condition: 'New',
  },
  {
    id: 8,
    name: 'Halo Infinite',
    price: 59.99,
    category: 'FPS',
    rating: 4.6,
    reviews: 500,
    image: 'https://i0.wp.com/safezonegames.com/wp-content/uploads/2023/03/Sword-Art.webp?fit=1920%2C1080&ssl=1',
    badges: [
      { label: 'Top Rated', icon: <CreditCard className='h-4 w-4' /> },
    ],
    platforms: ['Xbox Series X', 'PC'],
    genres: ['FPS'],
    condition: 'New',
  },
  {
    id: 9,
    name: 'Fortnite',
    price: 0,
    category: 'Battle Royale',
    rating: 4.2,
    reviews: 1000,
    image: 'https://i0.wp.com/safezonegames.com/wp-content/uploads/2023/03/Sword-Art.webp?fit=1920%2C1080&ssl=1',
    badges: [
      { label: 'Best Seller', icon: <Truck className='h-4 w-4' /> },
    ],
    platforms: ['PlayStation 4', 'Xbox One', 'PC', 'Nintendo Switch'],
    genres: ['Battle Royale'],
    condition: 'New',
  },
  {
    id: 10,
    name: 'Among Us',
    price: 4.99,
    category: 'Party',
    rating: 4.1,
    reviews: 300,
    image: 'https://i0.wp.com/safezonegames.com/wp-content/uploads/2023/03/Sword-Art.webp?fit=1920%2C1080&ssl=1',
    badges: [
      { label: 'New', icon: <Truck className='h-4 w-4' /> },
    ],
    platforms: ['PC', 'Mobile'],
    genres: ['Party'],
    condition: 'New',
  },
  {
    id: 11,
    name: 'Genshin Impact',
    price: 0,
    category: 'RPG',
    rating: 4.5,
    reviews: 700,
    image: 'https://i0.wp.com/safezonegames.com/wp-content/uploads/2023/03/Sword-Art.webp?fit=1920%2C1080&ssl=1',
    badges: [
      { label: 'Top Rated', icon: <CreditCard className='h-4 w-4' /> },
    ],
    platforms: ['PlayStation 4', 'PC', 'Mobile'],
    genres: ['Action', 'RPG'],
    condition: 'New',
  },
  {
    id: 12,
    name: 'Apex Legends',
    price: 0,
    category: 'Battle Royale',
    rating: 4.3,
    reviews: 600,
    image: 'https://i0.wp.com/safezonegames.com/wp-content/uploads/2023/03/Sword-Art.webp?fit=1920%2C1080&ssl=1',
    badges: [
      { label: 'Best Seller', icon: <Truck className='h-4 w-4' /> },
    ],
    platforms: ['PlayStation 4', 'Xbox One', 'PC'],
    genres: ['Battle Royale'],
    condition: 'New',
  },
  {
    id: 13,
    name: 'Valorant',
    price: 0,
    category: 'FPS',
    rating: 4.4,
    reviews: 800,
    image: 'https://i0.wp.com/safezonegames.com/wp-content/uploads/2023/03/Sword-Art.webp?fit=1920%2C1080&ssl=1',
    badges: [
      { label: 'Top Rated', icon: <CreditCard className='h-4 w-4' /> },
    ],
    platforms: ['PC'],
    genres: ['FPS'],
    condition: 'New',
  },
  {
    id: 14,
    name: 'League of Legends',
    price: 0,
    category: 'MOBA',
    rating: 4.7,
    reviews: 900,
    image: 'https://i0.wp.com/safezonegames.com/wp-content/uploads/2023/03/Sword-Art.webp?fit=1920%2C1080&ssl=1',
    badges: [
      { label: 'Best Seller', icon: <Truck className='h-4 w-4' /> },
    ],
    platforms: ['PC'],
    genres: ['MOBA'],
    condition: 'New',
  },
  {
    id: 15,
    name: 'Overwatch',
    price: 39.99,
    category: 'FPS',
    rating: 4.5,
    reviews: 700,
    image: 'https://i0.wp.com/safezonegames.com/wp-content/uploads/2023/03/Sword-Art.webp?fit=1920%2C1080&ssl=1',
    badges: [
      { label: 'Top Rated', icon: <CreditCard className='h-4 w-4' /> },
    ],
    platforms: ['PlayStation 4', 'Xbox One', 'PC'],
    genres: ['FPS'],
    condition: 'New',
  },
  {
    id: 16,
    name: 'The Sims 4',
    price: 19.99,
    category: 'Simulation',
    rating: 4.3,
    reviews: 500,
    image: 'https://i0.wp.com/safezonegames.com/wp-content/uploads/2023/03/Sword-Art.webp?fit=1920%2C1080&ssl=1',
    badges: [
      { label: 'Best Seller', icon: <Truck className='h-4 w-4' /> },
    ],
    platforms: ['PlayStation 4', 'Xbox One', 'PC'],
    genres: ['Simulation'],
    condition: 'New',
  },
  {
    id: 17,
    name: 'Stardew Valley',
    price: 14.99,
    category: 'Simulation',
    rating: 4.8,
    reviews: 600,
    image: 'https://i0.wp.com/safezonegames.com/wp-content/uploads/2023/03/Sword-Art.webp?fit=1920%2C1080&ssl=1',
    badges: [
      { label: 'Top Rated', icon: <CreditCard className='h-4 w-4' /> },
    ],
    platforms: ['PlayStation 4', 'Xbox One', 'Nintendo Switch', 'PC'],
    genres: ['Simulation', 'RPG'],
    condition: 'New',
  },
];

export default function Page() {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const applyFilters = (platforms: string[], genres: string[], conditions: string[], sortBy: string) => {
    let filtered = [...products];

    if (platforms.length > 0) {
      filtered = filtered.filter(product =>
        platforms.some(platform => product.platforms?.includes(platform))
      );
    }

    if (genres.length > 0) {
      filtered = filtered.filter(product =>
        genres.some(genre => product.genres?.includes(genre))
      );
    }

    if (conditions.length > 0) {
      filtered = filtered.filter(product =>
        conditions.some(condition => product.condition === condition)
      );
    }

    const [field, direction] = sortBy.split('-');
    if (field === 'price' || field === 'rating') {
      filtered.sort((a, b) =>
        direction === 'asc' ? a[field] - b[field] : b[field] - a[field]
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <>
      <ProductFilters
        onApplyFilters={applyFilters}
      />
      <div className="w-full px-6 py-4 flex justify-center">
        <div className="flex flex-wrap gap-4 justify-start ml-[5%]">
          {filteredProducts.map((product) => (
            <div className="w-[250px] flex-shrink-0">
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                rating={product.rating}
                reviews={product.reviews}
                discount={product.discount}
                image={product.image}
                badges={product.badges}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
