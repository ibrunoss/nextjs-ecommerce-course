import Image from "next/image";
import Link from "next/link";

import { CardHeader } from "@/components/ui/card";

export type FeaturedProductCardHeaderProps = {
  link: string;
  imageSrc: string;
  imageAlt: string;
};

export const FeaturedProductCardHeader = ({
  imageAlt,
  imageSrc,
  link,
}: FeaturedProductCardHeaderProps) => {
  return (
    <CardHeader className="p-0 flex justify-center">
      <Link href={link}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          height={300}
          width={300}
          priority
        />
      </Link>
    </CardHeader>
  );
};
