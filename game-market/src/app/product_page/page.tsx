'use client';

import { useState, useEffect } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { ProductCard } from '@/components/product-card';
import { Header } from '@/components/header';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

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
}

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  }
}

const products: Product[] = [
  {
    id: 1,
    name: 'Product 1',
    price: 29.99,
    category: 'Category 1',
    rating: 4.5,
    reviews: 10,
    discount: '10%',
    image: 'image1.jpg',
    badges: [
      { label: 'Free Shipping', type: 'truck' },
      { label: 'Credit Card', type: 'creditCard' },
    ],
  },
  {
    id: 2,
    name: 'Product 2',
    price: 49.99,
    category: 'Category 2',
    rating: 4.0,
    reviews: 20,
    image: 'image2.jpg',
    badges: [
      { label: 'Free Shipping', type: 'truck' },
    ],
  },
  {
    id: 3,
    name: 'Product 3',
    price: 19.99,
    category: 'Category 3',
    rating: 3.5,
    reviews: 5,
    discount: '5%',
    image: 'image3.jpg',
    badges: [
      { label: 'Credit Card', type: 'creditCard' },
    ],
  },
  {
    id: 4,
    name: 'Product 4',
    price: 99.99,
    category: 'Category 4',
    rating: 5.0,
    reviews: 50,
    image: 'image4.jpg',
    badges: [
      { label: 'Free Shipping', type: 'truck' },
      { label: 'Credit Card', type: 'creditCard' },
    ],
  },
  {
    id: 5,
    name: 'Product 5',
    price: 39.99,
    category: 'Category 5',
    rating: 4.2,
    reviews: 15,
    image: 'image5.jpg',
    badges: [
      { label: 'Free Shipping', type: 'truck' },
    ],
  },
  {
    id: 6,
    name: 'Product 6',
    price: 59.99,
    category: 'Category 6',
    rating: 4.8,
    reviews: 25,
    discount: '15%',
    image: 'image6.jpg',
    badges: [
      { label: 'Credit Card', type: 'creditCard' },
    ],
  },
  {
    id: 7,
    name: 'Product 7',
    price: 79.99,
    category: 'Category 7',
    rating: 4.6,
    reviews: 30,
    image: 'image7.jpg',
    badges: [
      { label: 'Free Shipping', type: 'truck' },
    ],
  },
  {
    id: 8,
    name: 'Product 8',
    price: 89.99,
    category: 'Category 8',
    rating: 4.9,
    reviews: 40,
    image: 'image8.jpg',
    badges: [
      { label: 'Credit Card', type: 'creditCard' },
    ],
  },
  {
    id: 9,
    name: 'Product 9',
    price: 25.99,
    category: 'Category 9',
    rating: 3.9,
    reviews: 8,
    image: 'image9.jpg',
    badges: [
      { label: 'Free Shipping', type: 'truck' },
    ],
  },
  {
    id: 10,
    name: 'Product 10',
    price: 45.99,
    category: 'Category 10',
    rating: 4.3,
    reviews: 18,
    discount: '20%',
    image: 'image10.jpg',
    badges: [
      { label: 'Credit Card', type: 'creditCard' },
    ],
  },
  {
    id: 11,
    name: 'Product 11',
    price: 55.99,
    category: 'Category 11',
    rating: 4.7,
    reviews: 22,
    image: 'image11.jpg',
    badges: [
      { label: 'Free Shipping', type: 'truck' },
    ],
  },
  {
    id: 12,
    name: 'Product 12',
    price: 65.99,
    category: 'Category 12',
    rating: 4.4,
    reviews: 28,
    image: 'image12.jpg',
    badges: [
      { label: 'Credit Card', type: 'creditCard' },
    ],
  },
];

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen h-4 overflow-hidden">
        <Header user={data.user} className="sticky top-0 z-10 bg-background" />
        <main className="flex-grow overflow-y-auto">
          <div className="flex-1 overflow-auto bg-background border-gray-700">
              <div className="w-full px-6 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {products.map((product) => (
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