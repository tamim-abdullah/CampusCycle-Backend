import {
  Controller,
  Param,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductImagesService } from './product-images.service';

@Controller('product-images')
export class ProductImagesController {
  constructor(private productImagesService: ProductImagesService) {}

  @Patch('/image_upload/:productId')
  @UseInterceptors(FileInterceptor('image'))
  async upload(@UploadedFile() file, @Param('productId') productId: string) {
    return this.productImagesService.addImage(file, parseInt(productId));
  }
}
