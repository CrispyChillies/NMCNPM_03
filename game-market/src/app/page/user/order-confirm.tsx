import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";

interface OrderDetail {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  orderId: number;
  date: string;
  total?: number; // Make total optional
  orderDetails: OrderDetail[];
}

export default function OrderConfirm() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const calculateTotal = (items: OrderDetail[]) => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  useEffect(() => {
    const fetchLatestOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please login to view order");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:6969/api/latest_order",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (response.data.success) {
          const orderDetails = response.data.orderDetails;
          setOrder({
            orderId: response.data.order.orderId,
            date: response.data.order.date,
            total: calculateTotal(orderDetails),
            orderDetails: orderDetails
          });
        }
      } catch (err) {
        setError("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestOrder();
  }, []);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;
  if (!order) return <div className="text-center p-4">No order found</div>;

  return (
    <div className="min-h-screen bg-white text-black py-12 px-4">
      <Card className="max-w-3xl mx-auto">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>
          
          <div className="mb-6 space-y-4">
            <p className="font-medium">Order #{order?.orderId}</p>
            <p className="text-gray-700">
              Thank you for your purchase! Your order has been confirmed and is being processed. 
              We'll send you updates about your order status via email. 
              If you have any questions, please don't hesitate to contact our support team.
            </p>
          </div>

          <div className="space-y-4">
            {order.orderDetails.map((item) => (
              <div key={item.id} className="flex border p-4 rounded">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="ml-4">
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price}</p>
                </div>
              </div>
            ))}
          </div>

            <div className="mt-6 text-xl font-bold flex justify-end">
            Total: ${order?.total?.toFixed(2)}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}