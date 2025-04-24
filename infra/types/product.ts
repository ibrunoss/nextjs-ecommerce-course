import { Product } from "@prisma/client";
import { z } from "zod";

import {
  productDatabaseInsertSchema,
  productDatabaseSchema,
} from "@/lib/validators/product";

export type ProductDatabaseInsert = z.infer<typeof productDatabaseInsertSchema>;

export type ProductDatabase = z.infer<typeof productDatabaseSchema>;

export type ProductMemory = {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  preco: number;
  estoque: number;
  marca: string;
};

export type ProductPrisma = Product;
