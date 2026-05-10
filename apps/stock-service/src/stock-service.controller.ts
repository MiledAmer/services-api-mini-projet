import { Controller, Get } from '@nestjs/common';
import { StockServiceService } from './stock-service.service';
import {
  StockServiceControllerMethods,
  StockServiceController as StockServiceControllerInteface,
  StockRequest,
  StockResponse,
} from 'apps/types/proto/stock';

@Controller()
@StockServiceControllerMethods()
export class StockServiceController implements StockServiceControllerInteface {
  constructor(private readonly stockServiceService: StockServiceService) {}

  async checkAndReserve(request: StockRequest): Promise<StockResponse> {
    return await this.stockServiceService.getStockLevels(request);
  }
}
