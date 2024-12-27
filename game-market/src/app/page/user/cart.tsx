import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';

interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:6969/api/cart', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming the token is stored in localStorage
          }
        });
        if (response.data.success) {
          setCartItems(response.data.cartItems);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (productId: number) => {
    try {
      const response = await axios.delete(`http://localhost:6969/api/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success) {
        setCartItems(cartItems.filter(item => item.productId !== productId));
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleQuantityChange = async (productId: number, quantity: number) => {
    try {
      const response = await axios.put(`http://localhost:6969/api/cart/${productId}`, { quantity }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success) {
        setCartItems(cartItems.map(item => item.productId === productId ? { ...item, quantity } : item));
      }
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate('/user/checkout', { state: { cartItems } });
  };

  return (
    <div className="w-full max-w-screen mx-auto my-8 px-4">
      <h1 className="text-xl font-bold mb-6 mx-6 text-left text-primary">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-lg text-primary">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-4 justify-start ml-[5%]">
            {cartItems.map(item => (
              <Card key={item.productId} className="bg-card text-card-foreground w-64"> {/* Added w-64 class for fixed width */}
                <CardHeader className="flex flex-col items-center space-y-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div className="text-center">
                    <CardTitle className="text-foreground">{item.name}</CardTitle>
                    <p className="text-foreground">${item.price.toFixed(2)}</p>
                    <div className="flex items-center justify-center space-x-2 mt-2">
                      <label htmlFor={`quantity-${item.productId}`} className="text-foreground">Quantity:</label>
                      <input
                        id={`quantity-${item.productId}`}
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                        className="w-16 bg-card text-foreground border-2 border-border focus:border-primary focus:ring-primary rounded-[30px]"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={() => handleRemoveItem(item.productId)}
                    className="bg-primary hover:bg-primary-foreground text-primary-foreground py-2 px-4 rounded-[30px]"
                  >
                    Remove
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-foreground">Total: ${total.toFixed(2)}</p>
            <Button
              onClick={handleCheckout}
              className="mt-4 bg-primary hover:bg-primary-foreground text-primary-foreground py-3 text-lg font-semibold transition-colors duration-200 rounded-[30px]"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}