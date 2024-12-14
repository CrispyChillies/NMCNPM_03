import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button"


// First define the interface
interface OrderItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number; // Added quantity field
}

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};
const CheckoutPage: React.FC = () => {
  const orderItems: OrderItem[] = [
    {
      id: "1",
      name: "Secret Chocolate",
      price: 31.45,
      imageUrl: "/placeholder.svg?height=64&width=64",
      quantity: 1,
    },
    {
      id: "2",
      name: "Vegan Platter",
      price: 51.2,
      imageUrl: "/placeholder.svg?height=64&width=64",
      quantity: 1,
    },
    {
      id: "3",
      name: "Rose Petrol",
      price: 41.85,
      imageUrl: "/placeholder.svg?height=64&width=64",
      quantity: 1,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-2">
        {/* Customer Information Form */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-black">Address</h2>
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
            <h2 className="text-xl font-semibold text-black">Payment Method</h2>
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
          <h2 className="text-xl font-semibold text-black">Order Summary</h2>
          <Card className="bg-white text-black">
            <CardHeader>
              <CardTitle>Items</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>
              $
              {orderItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </span>
          </div>
          <Button type="submit" className="w-full bg-black text-white">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
