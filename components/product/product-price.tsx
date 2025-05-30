import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export type ProductPriceProps = {
  currencySymbol: string;
  integerPart: string;
  fractionalPart: string;
  fractionalSymbol: string;
} & Omit<HTMLAttributes<HTMLParagraphElement>, "children">;

type AlignSuperProps = {
  text: React.ReactNode;
};

const AlignSuper = ({ text }: AlignSuperProps) => {
  return <span className="text-xs align-super">{text}</span>;
};

export const ProductPrice = ({
  className,
  currencySymbol,
  integerPart,
  fractionalPart,
  fractionalSymbol,
  ...props
}: ProductPriceProps) => {
  return (
    <p {...props} className={cn("text-2xl", className)}>
      <AlignSuper text={`${currencySymbol} `} />
      {integerPart}
      <AlignSuper text={`${fractionalSymbol}${fractionalPart}`} />
    </p>
  );
};
