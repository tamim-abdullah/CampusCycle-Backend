import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post('/create')
  async createProduct(@Body() body: CreateProductDto) {
    const product = await this.productsService.create(
      body.title,
      body.description,
      body.price,
      body.productTypeId,
      body.lastSellingDate,
      body.sellingCondition,
    );

    return product;
  }

  @Get()
  async getProducts() {
    return this.productsService.find();
  }

  @Get('/:id')
  async getProductById(@Param('id') id: number) {
    return this.productsService.getProductById(id);
  }

  @Get('/product_type/:id')
  async getProductByProductTypeId(@Param('id') id: number) {
    return this.productsService.getProductByProductTypeId(id);
  }
}
