import { Controller, Get } from '@nestjs/common';
import { CatalogServiceService } from './catalog-service.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class CatalogServiceController {
  constructor(private readonly catalogServiceService: CatalogServiceService) {}

  @MessagePattern('catalog.createProduct')
  async createProduct(data: { name: string; price: number; stock: number }) {
    return this.catalogServiceService.createProduct(data.name, data.price, data.stock);
  }

  @MessagePattern('catalog.getProducts')
  async getProducts() {
    return this.catalogServiceService.getProducts();
  }

  @MessagePattern('catalog.getProductById')
  async getProductById(data: { id: number }) {
    return this.catalogServiceService.getProductById(data.id);
  }

  @MessagePattern('catalog.updateProduct')
  async updateProduct(data: { id: number; name?: string; price?: number; stock?: number }) {
    return this.catalogServiceService.updateProduct(data.id, data.name, data.price, data.stock);
  }

  @MessagePattern('catalog.deleteProduct')
  async deleteProduct(data: { id: number }) {
    return this.catalogServiceService.deleteProduct(data.id);
  }
}
