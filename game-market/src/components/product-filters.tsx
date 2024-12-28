import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface ProductFiltersProps {
  onApplyFilters: (platforms: string[], genres: string[], conditions: string[], status: string[], tags: string[], sortBy: string) => void;
  onReset: () => void;
}

const platforms = [
  "playstation5",
  "playstation4", 
  "xboxSeriesX",
  "xboxOne",
  "nintendoSwitch",
  "pc"
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
  "new",
  "likeNew", 
  "good",
  "fair"
];

const statuses = [
  "available",
  "unavailable" 
];

const tags = [
  "bestSellers",
  "newReleases",
  "comingSoon", 
  "specialOffers"
];

type SortOption = {
  value: string;
  label: string;
};

const SORT_OPTIONS: SortOption[] = [
  { value: 'rating-desc', label: 'Rating' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'price-asc', label: 'Price: Low to High' },
];

export function ProductFilters({ onApplyFilters, onReset }: ProductFiltersProps) {
  const [selectedSort, setSelectedSort] = useState('rating-desc');
  const [tempPlatforms, setTempPlatforms] = useState<string[]>([]);
  const [tempGenres, setTempGenres] = useState<string[]>([]);
  const [tempConditions, setTempConditions] = useState<string[]>([]);
  const [tempStatuses, setTempStatuses] = useState<string[]>([]);
  const [tempTags, setTempTags] = useState<string[]>([]);

  const handleApplyFilters = () => {
    onApplyFilters(
      tempPlatforms,
      tempGenres, 
      tempConditions,
      tempStatuses,
      tempTags,
      selectedSort
    );
  };

  const handleResetFilters = () => {
    setTempPlatforms([]);
    setTempGenres([]);
    setTempConditions([]);
    setTempStatuses([]);
    setTempTags([]);
    setSelectedSort('rating-desc');
    onReset(); // Call parent reset handler
  };

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    // Only apply sort, using empty arrays for filters
    onApplyFilters([], [], [], [], [], value);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center px-6 mt-8">
        <h2 className="text-xl font-bold px-4">Filters</h2>
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
                    setTempPlatforms([...tempPlatforms, platform]);
                  } else {
                    setTempPlatforms(tempPlatforms.filter(p => p !== platform));
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
                    setTempGenres([...tempGenres, genre]);
                  } else {
                    setTempGenres(tempGenres.filter(g => g !== genre));
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
            {conditions.map((condition) => (
              <DropdownMenuCheckboxItem
                key={condition}
                checked={tempConditions.includes(condition)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setTempConditions([...tempConditions, condition]);
                  } else {
                    setTempConditions(tempConditions.filter(c => c !== condition));
                  }
                }}
              >
                {condition}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Tags ({tempTags.length})
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {tags.map((tag) => (
              <DropdownMenuCheckboxItem
                key={tag}
                checked={tempTags.includes(tag)}
                onCheckedChange={(checked) => {
                  setTempTags(checked
                    ? [...tempTags, tag]
                    : tempTags.filter(t => t !== tag)
                  );
                }}
              >
                {tag}
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
  );
}
