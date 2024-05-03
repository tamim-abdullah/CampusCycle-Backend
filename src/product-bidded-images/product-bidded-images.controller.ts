import {
  Controller,
  Param,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductBiddedImagesService } from './product-bidded-images.service';

@Controller('product-bidded-images')
export class ProductBiddedImagesController {
  constructor(private productBiddedImagesService: ProductBiddedImagesService) {}

  @Patch('/image_upload/:productBiddedId')
  @UseInterceptors(FileInterceptor('image'))
  async upload(
    @UploadedFile() file,
    @Param('productBiddedId') productBiddedId: string,
  ) {
    return this.productBiddedImagesService.addImage(
      file,
      parseInt(productBiddedId),
    );
  }
}
