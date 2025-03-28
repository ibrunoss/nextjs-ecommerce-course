import {
  FeaturedProductCardContent,
  FeaturedProductCardContentProps,
} from "@/components/product/featured/card/featured-product-card-content";
import {
  FeaturedProductCardHeader,
  FeaturedProductCardHeaderProps,
} from "@/components/product/featured/card/featured-product-card-header";
import { Card } from "@/components/ui/card";

export type FeaturedProductCardProps = FeaturedProductCardContentProps &
  FeaturedProductCardHeaderProps;

export const FeaturedProductCard = ({
  brand,
  imageAlt,
  imageSrc,
  isAvailable,
  link,
  name,
  price,
  rating,
}: FeaturedProductCardProps) => {
  return (
    <Card className="w-full max-w-sm">
      <FeaturedProductCardHeader
        imageAlt={imageAlt}
        imageSrc={imageSrc}
        link={link}
      />
      <FeaturedProductCardContent
        brand={brand}
        isAvailable={isAvailable}
        link={link}
        name={name}
        price={price}
        rating={rating}
      />
    </Card>
  );
};
