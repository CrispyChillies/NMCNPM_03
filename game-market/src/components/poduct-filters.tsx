// src/components/product-filters.tsx
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// 1. Types
interface ProductFiltersProps {
  onPlatformChange: (platform: string) => void;
  onGenreChange: (genre: string) => void;
  onSortChange: (sortDirection: 'asc' | 'desc') => void;
}

// 2. Filter options
const platforms = [
  "PlayStation 5",
  "PlayStation 4", 
  "Xbox Series X|S",
  "Xbox One",
  "Nintendo Switch",
  "PC"
];

const genres = [
  "Action",
  "RPG",
  "FPS",
  "Adventure",
  "Sports",
  "Racing",
  "Strategy"
];

// 3. Component
export function ProductFilters({
  onPlatformChange,
  onGenreChange,
  onSortChange
}: ProductFiltersProps) {
  return (
    <div className="flex items-center gap-4 p-4 border-b">
      <Select onValueChange={onPlatformChange} defaultValue="all">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Platform" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Platforms</SelectItem>
          {platforms.map(platform => (
            <SelectItem key={platform} value={platform}>{platform}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={onGenreChange} defaultValue="all">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Genre" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Genres</SelectItem>
          {genres.map(genre => (
            <SelectItem key={genre} value={genre}>{genre}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={onSortChange} defaultValue="asc">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by price" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Price: Low to High</SelectItem>
          <SelectItem value="desc">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}