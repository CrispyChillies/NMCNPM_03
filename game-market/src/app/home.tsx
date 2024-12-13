import { CarouselBanner } from "@/components/banner";
import { ProductShowcase } from "@/components/product-showcase";
import { categories, navMain, products } from "./data/data-home";
import banner1 from "@/images/banner1.jpg";
import banner2 from "@/images/banner2.jpg";
import banner3 from "@/images/banner3.jpg";

const data = { categories, navMain, products };
const banner = [banner1, banner2, banner3];

export default function Page() {
  return (
    <>
      <CarouselBanner images={banner} />
      {data.categories.map((category, index) => (
        <ProductShowcase
          key={index}
          category={category}
          products={data.products}
        />
      ))}
    </>
  );
}
