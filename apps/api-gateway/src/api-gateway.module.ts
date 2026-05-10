import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { StockModule } from './stock/stock.module';
import { OrderModule } from './order/order.module';
@Module({
  imports: [ProductsModule, StockModule, OrderModule],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {}
