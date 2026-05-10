import { Module } from '@nestjs/common';
import { OrderServiceController } from './order-service.controller';
import { OrderServiceService } from './order-service.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { STOCK_PACKAGE_NAME } from 'apps/types/proto/stock';
import { join } from 'path/win32';
import { DrizzleModule } from 'apps/drizzle/drizzle.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    DrizzleModule,
    ClientsModule.register([
      {
        name: STOCK_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: STOCK_PACKAGE_NAME,
          protoPath: join(__dirname, './proto/stock.proto'),
        },
      },
    ]),
    KafkaModule,
  ],
  controllers: [OrderServiceController],
  providers: [OrderServiceService],
})
export class OrderServiceModule {}
