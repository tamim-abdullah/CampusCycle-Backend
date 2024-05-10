import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { ProductTypesService } from './../product-types/product-types.service';
import { UsersService } from './../users/users.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private repository: Repository<Product>,
    private productTypesService: ProductTypesService,
    private usersService: UsersService,
  ) {}

  async create(
    title: string,
    description: string,
    price: number,
    productTypeId: number,
    lastSellingDate: Date,
    sellerId: number,
  ) {
    const productType =
      await this.productTypesService.findProductTypeById(productTypeId);

    const seller = await this.usersService.findOne(sellerId);

    const product = this.repository.create({
      title: title,
      time: new Date(),
      description: description,
      price: price,
      lastSellingDate: new Date(lastSellingDate),
      sellingCondition: 0, // not sold yet
      seller: seller,
    });

    product.productType = productType;
    return this.repository.save(product);
  }

  async find() {
    return this.repository.find({
      where: { sellingCondition: 0 },
      relations: ['productType', 'productImages', 'seller'],
    });
  }

  async getProductById(id: number) {
    return this.repository.findOne({
      where: { id, sellingCondition: 0 },
      relations: ['productType', 'productImages', 'seller'],
    });
  }

  async getProductByProductTypeId(productTypeId: number) {
    const productType =
      await this.productTypesService.findProductTypeById(productTypeId);
    const products = this.repository.find({
      where: { productType: productType, sellingCondition: 0 },
      relations: ['productType', 'productImages', 'seller'],
    });

    return products;
  }

  async sell(id: number) {
    const product = await this.repository.findOne({
      where: { id: id, sellingCondition: 0 },
    });
    product.sellingCondition = 1;
    this.repository.save(product);
  }
}
