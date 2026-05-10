import { Module } from '@nestjs/common';
import { CatalogServiceController } from './catalog-service.controller';
import { CatalogServiceService } from './catalog-service.service';
import { DrizzleModule } from '../../drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [CatalogServiceController],
  providers: [CatalogServiceService],
})
export class CatalogServiceModule {}
