// image.service.ts
import { Injectable } from '@nestjs/common';
import { CloudinaryService } from './users-image-cloudinary.service';

@Injectable()
export class UsersImageService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async uploadImage(imageData) {
    const result: any = await this.cloudinaryService.upload(imageData);
    return result.secure_url;
  }
}
