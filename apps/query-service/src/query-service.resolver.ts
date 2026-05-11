import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { QueryServiceService } from './query-service.service';

@Resolver()
export class QueryServiceResolver {
  constructor(private readonly queryServiceService: QueryServiceService) {}

  @Query('products')
  findAllProducts() {
    return this.queryServiceService.findAllProducts();
  }

  @Query('orders')
  findAllOrders() {
    return this.queryServiceService.findAllOrders();
  }

  @Query('orderById')
  findOneOrder(@Args('id', { type: () => Int }) id: number) {
    return this.queryServiceService.findOneOrder(id);
  }
}