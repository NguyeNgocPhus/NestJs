import { Controller, Post, Body } from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}
  @Post()
  addProduct(@Body('title') title: string, @Body('price') price: number) {
    const id = this.productsService.insertProduct(title, price);
    return { id: id };
  }
}
