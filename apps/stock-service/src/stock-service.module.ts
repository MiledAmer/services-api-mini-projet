import { Module } from '@nestjs/common';
import { StockServiceController } from './stock-service.controller';
import { StockServiceService } from './stock-service.service';
import { DrizzleModule } from '../../drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [StockServiceController],
  providers: [StockServiceService],
})
export class StockServiceModule {}
