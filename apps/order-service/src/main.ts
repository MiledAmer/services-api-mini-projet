import { NestFactory } from '@nestjs/core';
import { OrderServiceModule } from './order-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(OrderServiceModule,{
    transport : Transport.TCP,
      options : {
        port : 3002
      }
  });
  await app.listen();
}
bootstrap();
