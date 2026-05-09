import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('CATALOG_SERVICE')
    private readonly catalogServiceClient: ClientProxy,
  ) {}

  getHello() {
    return this.catalogServiceClient.send<string>('catalog.hello', {});
  }

  create(name: string, price: number, stock: number) {
    return this.catalogServiceClient.send('catalog.createProduct', { name, price, stock });
  }

  findAll() {
    return this.catalogServiceClient.send('catalog.getProducts', {});
  }

  findOne(id: number) {
    return this.catalogServiceClient.send('catalog.getProductById', { id });
  }

  update(id: number, name?: string, price?: number, stock?: number) {
    return this.catalogServiceClient.send('catalog.updateProduct', { id, name, price, stock });
  }

  remove(id: number) {
    return this.catalogServiceClient.send('catalog.deleteProduct', { id });
  }
}
