import { PrismaClient } from '../generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let dbConfig;
const envUrl = process.env.DATABASE_URL || process.env.MYSQL_URL;
if (envUrl) {
  try {
    const url = new URL(envUrl);
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
