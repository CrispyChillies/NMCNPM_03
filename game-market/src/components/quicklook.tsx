import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Star, X } from 'lucide-react'

interface QuickLookProps {
  isOpen: boolean
  onClose: () => void
  product: {
    name: string
    price: number
    rating: number
    image: string
    description: string
    productId: number
  }
  onViewDetails: () => void
}

export const QuickLook: React.FC<QuickLookProps> = ({ isOpen, onClose, product, onViewDetails }) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>Quick preview of the product</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <img src={product.image} alt={product.name} className="col-span-4 w-full h-48 object-cover rounded-md" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-4">
              <p className="text-sm text-gray-500 truncate">{product.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-2 font-semibold">${product.price.toFixed(2)}</div>
            <div className="col-span-2 flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}`}
                />
              ))}
              <span className="ml-2 text-sm">{product.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onViewDetails}>View Details</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}