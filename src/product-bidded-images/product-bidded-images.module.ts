import { Module } from '@nestjs/common';
import { ProductBiddedImagesController } from './product-bidded-images.controller';
import { ProductBiddedImagesService } from './product-bidded-images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductBiddedImage } from './product-bidded-image.entity';
import { ProductsBiddedModule } from './../products-bidded/products-bidded.module';
import { CloudinaryService } from 'src/users/users-image-cloudinary.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductBiddedImage]),
    ProductsBiddedModule,
  ],

  controllers: [ProductBiddedImagesController],
  providers: [ProductBiddedImagesService, CloudinaryService],
})
export class ProductBiddedImagesModule {}
