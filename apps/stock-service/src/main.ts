import { NestFactory } from '@nestjs/core';
import { StockServiceModule } from './stock-service.module';

async function bootstrap() {
  const app = await NestFactory.create(StockServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
