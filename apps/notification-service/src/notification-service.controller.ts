import { Controller, Get, Logger } from '@nestjs/common';
import { NotificationServiceService } from './notification-service.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationServiceController {
  constructor(private readonly notificationServiceService: NotificationServiceService) {}

  @EventPattern('order.created')
  handleOrderCreated(@Payload() message: any) {
    Logger.log(`📩 Received message: ${JSON.stringify(message)}`);
  }
}
