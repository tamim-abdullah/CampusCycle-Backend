// image.service.ts
import { Injectable } from '@nestjs/common';
import { CloudinaryService } from './events-image-cloudinary.service';

@Injectable()
export class EventsImageService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async uploadImage(imageData) {
    const result: any = await this.cloudinaryService.upload(imageData);
    return result.secure_url;
  }
}
