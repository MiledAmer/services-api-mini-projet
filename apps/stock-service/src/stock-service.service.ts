import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from '../../drizzle/drizzle.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../drizzle/schema';
import { eq } from 'drizzle-orm';
import { StockRequest, StockResponse } from 'apps/types/proto/stock';

@Injectable()
export class StockServiceService {
  constructor(
    @Inject(DRIZZLE) private readonly drizzle: NodePgDatabase<typeof schema>,
  ) {}

  async getStockLevels(request: StockRequest): Promise<StockResponse> {
    const product = await this.drizzle
      .select()
      .from(schema.products)
      .where(eq((schema.products.id), Number(request.productId)));
    if (!product.length) {
      return {
        available: false,
        message: 'Product not found',
      };
    }
    if (product[0].stock >= request.quantity) {
      return {
        available: true,
        message: 'Stock available',
      };
    } else {
      return {
        available: false,
        message: 'Stock not available',
      };
    }
  }
}
