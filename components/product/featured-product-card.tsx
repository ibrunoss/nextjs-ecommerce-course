import Image from "next/image";
import Link from "next/link";

import { RenderIf } from "@/components/common/render-if";
import { ProductCard } from "@/components/product/product-card";
import { ProductPrice } from "@/components/product/product-price";

export type FeaturedProductCardProps = {
  link: string;
  imageSrc: string;
  imageAlt: string;
  price: number;
  rating: number;
  isAvailable: boolean;
  brand: string;
  name: string;
};

type HeaderProps = Pick<
  FeaturedProductCardProps,
  "link" | "imageSrc" | "imageAlt"
>;

const Header = ({ imageAlt, imageSrc, link }: HeaderProps) => {
  return (
    <Link href={link}>
      <Image src={imageSrc} alt={imageAlt} height={300} width={300} priority />
    </Link>
  );
};

type ContentProps = Pick<
  FeaturedProductCardProps,
  "brand" | "isAvailable" | "link" | "name" | "price" | "rating"
>;

const Content = ({
  brand,
  isAvailable,
  link,
  name,
  price,
  rating,
}: ContentProps) => {
  return (
    <>
      <div className="text-xs">{brand}</div>
      <Link href={link}>
        <h2 className="text-sm font-medium">{name}</h2>
      </Link>
      <div className="flex-between gap-4">
        <p>Avaliação: {rating}</p>
        <RenderIf
          when={isAvailable}
          fallback={<p className="text-destructive">Indisponível</p>}
        >
          <ProductPrice value={price} />
        </RenderIf>
      </div>
    </>
  );
};

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
    <ProductCard
      header={<Header imageAlt={imageAlt} imageSrc={imageSrc} link={link} />}
      content={
        <Content
          brand={brand}
          isAvailable={isAvailable}
          link={link}
          name={name}
          price={price}
          rating={rating}
        />
      }
    />
  );
};
