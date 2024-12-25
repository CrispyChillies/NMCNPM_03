import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { displayTag, displayStatus, displayRating } from '@/components/display';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StarRating } from '@/components/rating';

interface Product {
  productId: number;
  sellerId: number;
  name: string;
  price: number;
  description: string;
  image: string;
  images: string[];
  platform: string;
  condition: string;
  releaseDay: string;
  tag: string;
  stock: number;
  genre: string;
  status: string;
  rating: number;
  sellerName: string;
  sellerRating: number;
  sellerFeedback: number;
}

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get<Product>(`http://localhost:6969/api/product/${productId}`);
        setProduct(response.data);
        setSelectedImage(response.data.image);
        setLoading(false);
      } catch (err) {
        setError('Error fetching product details');
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  const handleRatingSubmit = (rating: number) => {
    console.log(`Submitted rating: ${rating}`);
    // Here you would typically send the rating to your backend
  };

  if (loading) return <div className="flex justify-center p-8">Loading...</div>;
  if (error) return <div className="flex justify-center p-8 text-red-500">{error}</div>;
  if (!product) return <div className="flex justify-center p-8">Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Images */}
        <div className="lg:w-2/3">
          <div className="space-y-4">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full aspect-video object-cover rounded-lg"
            />
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[product.image, ...(product.images || [])].map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`flex-shrink-0 ${
                    selectedImage === img ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="lg:w-1/3 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
              <div className="flex flex-wrap gap-2">
                {displayTag(product.tag)}
                {displayStatus(product.status)}
              </div>
            </div>
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div>
                    <h3 className="font-medium">{product.sellerName}</h3>
                    <p className="text-muted-foreground">
                      Ratings:
                    </p>
                  </div>
                </div>
                {displayRating(product.rating)}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Platform:</span>
                  <span className="font-medium">{product.platform}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Region:</span>
                  <span className="font-medium">GLOBAL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Type:</span>
                  <span className="font-medium">{product.condition}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex flex-row justify-between">
                  <div className="text-3xl font-bold mb-2">
                    ${product.price.toFixed(2)}
                  </div>
                  <div>
                    <StarRating onRatingSubmit={handleRatingSubmit} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Button className="w-full" size="lg">
                    Add to cart
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <p className="text-sm text-muted-foreground">{product.description}</p>
            </TabsContent>
            <TabsContent value="details" className="mt-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Release Date:</span>
                  <span>{new Date(product.releaseDay).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Genre:</span>
                  <span>{product.genre}</span>
                </div>
                <div className="flex justify-between">
                  <span>Stock:</span>
                  <span>{product.stock} available</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

