import React, { useState } from "react";

interface StarRatingProps {
  onRatingSubmit: (rating: number) => void;
}

export function StarRating({ onRatingSubmit }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const handleMouseEnter = (rating: number) => {
    setHoverRating(rating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (rating: number) => {
    setSelectedRating(rating);
    onRatingSubmit(rating);
  };

  return (
    <div className="flex items-center gap-2">
      <div 
        className="flex"
        onMouseLeave={handleMouseLeave}
        role="radiogroup"
        aria-label="Product rating"
      >
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            className="p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onMouseEnter={() => handleMouseEnter(rating)}
            onClick={() => handleClick(rating)}
            role="radio"
            aria-checked={selectedRating === rating}
            aria-label={`Rate ${rating} out of 5 stars`}
          >
            <span
              className={`text-2xl ${
                rating <= (hoverRating || selectedRating)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }`}
            >
              ★
            </span>
          </button>
        ))}
      </div>
      {selectedRating > 0 && (
        <span className="text-sm text-muted-foreground">
          Your rating: {selectedRating}
        </span>
      )}
    </div>
  );
}

