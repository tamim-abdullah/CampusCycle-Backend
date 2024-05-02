import { Module } from '@nestjs/common';
import { ProductImagesController } from './product-images.controller';
import { ProductImagesService } from './product-images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from './product-image.entity';
import { CloudinaryService } from 'src/users/users-image-cloudinary.service';
import { ProductsModule } from './../products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImage]), ProductsModule],

  controllers: [ProductImagesController],
  providers: [ProductImagesService, CloudinaryService],
})
export class ProductImagesModule {}
