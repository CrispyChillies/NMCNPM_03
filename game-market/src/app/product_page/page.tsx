'use client'

import { useState, useEffect, useCallback } from 'react'
import { Filter, Search, DollarSign } from 'lucide-react'
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

interface Product {
  id: number
  name: string
  price: number
  category: string
  platform: string
  image: string
}

export default function ProductPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [maxPrice, setMaxPrice] = useState(100)
  const [searchQuery, setSearchQuery] = useState('')
  const [isDragging, setIsDragging] = useState<number | null>(null)
  
  const products: Product[] = [
    {
      id: 1,
      name: "Elden Ring",
      price: 59.99,
      category: "RPG",
      platform: "PS5",
      image: "/placeholder.svg?height=200&width=200"
    },
    {
      id: 2,
      name: "God of War Ragnarök",
      price: 69.99,
      category: "Action",
      platform: "PS5",
      image: "/placeholder.svg?height=200&width=200"
    },
    {
      id: 3,
      name: "Halo Infinite",
      price: 59.99,
      category: "FPS",
      platform: "Xbox",
      image: "/placeholder.svg?height=200&width=200"
    },
    {
      id: 4,
      name: "Animal Crossing: New Horizons",
      price: 49.99,
      category: "Simulation",
      platform: "Switch",
      image: "/placeholder.svg?height=200&width=200"
    },
    {
      id: 5,
      name: "Cyberpunk 2077",
      price: 39.99,
      category: "RPG",
      platform: "PS4",
      image: "/placeholder.svg?height=200&width=200"
    },
    // Additional games
    {
      id: 6,
      name: "FIFA 24",
      price: 69.99,
      category: "Sports",
      platform: "PS5",
      image: "/placeholder.svg?height=200&width=200"
    },
    {
      id: 7,
      name: "The Legend of Zelda: Tears of the Kingdom",
      price: 59.99,
      category: "Action",
      platform: "Switch",
      image: "/placeholder.svg?height=200&width=200"
    },
    {
      id: 8,
      name: "Call of Duty: Modern Warfare III",
      price: 69.99,
      category: "FPS",
      platform: "Xbox",
      image: "/placeholder.svg?height=200&width=200"
    },
    {
      id: 9,
      name: "Final Fantasy XVI",
      price: 69.99,
      category: "RPG",
      platform: "PS5",
      image: "/placeholder.svg?height=200&width=200"
    },
    {
      id: 10,
      name: "Starfield",
      price: 69.99,
      category: "RPG",
      platform: "Xbox",
      image: "/placeholder.svg?height=200&width=200"
    },
    {
      id: 11,
      name: "Mario Kart 8 Deluxe",
      price: 49.99,
      category: "Sports",
      platform: "Switch",
      image: "/placeholder.svg?height=200&width=200"
    },
    {
      id: 12,
      name: "Resident Evil 4 Remake",
      price: 59.99,
      category: "Action",
      platform: "PS5",
      image: "/placeholder.svg?height=200&width=200"
    }
  ];

  useEffect(() => {
    const max = Math.max(...products.map(p => p.price))
    setMaxPrice(Math.ceil(max / 10) * 10)
    setPriceRange([0, Math.ceil(max / 10) * 10])
  }, [])

  const handlePriceChange = useCallback((newValue: number, index: number) => {
    setPriceRange(prev => {
      const newRange = [...prev] as [number, number]
      if (index === 0) {
        return [Math.min(newValue, newRange[1] - 1), newRange[1]]
      } else {
        return [newRange[0], Math.max(newValue, newRange[0] + 1)]
      }
    })
  }, [])

  const handleMouseDown = (index: number) => {
    setIsDragging(index)
  }

  const handleMouseUp = () => {
    setIsDragging(null)
  }

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging !== null) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = Math.min(Math.max(x / rect.width, 0), 1)
      const newValue = Math.round(percentage * maxPrice)
      handlePriceChange(newValue, isDragging)
    }
  }, [isDragging, maxPrice, handlePriceChange])

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(null)
    document.addEventListener('mouseup', handleGlobalMouseUp)
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp)
  }, [])

  const filteredProducts = products.filter(product => {
    if (selectedPlatform !== 'all' && product.platform !== selectedPlatform) return false
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 bg-gray-800">
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
                  <BreadcrumbPage>Products</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="min-h-screen bg-gray-900">
          <div className="bg-gray-800 border-t border-gray-700">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search games..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-emerald-500" />
                    <span className="text-white">Filters:</span>
                  </div>
                  
                  <select 
                    className="bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:border-emerald-500"
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                  >
                    <option value="all">All Platforms</option>
                    <option value="PS5">PlayStation 5</option>
                    <option value="PS4">PlayStation 4</option>
                    <option value="Xbox">Xbox Series X|S</option>
                    <option value="Switch">Nintendo Switch</option>
                  </select>

                  <select
                    className="bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:border-emerald-500"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    <option value="Action">Action</option>
                    <option value="RPG">RPG</option>
                    <option value="FPS">FPS</option>
                    <option value="Sports">Sports</option>
                    <option value="Simulation">Simulation</option>
                  </select>

                  <div className="flex items-center gap-2 w-full max-w-md">
                    <DollarSign className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <div className="w-full">
                      <div 
                        className="relative pt-1 pb-6"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseUp}
                      >
                        <div className="h-2 bg-gray-700 rounded-full">
                          <div
                            className="absolute h-2 rounded-full bg-emerald-500"
                            style={{
                              left: `${(priceRange[0] / maxPrice) * 100}%`,
                              right: `${100 - (priceRange[1] / maxPrice) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <div
                          className="absolute w-4 h-4 -mt-1 bg-emerald-500 rounded-full cursor-pointer"
                          style={{ left: `calc(${(priceRange[0] / maxPrice) * 100}% - 8px)` }}
                          onMouseDown={() => handleMouseDown(0)}
                          role="slider"
                          aria-valuemin={0}
                          aria-valuemax={maxPrice}
                          aria-valuenow={priceRange[0]}
                          tabIndex={0}
                        ></div>
                        <div
                          className="absolute w-4 h-4 -mt-1 bg-emerald-500 rounded-full cursor-pointer"
                          style={{ left: `calc(${(priceRange[1] / maxPrice) * 100}% - 8px)` }}
                          onMouseDown={() => handleMouseDown(1)}
                          role="slider"
                          aria-valuemin={0}
                          aria-valuemax={maxPrice}
                          aria-valuenow={priceRange[1]}
                          tabIndex={0}
                        ></div>
                      </div>
                      <div className="flex justify-between text-white text-sm mt-2">
                        <span>${priceRange[0].toFixed(2)}</span>
                        <span>${priceRange[1].toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <main className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-emerald-500 transition-colors">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-white font-semibold text-lg">{product.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-emerald-500 font-bold">${product.price.toFixed(2)}</span>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-gray-700 rounded-md text-xs text-white">
                          {product.platform}
                        </span>
                        <span className="px-2 py-1 bg-gray-700 rounded-md text-xs text-white">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    <button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
