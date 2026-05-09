import { Injectable } from '@nestjs/common';

@Injectable()
export class StockServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
