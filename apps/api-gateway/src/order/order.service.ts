import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_SERVICE')
    private readonly orderServiceClient: ClientProxy,
  ) {}

  makeOrder(productId: number, quantity: number, email: string) {
    return this.orderServiceClient.send('order.createOrder', { productId, quantity, email });
  }
}
