import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductType } from './product-types.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductTypesService {
  constructor(
    @InjectRepository(ProductType) private repository: Repository<ProductType>,
  ) {}

  create(name: string) {
    const productType = this.repository.create({
      name: name,
    });

    return this.repository.save(productType);
  }

  find() {
    return this.repository.find();
  }

  findProductTypeById(id: number) {
    return this.repository.findOne({ where: { id } });
  }
}
