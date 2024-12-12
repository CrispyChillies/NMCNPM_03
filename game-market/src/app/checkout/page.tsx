import React from 'react'
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// First define the interface
interface OrderItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number; // Added quantity field
}

const CheckoutPage: React.FC = () => {
  const orderItems: OrderItem[] = [
    { id: '1', name: 'Secret Chocolate', price: 31.45, imageUrl: '/placeholder.svg?height=64&width=64', quantity: 1 },
    { id: '2', name: 'Vegan Platter', price: 51.20, imageUrl: '/placeholder.svg?height=64&width=64', quantity: 1 },
    { id: '3', name: 'Rose Petrol', price: 41.85, imageUrl: '/placeholder.svg?height=64&width=64', quantity: 1 },
  ];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Checkout</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="min-h-screen bg-zinc-900 text-zinc-50 p-6">
          <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-2">
            {/* Customer Information Form */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Address</h2>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-medium">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-medium">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="address" className="block text-sm font-medium">
                    Address
                  </label>
                  <input
                    id="address"
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Address"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Phone Number"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Payment Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center space-x-2 bg-emerald-800 p-4 rounded-md cursor-pointer">
                    <input type="radio" name="paymentMethod" value="cod" className="text-emerald-500 focus:ring-emerald-500" defaultChecked />
                    <span>Cash On Delivery</span>
                  </label>
                  <label className="flex items-center space-x-2 bg-emerald-800 p-4 rounded-md cursor-pointer">
                    <input type="radio" name="paymentMethod" value="bank" className="text-emerald-500 focus:ring-emerald-500" />
                    <span>Mobile Banking</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order summary</h2>
                <div className="space-y-4">
                  {/* Product List */}
                  <div className="space-y-4">
                    {orderItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-6"> {/* Increased space-x */}
                        {/* Product Image */}
                        <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden"> {/* Increased size */}
                          <img
                            src={item.imageUrl || "/placeholder.svg?height=80&width=80"}
                            alt={item.name}
                            className="object-cover w-full h-full"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-grow">
                          <p className="font-medium text-lg mb-1">{item.name}</p> {/* Increased text size and added margin */}
                          <p className="text-sm text-zinc-400">${item.price.toFixed(2)}</p>
                        </div>

                        {/* Quantity */}
                        <div className="flex-shrink-0 text-right">
                          <span className="inline-flex items-center justify-center bg-zinc-700 px-4 py-2 rounded-md">
                            <span className="text-sm text-zinc-400 mr-2">Qty:</span>
                            <span className="font-medium">{item.quantity}</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Total */}
                  <div className="border-t border-zinc-700 pt-4 mt-4">
                    <div className="flex justify-between">
                      <p>Total</p>
                      <p className="font-medium">
                        ${orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p>Total Items</p>
                      <p className="font-medium">
                        {orderItems.reduce((sum, item) => sum + item.quantity, 0)}
                      </p>
                    </div>
                  </div>
                  <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out">
                    ORDER
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default CheckoutPage