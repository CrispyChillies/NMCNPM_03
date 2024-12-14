import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  developer: string;
  publisher: string;
  releaseDate: string;
  categories: string;
  genres: string;
  sizeInMB: number;
  version: string;
  englishSupported: string;
}

const mockProduct: Product = {
  id: 1,
  name: 'The Witcher 3: Wild Hunt',
  price: 39.99,
  description: 'The Witcher 3: Wild Hunt is a story-driven, open world adventure set in a visually stunning fantasy universe full of meaningful choices and impactful consequences.',
  image: '/images/the-witcher-3.jpg',
  developer: 'CD Projekt Red',
  publisher: 'CD Projekt',
  releaseDate: '2015-05-19',
  categories: 'Action, Adventure',
  genres: 'RPG, Open World',
  sizeInMB: 50000,
  version: '1.32',
  englishSupported: 'Yes',
};

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();

  // In a real application, you would fetch the product details from an API using the productId
  const product = mockProduct; // Replace this with the fetched product data

  return (
    <div className="w-full max-w-screen-lg mx-auto my-10 px-4">
      <Card className="bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:space-x-6">
            <img src={product.image} alt={product.name} className="w-full lg:w-1/3 object-cover rounded-lg" />
            <div className="flex-1 space-y-4">
              <p className="text-lg text-primary">${product.price.toFixed(2)}</p>
              <p className="text-primary">{product.description}</p>
              <div className="space-y-2">
                <p className="text-primary"><strong>Developer:</strong> {product.developer}</p>
                <p className="text-primary"><strong>Publisher:</strong> {product.publisher}</p>
                <p className="text-primary"><strong>Release Date:</strong> {product.releaseDate}</p>
                <p className="text-primary"><strong>Categories:</strong> {product.categories}</p>
                <p className="text-primary"><strong>Genres:</strong> {product.genres}</p>
                <p className="text-primary"><strong>Size:</strong> {product.sizeInMB} MB</p>
                <p className="text-primary"><strong>Version:</strong> {product.version}</p>
                <p className="text-primary"><strong>English Supported:</strong> {product.englishSupported}</p>
              </div>
              <Button className="bg-primary hover:bg-primary-foreground text-primary-foreground mt-4">
                Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}