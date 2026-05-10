import { Body, Controller, Post } from '@nestjs/common';
import { OrderServiceService } from './order-service.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class OrderServiceController {
  constructor(private readonly orderServiceService: OrderServiceService) {}

  @MessagePattern('order.createOrder')
  async makeOrder(data: {
    productId: number;
    quantity: number;
    email: string;
  }) {
    return await this.orderServiceService.MakeOrder(data);
  }
}
