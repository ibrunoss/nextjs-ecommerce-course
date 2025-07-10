import { PrismaClient } from "@prisma/client";

// URL da conexão com o banco
const connectionString = process.env.DATABASE_URL!;

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: connectionString,
    },
  },
}).$extends({
  result: {
    product: {
      price: {
        compute(product) {
          return product.price.toString();
        },
      },
      rating: {
        compute(product) {
          return product.rating.toString();
        },
      },
    },
  },
});
