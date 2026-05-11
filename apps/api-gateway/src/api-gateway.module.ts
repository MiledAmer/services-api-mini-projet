import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { StockModule } from './stock/stock.module';
import { OrderModule } from './order/order.module';

import { GraphQLModule } from '@nestjs/graphql';

import {
  ApolloGatewayDriver,
  ApolloGatewayDriverConfig,
} from '@nestjs/apollo';

@Module({
  imports: [
    ProductsModule,
    StockModule,
    OrderModule,
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,

      gateway: {
        supergraphSdl: undefined,

        serviceList: [
          {
            name: 'query-service',
            url: 'http://localhost:3003/graphql',
          },
        ],
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {}
