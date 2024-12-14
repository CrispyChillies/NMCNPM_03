import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: 'The Witcher 3',
    price: 39.99,
    quantity: 1,
    image: 'https://i0.wp.com/safezonegames.com/wp-content/uploads/2023/03/Sword-Art.webp?fit=1920%2C1080&ssl=1',
  },
  {
    id: 2,
    name: 'Cyberpunk 2077',
    price: 59.99,
    quantity: 1,
    image: 'https://i0.wp.com/safezonegames.com/wp-content/uploads/2023/03/Sword-Art.webp?fit=1920%2C1080&ssl=1',
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const navigate = useNavigate();

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id, quantity) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity } : item));
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
              <Card key={item.id} className="bg-card text-card-foreground w-64"> {/* Added w-64 class for fixed width */}
                <CardHeader className="flex flex-col items-center space-y-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div className="text-center">
                    <CardTitle className="text-foreground">{item.name}</CardTitle>
                    <p className="text-foreground">${item.price.toFixed(2)}</p>
                    <div className="flex items-center justify-center space-x-2 mt-2">
                      <label htmlFor={`quantity-${item.id}`} className="text-foreground">Quantity:</label>
                      <input
                        id={`quantity-${item.id}`}
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        className="w-16 bg-card text-foreground border-2 border-border focus:border-primary focus:ring-primary rounded-[30px]"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={() => handleRemoveItem(item.id)}
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