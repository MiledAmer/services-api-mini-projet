import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from '../../drizzle/drizzle.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class QueryServiceService {
  constructor(
    @Inject(DRIZZLE) private readonly drizzle: NodePgDatabase<typeof schema>,
  ) {}
  async findAllProducts() {
    return this.drizzle.select().from(schema.products);
  }

  async findAllOrders() {
    return this.drizzle.select().from(schema.orders);
  }

  async findOneOrder(id: number) {
    const order = await this.drizzle.select().from(schema.orders).where(eq(schema.orders.id, id));
    return order[0];
  }
}