import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  makeOrder(@Body() createOrderDto: { productId: number; quantity: number; email: string }) {
    const { productId, quantity, email } = createOrderDto;
    return this.orderService.makeOrder(productId, quantity, email);
  }
}
