import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { StockModule } from './stock/stock.module';
@Module({
  imports: [ProductsModule, StockModule],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {}
