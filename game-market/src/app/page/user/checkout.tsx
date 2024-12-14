import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];

  const handlePlaceOrder = () => {
    // Simulate order processing
    const orderNumber = "12345"; // You can generate a real order number here
    navigate("/user/order-confirm", { state: { orderNumber, items: cartItems } });
  };

  return (
    <div className="min-h-screen bg-white text-black mt-10 mx-4">
      <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-2">
        {/* Customer Information Form */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-black">Address</h2>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-black"
                >
                  First Name
                </Label>
                <Input
                  id="firstName"
                  className="w-full px-3 py-2 bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="First Name"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-black"
                >
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  className="w-full px-3 py-2 bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="address"
                className="block text-sm font-medium text-black"
              >
                Address
              </Label>
              <Input
                id="address"
                className="w-full px-3 py-2 bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Address"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="block text-sm font-medium text-black"
              >
                Phone Number
              </Label>
              <Input
                id="phone"
                className="w-full px-3 py-2 bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Phone Number"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-black">Payment Method</h2>
            <RadioGroup className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mobileBanking" id="mobileBanking" />
                <Label htmlFor="mobileBanking">Mobile Banking</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="Cash On Delivery"
                  id="Cash On Delivery"
                />
                <Label htmlFor="Cash On Delivery">Cash On Delivery</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-black">Order Summary</h2>
          <Card className="bg-white text-black">
            <CardHeader>
              <CardTitle>Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Product List */}
                {cartItems.map((item: CartItem) => (
                  <div 
                    key={item.id} 
                    className="flex items-center justify-between space-x-4 py-2"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 rounded-md overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}

                <div className="mt-6 space-y-2 border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium">
                      ${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Items</span>
                    <span className="font-medium">
                      {cartItems.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t">
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;