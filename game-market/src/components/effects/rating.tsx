import React, { useState } from "react";

const StarRating = () => {
  const [hoverIndex, setHoverIndex] = useState(-1); // For hover state
  const [selectedIndex, setSelectedIndex] = useState(-1); // For click state

  const stars = Array(5).fill(0); // Create an array of 5 stars

  const handleMouseEnter = (index: number) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(-1);
  };

  const handleClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div
      id="rating"
      className="flex justify-center"
      onMouseLeave={handleMouseLeave}
    >
      {stars.map((_, index) => (
        <span
          key={index}
          className={`cursor-pointer text-[50px] px-2 text-white opacity-50 inline-block transform origin-bottom-center transition-all duration-150 ${
            index <= (hoverIndex !== -1 ? hoverIndex : selectedIndex)
              ? "text-yellow-400 opacity-100 rotate-x-0 "
              : ""
          }`}
          style={{
            transform: index <= (hoverIndex !== -1 ? hoverIndex : selectedIndex)
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
  );
};

export default StarRating;
