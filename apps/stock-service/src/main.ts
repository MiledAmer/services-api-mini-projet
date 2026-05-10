import { NestFactory } from '@nestjs/core';
import { StockServiceModule } from './stock-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { STOCK_PACKAGE_NAME } from '../../types/proto/stock';
import { join } from 'path';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    StockServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        package: STOCK_PACKAGE_NAME,
        protoPath: join(__dirname, './proto/stock.proto')
      }
    },
  );
  await app.listen();

  Logger.log('✅ Stock Service (GRPC) is listening ...');
}
bootstrap();
