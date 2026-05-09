import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from '../drizzle/drizzle.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class CatalogServiceService {
  constructor(@Inject(DRIZZLE) private readonly drizzle: NodePgDatabase<typeof schema>) {}

  async createProduct(name: string, price: number, stock: number) {
    const product: typeof schema.products.$inferInsert = {
      name,
      price,
      stock
    };
    return this.drizzle.insert(schema.products).values(product).returning();
  }

  async getProducts() {
    return this.drizzle.select().from(schema.products);
  }

  async getProductById(id: number) {
    return this.drizzle.select().from(schema.products).where(eq(schema.products.id, id));
  }

  async updateProduct(id: number, name?: string, price?: number, stock?: number) {
    return this.drizzle.update(schema.products).set({
      name,
      price,
      stock
    }).where(eq(schema.products.id, id)).returning();
  }

  async deleteProduct(id: number) {
    return this.drizzle.delete(schema.products).where(eq(schema.products.id, id)).returning();
  }
}