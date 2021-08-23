import { Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  products: Product[] = [];

  insertProduct(title: string, price: number) {
    const id = new Date().toString();
    const newProduct = new Product(new Date().toString(), title, price);
    this.products.push(newProduct);
    return id;
  }
}
