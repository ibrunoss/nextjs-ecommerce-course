"use client";
import { HTMLAttributes, useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type ProductImagesProps = {
  productName: string;
  srcImages: string[];
} & Omit<HTMLAttributes<HTMLDivElement>, "children">;

export const ProductImages = ({
  className,
  productName,
  srcImages,
  ...props
}: ProductImagesProps) => {
  const [current, setCurrent] = useState(0);

  function createSetCurrentHandler(idx: number) {
    return () => {
      setCurrent(() => idx);
    };
  }

  return (
    <div className={cn("space-y-4", className)} {...props}>
      <Image
        alt={`Imagem ${current + 1} do produto ${productName}`}
        className="min-h-[300px] object-center object-cover"
        src={srcImages[current]}
        width={1000}
        height={1000}
      />
      <div className="flex">
        {srcImages.map((src, idx) => (
          <button
            aria-label={`Seleciona a imagem miniatura ${
              idx + 1
            } do produto ${productName}`}
            key={src}
            className={cn(
              "border mr-2 cursor-pointer hover:border-orange-600",
              {
                "border-orange-600": current === idx,
              }
            )}
            onClick={createSetCurrentHandler(idx)}
          >
            <Image
              src={src}
              alt={`Imagem miniatura ${idx + 1} do produto ${productName}`}
              width={100}
              height={100}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
