import React from "react";

export const displayTag = (tag: string) => {
  switch (tag) {
    case "bestSellers":
      return <div className="bg-red-500 text-primary-foreground font-bold p-2 rounded-full">Best Sellers</div>;
    case "comingSoon":
      return <div className="bg-yellow-500 text-primary-foreground font-bold p-2 rounded-full">Coming Soon</div>;
    case "newReleases":
      return <div className="bg-green-500 text-primary-foreground font-bold p-2 rounded-full">New Releases</div>;
    case "specialOffers":
      return <div className="bg-blue-500 text-primary-foreground font-bold p-2 rounded-full">Special Offers</div>;
    default:
      return <div className="bg-gray-500 text-primary-foreground font-bold p-2 rounded-full">Unknown Tag</div>;
  }
};

export const displayStatus = (status: string) => {
  const statusClasses = {
    available: "bg-green-500 ",
    unavailable: "bg-red-500 ",
  };

  return (
    <div className={`${statusClasses[status as keyof typeof statusClasses] || "bg-gray-500"} text-primary-foreground font-bold px-3 py-2 rounded-full`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
};

export const displayRating = (rating: number) => {
  const ratingColor = rating >= 4.8 ? "bg-green-700" :
                      rating >= 4.5 ? "bg-green-500" :
                      rating > 4 ? "bg-green-300" :
                      "bg-orange-500";

  return (
    <div className={`${ratingColor} text-white font-bold px-3 py-1 rounded-full text-sm`}>
      {rating.toFixed(1)}
    </div>
  );
};


