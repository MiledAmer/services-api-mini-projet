import { NestFactory } from '@nestjs/core';
import { CatalogServiceModule } from './catalog-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CatalogServiceModule,
    {
      transport : Transport.TCP,
      options : {
        port : 3001
      }
    }

  );
  await app.listen();
}
bootstrap();
