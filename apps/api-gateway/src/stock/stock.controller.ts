import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import {
  STOCK_PACKAGE_NAME,
  STOCK_SERVICE_NAME,
  type StockRequest,
  type StockServiceClient,
} from 'apps/types/proto/stock';
import { type ClientGrpc } from '@nestjs/microservices';

@Controller('stock')
export class StockController implements OnModuleInit {
  private stockService!: StockServiceClient;
  constructor(@Inject(STOCK_PACKAGE_NAME) private client: ClientGrpc) {}
  
  onModuleInit() {
    this.stockService = this.client.getService<StockServiceClient>(STOCK_SERVICE_NAME);
  }

  @Post()
  check(@Body() body: StockRequest) {
    return this.stockService.checkAndReserve(body);
  }
}
