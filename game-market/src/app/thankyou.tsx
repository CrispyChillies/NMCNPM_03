import { Card, CardContent } from "@/components/ui/card";

interface OrderItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

interface ThankYouPageProps {
  orderNumber: string;
  items: OrderItem[];
}

export default function ThankYouPage({
  orderNumber = "12345",
  items = [
    {
      id: 1,
      name: "Secret Concealer",
      description: "Covers dark circles covers dark",
      price: 21.45,
      quantity: 1,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Vegan Powder",
      description: "Cloud Silk Baked Setting & Smoothing Talc",
      price: 15.0,
      quantity: 2,
      image: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Brow Pencil",
      description: "August Mechanical",
      price: 18.99,
      quantity: 1,
      image: "/placeholder.svg",
    },
  ],
}: ThankYouPageProps) {
  return (
    <div className="min-h-screen bg-white text-black py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-3xl mx-auto bg-slate-50 text-black">
        <CardContent className="p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">
            Thank you for your purchase
          </h1>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-3">Order Details</h2>
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