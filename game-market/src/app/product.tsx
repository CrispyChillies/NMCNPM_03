'use client';

import { useState } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { ProductCard } from '@/components/product-card';
import { Header } from '@/components/header';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { ProductFilters } from '@/components/product-filters'

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
    condition: 'Used',
  },
  {
    id: 3,
    name: 'Red Dead Redemption 2',
    price: 39.99,
    category: 'Adventure',
    rating: 4.7,
    reviews: 850,
    image: 'rdr2.jpg',
    badges: [
      { label: 'Free Shipping', type: 'truck' },
    ],
    platforms: ['PlayStation 4', 'Xbox One', 'PC'],
    genres: ['Action', 'Adventure', 'Western'],
    condition: 'Refurbished',
  },
  {
    id: 4,
    name: 'Super Mario Odyssey',
    price: 49.99,
    category: 'Platformer',
    rating: 4.8,
    reviews: 920,
    image: 'super_mario_odyssey.jpg',
    badges: [
      { label: 'Best Seller', type: 'creditCard' },
    ],
    platforms: ['Nintendo Switch'],
    genres: ['Platformer', 'Adventure'],
    condition: 'New',
  },
  {
    id: 5,
    name: 'The Last of Us Part II',
    price: 59.99,
    category: 'Action',
    rating: 4.6,
    reviews: 1020,
    image: 'last_of_us_2.jpg',
    badges: [
      { label: 'Award Winner', type: 'creditCard' },
    ],
    platforms: ['PlayStation 4'],
    genres: ['Action', 'Adventure', 'Survival'],
    condition: 'New',
  },
  {
    id: 6,
    name: 'Halo Infinite',
    price: 59.99,
    category: 'Shooter',
    rating: 4.5,
    reviews: 800,
    discount: '15%',
    image: 'halo_infinite.jpg',
    badges: [
      { label: 'Pre-Order', type: 'creditCard' },
    ],
    platforms: ['Xbox Series X', 'Xbox One', 'PC'],
    genres: ['Shooter', 'Sci-Fi'],
    condition: 'New',
  },
  {
    id: 7,
    name: 'Cyberpunk 2077',
    price: 49.99,
    category: 'RPG',
    rating: 4.0,
    reviews: 700,
    image: 'cyberpunk_2077.jpg',
    badges: [
      { label: 'Discount', type: 'creditCard' },
    ],
    platforms: ['PlayStation 4', 'Xbox One', 'PC'],
    genres: ['RPG', 'Sci-Fi', 'Open World'],
    condition: 'Used',
  },
  {
    id: 8,
    name: 'FIFA 22',
    price: 59.99,
    category: 'Sports',
    rating: 4.3,
    reviews: 650,
    image: 'fifa_22.jpg',
    badges: [
      { label: 'New Release', type: 'creditCard' },
    ],
    platforms: ['PlayStation 4', 'PlayStation 5', 'Xbox One', 'Xbox Series X', 'PC'],
    genres: ['Sports'],
    condition: 'New',
  },
  {
    id: 9,
    name: 'Animal Crossing: New Horizons',
    price: 59.99,
    category: 'Simulation',
    rating: 4.9,
    reviews: 1100,
    image: 'animal_crossing.jpg',
    badges: [
      { label: 'Top Seller', type: 'creditCard' },
    ],
    platforms: ['Nintendo Switch'],
    genres: ['Simulation', 'Social'],
    condition: 'New',
  },
  {
    id: 10,
    name: 'Assassin’s Creed Valhalla',
    price: 59.99,
    category: 'Action',
    rating: 4.4,
    reviews: 780,
    image: 'ac_valhalla.jpg',
    badges: [
      { label: 'Free Shipping', type: 'truck' },
    ],
    platforms: ['PlayStation 4', 'PlayStation 5', 'Xbox One', 'Xbox Series X', 'PC'],
    genres: ['Action', 'Adventure', 'RPG'],
    condition: 'Refurbished',
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
    </>
  );
}
