import { Module } from '@nestjs/common';
import { StockServiceController } from './stock-service.controller';
import { StockServiceService } from './stock-service.service';

@Module({
  imports: [],
  controllers: [StockServiceController],
  providers: [StockServiceService],
})
export class StockServiceModule {}
