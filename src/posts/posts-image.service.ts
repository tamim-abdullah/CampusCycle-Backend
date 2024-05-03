import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/users/users-image-cloudinary.service';

@Injectable()
export class PostsImageService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async uploadImage(imageData) {
    const result: any = await this.cloudinaryService.upload(imageData);
    return result.secure_url;
  }
}
