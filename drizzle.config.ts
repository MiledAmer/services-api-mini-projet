import { defineConfig } from 'drizzle-kit';
import "dotenv/config";

export default defineConfig({
  schema: './apps/catalog-service/drizzle/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:postgres_pwd@localhost:5431/postgres?schema=public',
  },
});