import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StarRating from '@/components/rating';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  productId: number;
  sellerId: number;
  name: string;
  price: number;
  description: string;
  image: string;
  platform: string;
  condition: string;
  releaseDate: string;
  tag: string;
  stock: number;
  genre: string;
  status: string;
  rating: number;
}

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>(); // Get the product ID from the URL
  const [product, setProduct] = useState<Product | null>(null); // State to store the product details
  const [loading, setLoading] = useState<boolean>(true); // State to show loading status
  const [error, setError] = useState<string | null>(null); // State to store error message, if any

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        // Make sure your backend API is running and adjust URL as necessary
        const response = await axios.get(`http://localhost:6969/api/product/${productId}`); // Backend URL
        setProduct(response.data); // Set the product data
        setLoading(false); // Hide loading indicator
      } catch (err) {
        setError('Error fetching product details'); // Set error message
        setLoading(false); // Hide loading indicator
      }
    };

    fetchProductDetail();
  }, [productId]); // Re-run when productId changes

  if (loading) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Show error message if fetching fails
  }

  if (!product) {
    return <div>Product not found</div>; // Show message if no product is found
  }

  return (
    <div className="w-full max-w-screen-lg mx-auto my-10 px-4">
      <Card className="bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:space-x-6">
            <div className="w-full lg:w-1/3 object-cover rounded-lg">
              <img src={product.image} alt={product.name} className="w-full object-cover rounded-lg" />
              <div className="rating w-full pt-5">
                <StarRating rating={product.rating} /> {/* Assuming the rating component accepts a rating */}
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <p className="text-5xl text-primary font-semibold">${product.price.toFixed(2)}</p>
              <p className="text-primary">{product.description}</p>
              <div className="space-y-2">
                <p className="text-primary"><strong>Seller ID:</strong> {product.sellerId}</p>
                <p className="text-primary"><strong>Rating:</strong> {product.rating}</p>
                <p className="text-primary"><strong>Release Date:</strong> {product.releaseDate}</p>
                <p className="text-primary"><strong>Tags:</strong> {product.tag}</p>
                <p className="text-primary"><strong>Genres:</strong> {product.genre}</p>
                <p className="text-primary"><strong>Stock:</strong> {product.stock}</p>
                <p className="text-primary"><strong>Status:</strong> {product.status}</p>
                <p className="text-primary"><strong>Platform:</strong> {product.platform}</p>
                <p className="text-primary"><strong>Condition:</strong> {product.condition}</p>
              </div>
              <Button className="bg-primary hover:bg-primary-foreground text-primary-foreground mt-4 hover:text-primary">
                Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
