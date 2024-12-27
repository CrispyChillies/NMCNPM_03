import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface CartItem {
  productId: number; // Change from id: string
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];
  

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("mobile banking");
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlaceOrder = async () => {
    setError(""); 
    setIsLoading(true);

    if (!firstName || !lastName || !address || !phoneNumber) {
      setError("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    const fullName = `${firstName} ${lastName}`.trim();
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("Please login first");
        setIsLoading(false);
        return;
      }

      const response = await axios.post(
        'http://localhost:6969/api/order',
        {
          name: fullName,
          address: address,
          phoneNumber: phoneNumber,
          paymentMethod: paymentMethod,
          total: total
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Handle ZaloPay payment
      if (response.data.paymentUrl) {
        // Save order details
        const orderDetails = {
          id: response.data.orderId,
          total: total,
          date: new Date().toISOString()
        };
        
        localStorage.setItem('pendingOrderId', response.data.orderId);
        localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
        
        // Redirect to ZaloPay payment page
        window.location.href = response.data.paymentUrl;
      } else {
        navigate('/user/cart');
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to place order");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToCart = () => {
    navigate("/user/cart");
  };

  return (
    <div className="min-h-screen bg-white text-black mt-8 mx-4">
      <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-2">
        {/* Customer Information Form */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold ml-6 text-black">Address</h2>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="block text-sm font-medium">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="block text-sm font-medium">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="block text-sm font-medium">
                Address
              </Label>
              <Input
                id="address"
                placeholder="Shipping Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="block text-sm font-medium">
                Phone Number
              </Label>
              <Input
                id="phone"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-4">
            <Label className="block text-sm font-medium">Payment Method</Label>
            <RadioGroup
              defaultValue="mobile banking"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mobile banking" id="mobileBanking" />
                <Label htmlFor="mobileBanking">Mobile Banking</Label>
              </div>
            </RadioGroup>
          </div>

          <Button 
            className="w-full mt-4" 
            size="lg"
            onClick={handleBackToCart}
          >
            Back to Cart
          </Button>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold ml-6 text-black">Order Summary</h2>
          <Card className="bg-white text-black">
            <CardHeader>
              <CardTitle>Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map((item: CartItem) => (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between space-x-4 py-2"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-24 rounded-md overflow-hidden">
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
                      ${cartItems
                        .reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
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
                  <Button className="w-full" size="lg" onClick={handlePlaceOrder} disabled={isLoading}>
                    {isLoading ? "Placing Order..." : "Place Order"}
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
