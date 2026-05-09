import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('hello')
  getHello() {
    return this.productsService.getHello();
  }

  @Post()
  create(@Body() createProductDto: { name: string; price: number; stock: number }) {
    return this.productsService.create(createProductDto.name, createProductDto.price, createProductDto.stock);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: { name?: string; price?: number; stock?: number }) {
    return this.productsService.update(+id, updateProductDto.name, updateProductDto.price, updateProductDto.stock);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
