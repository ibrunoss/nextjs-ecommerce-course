import { ReactNode } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

export type ProductCardProps = {
  content: ReactNode;
  header: ReactNode;
};
export const ProductCard = ({ content, header }: ProductCardProps) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0 flex justify-center">{header}</CardHeader>
      <CardContent className="p-4 grid gap-4">{content}</CardContent>
    </Card>
  );
};
