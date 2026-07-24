import { PrismaClient } from '../generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let dbConfig;
if (process.env.DATABASE_URL) {
  try {
    const url = new URL(process.env.DATABASE_URL);
    dbConfig = {
      host: url.hostname,
      port: Number(url.port) || 3306,
      user: url.username,
      password: url.password,
      database: url.pathname.substring(1)
    };
  } catch (e) {
    dbConfig = { host: 'localhost', port: 3306, user: 'root', password: '', database: 'rijal_db' };
  }
} else {
  dbConfig = { host: 'localhost', port: 3306, user: 'root', password: '', database: 'rijal_db' };
}

const adapter = new PrismaMariaDb(dbConfig);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
