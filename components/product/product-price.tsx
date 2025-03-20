import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export type ProductPriceProps = {
  value: number;
} & Omit<HTMLAttributes<HTMLParagraphElement>, "children">;

type AlignSuperProps = {
  text: React.ReactNode;
};

const AlignSuper = ({ text }: AlignSuperProps) => {
  return <span className="text-xs align-super">{text}</span>;
};

export const ProductPrice = ({
  className,
  value,
  ...props
}: ProductPriceProps) => {
  const stringValue = value.toFixed(2);
  const [integer, decimal] = stringValue.split(".");
  return (
    <p {...props} className={cn("text-2xl", className)}>
      <AlignSuper text="R$ " />
      {integer}
      <AlignSuper text={`,${decimal}`} />
    </p>
  );
};
