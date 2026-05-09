import { Controller, Get } from '@nestjs/common';
import { StockServiceService } from './stock-service.service';

@Controller()
export class StockServiceController {
  constructor(private readonly stockServiceService: StockServiceService) {}

  @Get()
  getHello(): string {
    return this.stockServiceService.getHello();
  }
}
