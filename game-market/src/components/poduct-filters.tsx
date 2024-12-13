// src/components/product-filters.tsx
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

interface ProductFiltersProps {
  onPlatformsChange: (platforms: string[]) => void;
  onGenresChange: (genres: string[]) => void;
  onSortChange: (sortDirection: 'asc' | 'desc') => void;
  onConditionChange: (conditions: string[]) => void;
}

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

const conditions = [
  "New",
  "99%",
  "95%",
  "<95%"
];

type SortOption = {
  value: string;
  label: string;
};

const SORT_OPTIONS: SortOption[] = [
  { value: 'rating-desc', label: 'Rating' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'price-asc', label: 'Price: Low to High' }
];

export function ProductFilters({
  onPlatformsChange,
  onGenresChange,
  onSortChange,
  onConditionChange
}: ProductFiltersProps) {
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])
  const [tempConditions, setTempConditions] = useState<string[]>([])
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [tempPlatforms, setTempPlatforms] = useState<string[]>([])
  const [tempGenres, setTempGenres] = useState<string[]>([])
  const [tempSort, setTempSort] = useState<'asc' | 'desc'>('asc')
  const [selectedSort, setSelectedSort] = useState('rating-desc');

  const handleApplyFilters = () => {
    setSelectedPlatforms(tempPlatforms)
    setSelectedGenres(tempGenres)
    onPlatformsChange(tempPlatforms)
    onGenresChange(tempGenres)
    onSortChange(tempSort)
    setSelectedConditions(tempConditions)
    onConditionChange(tempConditions)
  }

  const handleResetFilters = () => {
    setTempPlatforms([])
    setTempGenres([])
    setTempSort('asc')
    setSelectedConditions([])
    setTempConditions([])
    setSelectedPlatforms([])
    setSelectedGenres([])
    onPlatformsChange([])
    onGenresChange([])
    onSortChange('asc')
    onConditionChange([])
  }

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    const [field, direction] = value.split('-');
    onSortChange(direction as 'asc' | 'desc');
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-2xl font-bold">Filters</h2>
        <div className="flex items-center justify-end gap-2">
          <span className="text-sm font-medium">Sort by</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {SORT_OPTIONS.find(opt => opt.value === selectedSort)?.label}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {SORT_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="flex items-center gap-4 p-4 border-b">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Platforms ({tempPlatforms.length})
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {platforms.map((platform) => (
              <DropdownMenuCheckboxItem
                key={platform}
                checked={tempPlatforms.includes(platform)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setTempPlatforms([...tempPlatforms, platform])
                  } else {
                    setTempPlatforms(tempPlatforms.filter(p => p !== platform))
                  }
                }}
              >
                {platform}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Genres ({tempGenres.length})
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {genres.map((genre) => (
              <DropdownMenuCheckboxItem
                key={genre}
                checked={tempGenres.includes(genre)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setTempGenres([...tempGenres, genre])
                  } else {
                    setTempGenres(tempGenres.filter(g => g !== genre))
                  }
                }}
              >
                {genre}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Conditions ({tempConditions.length})
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {conditions.map((conditions) => (
              <DropdownMenuCheckboxItem
                key={conditions}
                checked={tempConditions.includes(conditions)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setTempConditions([...tempConditions, conditions])
                  } else {
                    setTempConditions(tempConditions.filter(g => g !== conditions))
                  }
                }}
              >
                {conditions}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center w-full">
          <div className="ml-auto flex gap-2">
            <Button onClick={handleApplyFilters}>
              Apply Filters
            </Button>
            <Button variant="outline" onClick={handleResetFilters}>
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}