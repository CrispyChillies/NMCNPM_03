import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "react-router-dom";

interface OrderItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderConfirmPageProps {
  orderNumber: string;
  items: OrderItem[];
}

export default function OrderConfirmPage() {
  const location = useLocation();
  const { orderNumber, items } = location.state as OrderConfirmPageProps;

  return (
    <div className="min-h-screen bg-white text-black py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-3xl mx-auto bg-white text-black">
        <CardContent className="p-6 sm:p-8">
          <h1 className="text-3xl sm:text-2xl font-bold mb-3">
            Thank you for your purchase
          </h1>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-3">Order Details</h2>
              <p>
                Thank you for your order! Order <span className="font-semibold">#{orderNumber}</span> has been received and is being 
                processed. You'll receive updates as it moves through each step. If you have 
                any questions, feel free to contact us. We appreciate your purchase!
              </p>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border bg-white text-black">
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm">Quantity: {item.quantity}</p>
                    <p className="text-sm">Price: ${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 object-cover rounded-md"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}