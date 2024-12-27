import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PLATFORM_MAPPING = {
  "playstation5": "PlayStation 5",
  "playstation4": "PlayStation 4", 
  "xboxSeriesX": "Xbox Series X",
  "xboxOne": "Xbox One",
  "nintendoSwitch": "Nintendo Switch",
  "pc": "PC"
};

const GENRE_MAPPING = {
  "action": "Action",
  "rpg": "RPG",
  "fps": "FPS", 
  "adventure": "Adventure",
  "sports": "Sports",
  "racing": "Racing",
  "strategy": "Strategy"
};

const CONDITION_MAPPING = {
  "new": "New",
  "likeNew": "Like New",
  "good": "Good", 
  "fair": "Fair"
};

const TAG_MAPPING = {
  "bestSellers": "Best Sellers",
  "newReleases": "New Releases",
  "comingSoon": "Coming Soon",
  "specialOffers": "Special Offers"
};

const STATUS_MAPPING = {
  "available": "Available",
  "outOfStock": "Out of Stock",
  "preOrder": "Pre-order",
  "comingSoon": "Coming Soon"
};

const getDisplayValue = (value: string, mapping: Record<string, string>) => {
  return mapping[value] || value;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

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

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const id = productId?.split('-g').pop();
        const response = await fetch(`http://localhost:6969/api/game/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [productId]);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  if (!product) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }

  return (
    <div className="container mx-auto mt-4 p-4 space-y-8 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-4">
          <Card>
            <CardContent className="p-4">
              <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg shadow-md" />
            </CardContent>
          </Card>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={product.image} alt={`${product.name} thumbnail ${i + 1}`} className="w-full h-auto rounded-md cursor-pointer hover:opacity-75 transition-opacity" />
            ))}
          </div>
        </div>
        <div className="lg:w-1/3 space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2 mt-6">{product.name}</h1>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600"}`}
                  />
                ))}
              </div>
              <p className="text-lg font-medium text-foreground">{product.rating}</p>
              <Separator orientation="vertical" className="h-6" />
              <Badge variant="secondary">{getDisplayValue(product.condition, CONDITION_MAPPING)}</Badge>
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground">${product.price.toLocaleString()}</p>
          <div className="flex space-x-4">
            <Button className="flex-1 bg-primary text-primary-foreground">
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to cart
            </Button>
            <Button variant="outline" size="icon" onClick={handleFavoriteClick}>
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'fill-none text-gray-500'}`} />
            </Button>
          </div>
          <Separator />
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="flex w-full">
              <TabsTrigger className="flex w-full" value="description">Description</TabsTrigger>
              <TabsTrigger className="flex w-full" value="details">Details</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <p className="text-base text-foreground">{product.description}</p>
            </TabsContent>
            <TabsContent value="details" className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Platform</p>
                  <p className="text-base text-foreground">{getDisplayValue(product.platform, PLATFORM_MAPPING)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Genre</p>
                  <p className="text-base text-foreground">{getDisplayValue(product.genre, GENRE_MAPPING)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <p className="text-base text-foreground">{getDisplayValue(product.status, STATUS_MAPPING)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Release Day</p>
                  <p className="text-base text-foreground">{formatDate(product.releaseDay)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tag</p>
                  <p className="text-base text-foreground">{getDisplayValue(product.tag, TAG_MAPPING)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Stock</p>
                  <p className="text-base text-foreground">{product.stock}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}