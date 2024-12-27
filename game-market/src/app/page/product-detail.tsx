import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import axios from 'axios';

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
  const [quantity, setQuantity] = useState(1);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

    const fetchCartQuantity = async () => {
      try {
        const id = productId?.split('-g').pop();
        const response = await axios.get(`http://localhost:6969/api/cart`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const cartItem = response.data.cartItems.find((item: { productId: number }) => item.productId === Number(id));
        if (cartItem) {
          setCartQuantity(cartItem.quantity);
        }
      } catch (error) {
        console.error('Error fetching cart quantity:', error);
      }
    };

    fetchProduct();
    fetchCartQuantity();
    window.scrollTo(0, 0);
  }, [productId]);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = async () => {
    if (quantity < 1) {
      setErrorMessage('Quantity must be greater than 0');
      return;
    }

    try {
      const response = await axios.post('http://localhost:6969/api/cart', {
        productId: product?.productId,
        quantity: quantity
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming the token is stored in localStorage
        }
      });
      if (response.data.success) {
        setShowSuccessPopup(true);
        setTimeout(() => setShowSuccessPopup(false), 800);
        setQuantity(1); // Reset quantity to 1
        setCartQuantity(cartQuantity + quantity); // Update cart quantity
        setErrorMessage(null); // Clear any previous error messages
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      if (error.response && error.response.data && error.response.data.message === "Quantity exceeds available stock") {
        setShowErrorPopup(true);
      } else {
        alert('Failed to add product to cart.');
      }
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const maxQuantity = product!.stock - cartQuantity;
    if (value > maxQuantity) {
      setQuantity(maxQuantity);
    } else {
      setQuantity(value);
    }
  };

  if (!product) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }

  const maxQuantity = product.stock - cartQuantity;

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
              <Badge variant="secondary">{product.condition}</Badge>
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground">${product.price.toLocaleString()}</p>
          {maxQuantity > 0 ? (
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-4 items-center">
                <Button className="flex-1 bg-primary text-primary-foreground" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to cart
                </Button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  className="w-16 p-2 border rounded"
                />
                <Button variant="outline" size="icon" onClick={handleFavoriteClick}>
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'fill-none text-gray-500'}`} />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <Button className="flex-1 bg-gray-500 text-white" disabled>
                Out of Stock
              </Button>
              {cartQuantity > 0 && (
                <p className="text-sm text-gray-500">You already have {cartQuantity} of this product in your cart.</p>
              )}
            </div>
          )}
          {errorMessage && (
            <p className="text-red-500 mt-2">{errorMessage}</p>
          )}
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
                  <p className="text-base text-foreground">{product.platform}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Genre</p>
                  <p className="text-base text-foreground">{product.genre}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <p className="text-base text-foreground">{product.status}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Release Day</p>
                  <p className="text-base text-foreground">{product.releaseDay}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tag</p>
                  <p className="text-base text-foreground">{product.tag}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Stock</p>
                  <p className="text-base text-foreground">{product.stock} available</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Dialog open={showSuccessPopup} onOpenChange={setShowSuccessPopup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Product Added to Cart</DialogTitle>
          </DialogHeader>
          <p>The product has been added to your cart successfully.</p>
        </DialogContent>
      </Dialog>
      <Dialog open={showErrorPopup} onOpenChange={setShowErrorPopup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Stock Limit Reached</DialogTitle>
          </DialogHeader>
          <p>The quantity exceeds the available stock.</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}