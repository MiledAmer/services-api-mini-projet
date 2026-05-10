import {
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import {
  STOCK_PACKAGE_NAME,
  STOCK_SERVICE_NAME,
  StockServiceClient,
} from 'apps/types/proto/stock';
import { DRIZZLE } from '../../drizzle/drizzle.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../drizzle/schema';
import { type ClientGrpc } from '@nestjs/microservices';
import { ProducerService } from './kafka/producer.service';
import { eq, sql } from 'drizzle-orm';

@Injectable()
export class OrderServiceService implements OnModuleInit {
  private stockService!: StockServiceClient;
  constructor(
    @Inject(STOCK_PACKAGE_NAME) private client: ClientGrpc,
    @Inject(DRIZZLE) private readonly drizzle: NodePgDatabase<typeof schema>,
    private readonly producerService: ProducerService,
  ) {}

  async MakeOrder(data: {
    productId: number;
    quantity: number;
    email: string;
  }) {
    const { productId, quantity, email } = data;
    const checked = this.stockService.checkAndReserve({ productId, quantity });
    if (!checked) {
      throw new NotFoundException('Product not found or insufficient stock');
    }

    const orderData: typeof schema.orders.$inferInsert = {
      productId,
      quantity,
      email,
    };
    const order = await this.createRecordAndUpdateStock(
      productId,
      quantity,
      email,
    );

    await this.producerService.produce({
      topic: 'order.created',
      messages: [
        {
          value: JSON.stringify(data),
        },
      ],
    });

    return order;
  }
  async createRecordAndUpdateStock(
    productId: number,
    quantity: number,
    email: string,
  ) {
    const orderData: typeof schema.orders.$inferInsert = {
      productId,
      quantity,
      email,
    };
    return await this.drizzle.transaction(async (tx) => {
      const insertedOrder = await tx
        .insert(schema.orders)
        .values(orderData)
        .returning();

      await tx
        .update(schema.products)
        .set({
          stock: sql`${schema.products.stock} - ${quantity}`,
        })
        .where(eq(schema.products.id, productId))
        .returning();

      return insertedOrder;
    });
  }

  onModuleInit() {
    this.stockService =
      this.client.getService<StockServiceClient>(STOCK_SERVICE_NAME);
  }
}
