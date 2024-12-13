import { useState } from 'react'
import { ProductCard } from './product-card'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

interface ProductShowcaseProps {
  category: string
  products: any[]
}

export function ProductShowcase({ category, products }: ProductShowcaseProps) {
  const [showAll, setShowAll] = useState(false)
  const displayedProducts = showAll ? products : products.slice(0, 8)

  return (
    <section className="py-8">
      <h2 className="text-xl font-bold mb-4 ml-10">{category}</h2>
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4">
          {displayedProducts.map((product, index) => (
            <div key={index} className="w-[250px] flex-shrink-0">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {products.length > 8 && (
        <div className="mt-1 text-right">
          <Button variant="link" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show less" : "Show more"}
          </Button>
        </div>
      )}
      {/* <div className="mt-1 text-right">
        <Button variant="link">See More</Button>
      </div> */}
    </section>
  )
}



