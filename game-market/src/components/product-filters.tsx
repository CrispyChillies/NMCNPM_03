import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronUp } from 'lucide-react';

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
  "action",
  "rpg", 
  "fps",
  "adventure",
  "sports",
  "racing",
  "strategy",
  "others"
];

const conditions = [
  "new",
  "likeNew", 
  "good",
  "fair"
];

// const statuses = [
//   "available",
//   "unavailable" 
// ];

const tags = [
  "bestSellers",
  "newReleases",
  "comingSoon", 
  "specialOffers"
];

const DISPLAY_NAMES: { [key: string]: string } = {
  playstation5: "Play Station 5",
  playstation4: "Play Station 4",
  xboxSeriesX: "Xbox Series X",
  xboxOne: "Xbox One",
  nintendoSwitch: "Nintendo Switch",
  pc: "PC",
  action: "Action",
  rpg: "RPG",
  fps: "FPS",
  adventure: "Adventure",
  sports: "Sports",
  racing: "Racing",
  strategy: "Strategy",
  others: "Others",
  new: "New",
  likeNew: "Like New",
  good: "Good",
  fair: "Fair",
  // available: "Available",
  // unavailable: "Unavailable",
  bestSellers: "Best Sellers",
  newReleases: "New Releases",
  comingSoon: "Coming Soon",
  specialOffers: "Special Offers"
};

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
  // const [tempStatuses, setTempStatuses] = useState<string[]>([]);
  const [tempTags, setTempTags] = useState<string[]>([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const handleApplyFilters = () => {
    onApplyFilters(
      tempPlatforms,
      tempGenres, 
      tempConditions,
      [], // tempStatuses,
      tempTags,
      selectedSort
    );
    // setIsFiltersVisible(false); // Collapse filters after applying
  };

  const handleResetFilters = () => {
    setTempPlatforms([]);
    setTempGenres([]);
    setTempConditions([]);
    // setTempStatuses([]);
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
          <Button variant="outline" onClick={() => setIsFiltersVisible(!isFiltersVisible)} className="w-36 justify-start">
            {isFiltersVisible ? <ChevronUp className="mr-2" /> : <ChevronDown className="mr-2" />}
            {isFiltersVisible ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>
      </div>

      <div className="border-b my-4"></div> {/* Separator line */}

      {isFiltersVisible && (
        <div className="flex flex-wrap items-center gap-4 px-4 mb-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Platforms ({tempPlatforms.length})
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
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
                  {DISPLAY_NAMES[platform]}
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
            <DropdownMenuContent>
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
                  {DISPLAY_NAMES[genre]}
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
            <DropdownMenuContent>
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
                  {DISPLAY_NAMES[condition]}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Status ({tempStatuses.length})
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {statuses.map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={tempStatuses.includes(status)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setTempStatuses([...tempStatuses, status]);
                    } else {
                      setTempStatuses(tempStatuses.filter(s => s !== status));
                    }
                  }}
                >
                  {DISPLAY_NAMES[status]}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu> */}

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
                  {DISPLAY_NAMES[tag]}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex-grow"></div> {/* This will push the buttons to the right */}

          <div className="flex items-center gap-2">
            <Button onClick={handleApplyFilters}>
              Apply Filters
            </Button>
            <Button variant="outline" onClick={handleResetFilters}>
              Reset
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}