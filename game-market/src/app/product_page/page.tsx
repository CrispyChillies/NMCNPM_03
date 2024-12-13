'use client';

import { useState } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { ProductCard } from '@/components/product-card';
import { Header } from '@/components/header';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { ProductFilters } from '@/components/poduct-filters'

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
    type: 'truck' | 'creditCard';
  }[];
  platforms?: string[];
  genres?: string[];
  condition?: string;
}

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  }
};

const products: Product[] = [
  {
    id: 1,
    name: 'The Legend of Zelda: Breath of the Wild',
    price: 59.99,
    category: 'Adventure',
    rating: 4.9,
    reviews: 1023,
    discount: '10%',
    image: 'zelda.jpg',
    badges: [
      { label: 'Top Seller', type: 'creditCard' },
    ],
    platforms: ['Nintendo Switch'],
    genres: ['Adventure', 'Action', 'Open World'],
    condition: 'New',
  },
  {
    id: 2,
    name: 'God of War',
    price: 49.99,
    category: 'Action',
    rating: 4.8,
    reviews: 879,
    image: 'god_of_war.jpg',
    badges: [
      { label: 'Limited Edition', type: 'creditCard' },
    ],
    platforms: ['PlayStation 4', 'PlayStation 5'],
    genres: ['Action', 'Adventure', 'Mythology'],
    condition: 'Good',
  },
  {
    id: 3,
    name: 'Red Dead Redemption 2',
    price: 39.99,
    category: 'Adventure',
    rating: 4.7,
    reviews: 754,
    image: 'rdr2.jpg',
    badges: [
      { label: 'Best Graphics', type: 'creditCard' },
    ],
    platforms: ['PlayStation 4', 'Xbox One', 'PC'],
    genres: ['Adventure', 'Action', 'Western'],
    condition: 'Like New',
  },
  {
    id: 4,
    name: 'Super Mario Odyssey',
    price: 59.99,
    category: 'Platformer',
    rating: 4.9,
    reviews: 980,
    image: 'mario_odyssey.jpg',
    badges: [
      { label: 'Family Friendly', type: 'creditCard' },
    ],
    platforms: ['Nintendo Switch'],
    genres: ['Platformer', 'Adventure'],
    condition: 'Fair',
  },
  {
    id: 5,
    name: 'Spider-Man',
    price: 49.99,
    category: 'Action',
    rating: 4.8,
    reviews: 845,
    image: 'spiderman.jpg',
    badges: [
      { label: 'Exclusive', type: 'creditCard' },
    ],
    platforms: ['PlayStation 4'],
    genres: ['Action', 'Adventure'],
    condition: 'New',
  },
  {
    id: 6,
    name: 'Horizon Zero Dawn',
    price: 29.99,
    category: 'RPG',
    rating: 4.6,
    reviews: 623,
    image: 'horizon_zero_dawn.jpg',
    badges: [
      { label: 'Award Winning', type: 'creditCard' },
    ],
    platforms: ['PlayStation 4', 'PC'],
    genres: ['RPG', 'Action', 'Open World'],
    condition: 'Good',
  },
  {
    id: 7,
    name: 'Minecraft',
    price: 19.99,
    category: 'Sandbox',
    rating: 4.5,
    reviews: 1500,
    image: 'minecraft.jpg',
    badges: [
      { label: 'Top Seller', type: 'creditCard' },
    ],
    platforms: ['PC', 'Xbox One', 'PlayStation 4', 'Nintendo Switch'],
    genres: ['Sandbox', 'Adventure'],
    condition: 'Fair',
  },
  {
    id: 8,
    name: 'Fortnite',
    price: 0,
    category: 'Battle Royale',
    rating: 4.3,
    reviews: 2000,
    image: 'fortnite.jpg',
    badges: [
      { label: 'Free to Play', type: 'creditCard' },
    ],
    platforms: ['PC', 'Xbox One', 'PlayStation 4', 'Nintendo Switch'],
    genres: ['Battle Royale', 'Shooter'],
    condition: 'Like New',
  },
  {
    id: 9,
    name: 'The Witcher 3: Wild Hunt',
    price: 39.99,
    category: 'RPG',
    rating: 4.9,
    reviews: 1120,
    image: 'witcher3.jpg',
    badges: [
      { label: 'Game of the Year', type: 'creditCard' },
    ],
    platforms: ['PC', 'Xbox One', 'PlayStation 4'],
    genres: ['RPG', 'Action', 'Open World'],
    condition: 'Good',
  },
  {
    id: 10,
    name: 'Cyberpunk 2077',
    price: 59.99,
    category: 'RPG',
    rating: 4.2,
    reviews: 500,
    image: 'cyberpunk2077.jpg',
    badges: [
      { label: 'New Release', type: 'creditCard' },
    ],
    platforms: ['PC', 'Xbox One', 'PlayStation 4'],
    genres: ['RPG', 'Action', 'Open World'],
    condition: 'Fair',
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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen h-4 overflow-hidden">
        <Header user={data.user} className="sticky top-0 z-10 bg-background" />
        <main className="flex-grow overflow-y-auto">
          <div className="flex-1 overflow-auto bg-background border-gray-700">
            <ProductFilters
              onApplyFilters={applyFilters}
            />
            <div className="w-full px-6 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredProducts.map((product) => (
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
                ))}
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
