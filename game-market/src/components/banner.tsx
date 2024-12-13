import { useState, useRef, useEffect } from "react";

interface CarouselBannerProps {
  images: string[];
}

export function CarouselBanner({ images }: CarouselBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastChangeTime = useRef<number>(Date.now());

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => nextSlide(), 5000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    lastChangeTime.current = Date.now();
  };

  const prevSlide = () => {
    stopAutoSlide();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    lastChangeTime.current = Date.now();
    startAutoSlide();
  };

  const startX = useRef<number>(0);
  const endX = useRef<number>(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    stopAutoSlide();
    startX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    endX.current = e.clientX;
    const delta = startX.current - endX.current;
    if (delta > 50) nextSlide();
    else if (delta < -50) prevSlide();
    startAutoSlide();
  };

  return (
    <div
      className="relative w-full sm:w-5/6 lg:w-3/4 min-h-[300px] max-h-[400px] overflow-hidden select-none mx-auto rounded-lg mt-4"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full min-h-[300px] object-cover flex-shrink-0"
          />
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 z-10"
      >
        {"<"}
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 z-10"
      >
        {">"}
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
}
