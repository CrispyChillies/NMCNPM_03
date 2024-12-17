import React, { useState } from "react";

const StarRating = () => {
  const [hoverIndex, setHoverIndex] = useState(-1); // For hover state
  const [selectedIndex, setSelectedIndex] = useState(-1); // For click state

  const stars = Array(5).fill(0); // Create an array of 5 stars
  const icons = ["😒", "😕", "🙄", "🙂", "😍"]; // Define the icons for each star level

  const handleMouseEnter = (index: number) => {
    setHoverIndex(index); // Update hoverIndex on hover
  };

  const handleMouseLeave = () => {
    setHoverIndex(-1); // Reset hoverIndex on mouse leave
  };

  const handleClick = (index: number) => {
    setSelectedIndex(index); // Set the selected star index on click
  };

  // Determine which icon should be displayed based on the number of stars
  const getIcon = () => {
    return icons[hoverIndex !== -1 ? hoverIndex : selectedIndex];
  };

  return (
    <div
      id="rating"
      className="flex flex-col items-center"
      onMouseLeave={handleMouseLeave}
    >
      {/* Display the icon that corresponds to the hovered or selected star */}
      <div className="text-4xl mb-2">{getIcon()}</div>

      {/* Map through the stars and display them */}
      <div>
        {stars.map((_, index) => (
          <span
            key={index}
            className={`cursor-pointer text-[50px] text-foreground opacity-100 inline-block transform origin-bottom-center transition-all duration-300 ${
              index <= (hoverIndex !== -1 ? hoverIndex : selectedIndex)
                ? "text-yellow-400 opacity-100 rotate-x-0 "
                : ""
            }`}
            style={{
              transform:
                index <= (hoverIndex !== -1 ? hoverIndex : selectedIndex)
                  ? "rotateX(0deg)"
                  : "rotateX(45deg)",
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onClick={() => handleClick(index)}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

export default StarRating;
