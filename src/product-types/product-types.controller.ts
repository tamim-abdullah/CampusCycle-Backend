import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductTypesService } from './product-types.service';
import { CreateProductTypeDto } from './dtos/create-product-type.dto';

@Controller('product-types')
export class ProductTypesController {
  constructor(private productTypesService: ProductTypesService) {}

  @Post('/create')
  createProductType(@Body() body: CreateProductTypeDto) {
    const productType = this.productTypesService.create(body.name);
    return productType;
  }

  @Get()
  find() {
    return this.productTypesService.find();
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.productTypesService.findProductTypeById(id);
  }
}
