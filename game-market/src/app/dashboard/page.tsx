import { useState, useRef, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductShowcase } from "@/components/product-showcase"
import { NavMain } from "@/components/nav-main"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  categories: [
    "Recommended For You",
    "Best Sellers",
    "New Releases",
    "Coming Soon",
    "Special Offers"
  ],
  navMain: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  products: [
    {
      name: "PlayStation 5",
      price: 499,
      rating: 4.5,
      reviews: 120,
      discount: "Save 10%",
      image: "https://i0.wp.com/safezonegames.com/wp-content/uploads/2023/03/Sword-Art.webp?fit=1920%2C1080&ssl=1",
      badges: [
        { label: "Free Shipping", type: "truck" },
        { label: "Credit Card", type: "creditCard" },
      ],
    },
    {
      name: "Xbox Series X",
      price: 399,
      rating: 4.2,
      reviews: 80,
      discount: "Save 20%",
      image: "/images/xbox.jpg",
      badges: [
        { label: "Free Shipping", type: "truck" },
        { label: "Credit Card", type: "creditCard" },
      ],
    },
    {
      name: "Nintendo Switch",
      price: 299,
      rating: 4.8,
      reviews: 150,
      discount: "Save 15%",
      image: "/images/switch.jpg",
      badges: [
        { label: "Free Shipping", type: "truck" },
        { label: "Credit Card", type: "creditCard" },
      ],
    },
    {
      name: "Gaming Laptop",
      price: 1299,
      rating: 4.6,
      reviews: 90,
      discount: "Save 5%",
      image: "/images/gaming-laptop.jpg",
      badges: [
        { label: "Free Shipping", type: "truck" },
        { label: "Credit Card", type: "creditCard" },
      ],
    },
    {
      name: "Gaming Mouse",
      price: 59,
      rating: 4.3,
      reviews: 200,
      discount: "Save 25%",
      image: "/images/gaming-mouse.jpg",
      badges: [
        { label: "Free Shipping", type: "truck" },
      ],
    },
    {
      name: "Gaming Keyboard",
      price: 129,
      rating: 4.7,
      reviews: 180,
      discount: "Save 10%",
      image: "/images/gaming-keyboard.jpg",
      badges: [
        { label: "Free Shipping", type: "truck" },
        { label: "Credit Card", type: "creditCard" },
      ],
    },
    {
      name: "Gaming Headset",
      price: 89,
      rating: 4.4,
      reviews: 150,
      discount: "Save 15%",
      image: "/images/gaming-headset.jpg",
      badges: [
        { label: "Free Shipping", type: "truck" },
      ],
    },
    {
      name: "Gaming Chair",
      price: 249,
      rating: 4.5,
      reviews: 100,
      discount: "Save 20%",
      image: "/images/gaming-chair.jpg",
      badges: [
        { label: "Free Shipping", type: "truck" },
        { label: "Credit Card", type: "creditCard" },
      ],
    },
    {
      name: "VR Headset",
      price: 399,
      rating: 4.6,
      reviews: 70,
      discount: "Save 10%",
      image: "/images/vr-headset.jpg",
      badges: [
        { label: "Free Shipping", type: "truck" },
        { label: "Credit Card", type: "creditCard" },
      ],
    },
    {
      name: "Gaming Monitor",
      price: 349,
      rating: 4.7,
      reviews: 130,
      discount: "Save 15%",
      image: "/images/gaming-monitor.jpg",
      badges: [
        { label: "Free Shipping", type: "truck" },
        { label: "Credit Card", type: "creditCard" },
      ],
    },
  ],
}

function CarouselBanner({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastChangeTime = useRef<number>(Date.now());

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev === images.length - 1 ? 0 : prev + 1;
      return nextIndex;
    });
    lastChangeTime.current = Date.now();
  };

  const prevSlide = () => {
    stopAutoSlide();
    setCurrentIndex((prev) => {
      const prevIndex = prev === 0 ? images.length - 1 : prev - 1;
      lastChangeTime.current = Date.now();
      return prevIndex;
    });
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
    if (delta > 50) {
      nextSlide();
    } else if (delta < -50) {
      prevSlide();
    }
    startAutoSlide();
  };

  return (
    <div
      className="relative w-full sm:w-5/6 lg:w-3/4 min-h-[300px] max-h-[400px] overflow-hidden select-none mx-auto rounded-lg mt-4"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {/* Hình ảnh */}
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

      {/* Nút điều hướng */}
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

      {/* Chỉ báo trạng thái */}
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


export default function Page() {
  const bannerImages = [
    "https://content.wepik.com/statics/87301025/preview-page0.jpg",
    "https://content.wepik.com/statics/84559085/preview-page0.jpg",
    "https://content.wepik.com/statics/21948625/preview-page0.jpg",
  ];

  const navItems = data.navMain

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <Header user={data.user} className="sticky top-0 z-10 bg-background" />
        <main className="flex-grow overflow-y-auto">
          <div className="container mx-auto px-4">
            <CarouselBanner images={bannerImages} />
            {data.categories.map((category, index) => (
              <ProductShowcase
                key={index}
                category={category}
                products={data.products}
              />
            ))}
            <Footer className="bg-background z-10" />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

