import { PrismaClient } from "@prisma/client";

// URL da conexão com o banco
const connectionString = process.env.DATABASE_URL!;

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: connectionString,
    },
  },
});
