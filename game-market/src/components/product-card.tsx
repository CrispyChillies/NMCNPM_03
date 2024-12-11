import { useState } from "react"
import { Star, Eye, Heart, Truck, CreditCard } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ProductCardProps {
  name: string
  price: number
  rating: number
  reviews: number
  discount?: string
  image: string
  badges: {
    label: string
    type: 'truck' | 'creditCard'
  }[]
  showBadge?: boolean
}

export function ProductCard({
  name,
  price,
  rating,
  reviews,
  discount,
  image,
  badges,
  showBadge = true
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <Card className="overflow-hidden">
      <div className="h-48 w-full hover:scale-110 transition-transform overflow-hidden">
        {/* <Image 
          src={image} 
          alt={name}
          width={400}
          height={400}
          className="mx-auto h-full w-auto object-contain"
        /> */}
        <img src={image} alt={name} className="mx-auto h-full w-full object-cover" />
      </div>
      
      <CardContent className="p-1 mt-1 mx-4 mb-4">
        <div className="flex items-center justify-between gap-4">
          {showBadge && discount && (
            <Badge variant="secondary" className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300">
              {discount}
            </Badge>
          )}

          <div className="flex items-center justify-end gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <span className="sr-only">Quick look</span>
                    <Eye className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Quick look</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    // className={`h-9 w-9 ${isFavorite ? 'border-2 border-red-500' : 'border-transparent'} transition-all`}
                    onClick={handleFavoriteClick}
                  >
                    <span className="sr-only">Add to favorites</span>
                    <Heart
                      className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'fill-none text-gray-500'}`}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Add to favorites</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <a href="#" className="text-primary font-semibold leading-tight text-gray-900 hover:underline dark:text-white">
          {name}
        </a>

        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600"}`}
              />
            ))}
          </div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{rating}</p>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">({reviews})</p>
        </div>

        <ul className="mt-2 flex items-center gap-4">
          {badges.map((badge, index) => (
            <li key={index} className="flex items-center gap-2">
              {badge.type === 'truck' ? (
                <Truck className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              ) : (
                <CreditCard className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              )}
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{badge.label}</p>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
            ${price.toLocaleString()}
          </p>

          <Button className="inline-flex items-center gap-2">
            <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
            </svg>
            Add to cart
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
