import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImage } from './product-image.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/users/users-image-cloudinary.service';
import { ProductsService } from './../products/products.service';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ProductImage)
    private repository: Repository<ProductImage>,
    private cloudinaryService: CloudinaryService,
    private productsService: ProductsService,
  ) {}

  async addImage(imageData, productId) {
    const result: any = await this.cloudinaryService.upload(imageData);
    const url = result.secure_url;
    const product = await this.productsService.getProductById(productId);

    const productImage = this.repository.create({
      url: url,
      product: product,
    });

    return this.repository.save(productImage);
  }
}
