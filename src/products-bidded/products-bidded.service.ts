import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductTypesService } from './../product-types/product-types.service';
import { ProductBidded } from 'src/products-bidded/product-bidded.entity';

@Injectable()
export class ProductsBiddedService {
  constructor(
    @InjectRepository(ProductBidded)
    private repository: Repository<ProductBidded>,
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

    const productBidded = this.repository.create({
      title: title,
      time: new Date(),
      description: description,
      price: price,
      lastSellingDate: new Date(lastSellingDate),
      sellingCondition: sellingCondition,
    });

    productBidded.productType = productType;
    return this.repository.save(productBidded);
  }

  async find() {
    return this.repository.find({ where: { sellingCondition: 0 } });
  }

  async getProductById(id: number) {
    return this.repository.findOne({
      where: { id: id, sellingCondition: 0 },
      relations: ['productType', 'images'],
    });
  }

  async getProductByProductTypeId(productTypeId: number) {
    const productType =
      await this.productTypesService.findProductTypeById(productTypeId);
    const products = this.repository.find({
      where: { productType: productType, sellingCondition: 0 },
      relations: ['productType', 'images'],
    });

    return products;
  }

  async sell(id: number) {
    const product = await this.repository.findOne({ where: { id: id } });
    product.sellingCondition = 1;
    this.repository.save(product);
  }
}
