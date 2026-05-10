import { Module } from '@nestjs/common';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as schema from './schema';

export const DRIZZLE = Symbol('DRIZZLE-connection');
@Module({
  providers: [
    {
      provide: DRIZZLE,
      useFactory: async () => {
        dotenv.config();
        const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres_pwd@localhost:5431/postgres?schema=public';
        if (!databaseUrl) {
          throw new Error(
            'DATABASE_URL is not defined in the environment variables',
          );
        }
        const pool = new Pool({
          connectionString: databaseUrl,
        });
        return drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
