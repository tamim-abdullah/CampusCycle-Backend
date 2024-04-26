// cloudinary.service.ts
import { Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.v2.config({
      cloud_name: 'dxqn5uggh',
      api_key: '385476389777997',
      api_secret: 'sMYwffyjZhn52QcSEIVDNgDgrNI',
    });
  }

  async upload(imageData: any) {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream({ resource_type: 'image' }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
        .end(imageData.buffer);
    });
  }
}
