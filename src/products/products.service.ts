import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { ProductTypesService } from './../product-types/product-types.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private repository: Repository<Product>,
    private productTypesService: ProductTypesService,
  ) {}

  async create(
    title: string,
    description: string,
    price: number,
    productTypeId: number,
    lastSellingDate: Date,
    sellingCondition: number,
  ) {
    const productType =
      await this.productTypesService.findProductTypeById(productTypeId);

    const product = this.repository.create({
      title: title,
      time: new Date(),
      description: description,
      price: price,
      lastSellingDate: new Date(lastSellingDate),
      sellingCondition: sellingCondition,
    });

    product.productType = productType;
    return this.repository.save(product);
  }

  async find() {
    return this.repository.find();
  }

  async getProductById(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: ['productType', 'productImages'],
    });
  }

  async getProductByProductTypeId(productTypeId: number) {
    const productType =
      await this.productTypesService.findProductTypeById(productTypeId);
    const products = this.repository.find({
      where: { productType: productType },
      relations: ['productType', 'productImages'],
    });

    return products;
  }
}
