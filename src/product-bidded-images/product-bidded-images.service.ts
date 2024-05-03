import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/users/users-image-cloudinary.service';
import { ProductsService } from './../products/products.service';
import { ProductBiddedImage } from 'src/product-bidded-images/product-bidded-image.entity';
import { ProductsBiddedService } from './../products-bidded/products-bidded.service';

@Injectable()
export class ProductBiddedImagesService {
  constructor(
    @InjectRepository(ProductBiddedImage)
    private repository: Repository<ProductBiddedImage>,
    private cloudinaryService: CloudinaryService,
    private productsBiddedService: ProductsBiddedService,
  ) {}

  async addImage(imageData, productBiddedId) {
    const result: any = await this.cloudinaryService.upload(imageData);
    const url = result.secure_url;
    const productBidded =
      await this.productsBiddedService.getProductById(productBiddedId);

    const productBiddedImage = this.repository.create({
      url: url,
      productBidded: productBidded,
    });

    return this.repository.save(productBiddedImage);
  }
}
