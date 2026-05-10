import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { STOCK_PACKAGE_NAME } from 'apps/types/proto/stock';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([{
      name:STOCK_PACKAGE_NAME,
      transport: Transport.GRPC,
      options: {
        package: STOCK_PACKAGE_NAME,
        protoPath: join(__dirname, './proto/stock.proto')
      },
    }])
  ],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
