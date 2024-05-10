import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsBiddedService } from './products-bidded.service';
import { CreateProductBiddedDto } from './dtos/create-product-bidded.dto';

@Controller('products-bidded')
export class ProductsBiddedController {
  constructor(private productsBiddedService: ProductsBiddedService) {}

  @Post('/create')
  async createProduct(@Body() body: CreateProductBiddedDto) {
    const productBidded = await this.productsBiddedService.create(
      body.title,
      body.description,
      body.price,
      body.productTypeId,
      body.lastSellingDate,
      body.sellerId,
    );

    return productBidded;
  }

  @Get()
  async getProductBiddeds() {
    return this.productsBiddedService.find();
  }

  @Get('/:id')
  async getProductBiddedById(@Param('id') id: number) {
    return this.productsBiddedService.getProductById(id);
  }

  @Get('/product_type/:id')
  async getProductBiddedByProductTypeId(@Param('id') id: number) {
    return this.productsBiddedService.getProductByProductTypeId(id);
  }

  @Post('/:id')
  async sellProduct(@Param('id') id: number) {
    return this.productsBiddedService.sell(id);
  }
}
