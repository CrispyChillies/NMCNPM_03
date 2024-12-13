import { Card, CardContent } from "@/components/ui/card";
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Header } from "@/components/header"

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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden h-4">
        <Header user={data.user} className="sticky top-0 z-10 bg-background" />
        <div className="min-h-screen bg-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
          <Card className="max-w-3xl mx-auto bg-zinc-800/50 border-zinc-700">
            <CardContent className="p-6 sm:p-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-emerald-500 mb-6">
                Thank you for your purchase
              </h1>
              
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-zinc-400 mb-3">Order detail</h2>
                  <p className="text-zinc-400">
                    Thank you for your order! Order <span className="text-blue-400">#{orderNumber}</span> has been received and is being 
                    processed. You&apos;ll receive updates as it moves through each step. If you have 
                    any questions, feel free to contact us. We appreciate your purchase!
                  </p>
                </div>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 rounded-lg border border-zinc-700 bg-zinc-800/50">
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 rounded-md object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-semibold text-zinc-100">{item.name}</h3>
                        <p className="text-sm text-zinc-400">{item.description}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">
                          x{item.quantity}
                        </div>
                        <div className="font-semibold text-zinc-100">
                          ${item.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
