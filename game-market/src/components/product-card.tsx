import React, { useState } from "react";
import { Star, Eye, Heart, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { QuickLook } from "./quicklook";

interface ProductCardProps {
  name: string;
  price: number;
  rating: number;
  discount?: string;
  image: string;
  badges?: {
    label: string;
    icon: React.ReactNode;
  }[];
  showBadge?: boolean;
  productId: number;
  description: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  rating,
  discount,
  image,
  badges,
  showBadge = true,
  productId,
  description
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isQuickLookOpen, setIsQuickLookOpen] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const generateProductLink = (name: string, id: number) => {
    const formattedName = name.toLowerCase().replace(/\s+/g, '-');
    return `/user/game/${formattedName}-g${id}`;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation when clicking the quick look button or closing the quick look popup
    if ((e.target as HTMLElement).closest('.quick-look-button') || isQuickLookOpen) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    window.location.href = generateProductLink(name, productId);
  };

  return (
    <Card className="overflow-hidden">
      <div className="h-48 w-full hover:scale-110 transition-transform overflow-hidden">
        <img src={image} alt={name} className="mx-auto h-full w-full object-cover" onClick={handleCardClick} />
      </div>
      
      <CardContent className="p-1 mt-1 mx-4 mb-4">
        <div className="flex items-center justify-between gap-4">
          {showBadge && discount ? (
            <Badge variant="outline" className="bg-red-300 text-secondary-foreground dark:bg-red-300 dark:text-secondary-foreground">
              {discount}
            </Badge>
          ) : (
            <div className="w-16"></div>
          )}

          <div className="flex items-center justify-end gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 quick-look-button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsQuickLookOpen(true);
                    }}
                  >
                    <span className="sr-only">Quick look</span>
                    <Eye className="h-4 w-4 text-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Quick look</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
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

        <div className="text-primary font-semibold leading-tight text-foreground hover:underline dark:text-foreground product-name" onClick={handleCardClick}>
          {name}
        </div>

        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600"}`}
              />
            ))}
          </div>
          <p className="text-sm font-medium text-foreground">{rating}</p>
        </div>

        <ul className="mt-2 flex items-center gap-4">
          {badges?.map((badge, index) => (
            <li key={index} className="flex items-center gap-2">
              {badge.icon}
              <p className="text-xs font-medium text-muted-foreground">{badge.label}</p>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-xl font-bold leading-tight text-foreground">
            ${price.toLocaleString()}
          </p>

          <Button className="inline-flex items-center gap-2 bg-primary text-primary-foreground">
            <ShoppingCart className="h-5 w-5" />
            Add to cart
          </Button>
        </div>
      </CardContent>
      <QuickLook
        isOpen={isQuickLookOpen}
        onClose={() => setIsQuickLookOpen(false)}
        product={{
          name,
          price,
          rating,
          image,
          description: description,
          productId,
        }}
        onViewDetails={() => window.location.href = generateProductLink(name, productId)}
      />
    </Card>
  );
}

// Add the following CSS styles to ensure text wrapping
const styles = `
.product-name {
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
`;

// Inject styles into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);