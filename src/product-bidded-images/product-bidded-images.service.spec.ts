import { Test, TestingModule } from '@nestjs/testing';
import { ProductBiddedImagesService } from './product-bidded-images.service';

describe('ProductBiddedImagesService', () => {
  let service: ProductBiddedImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductBiddedImagesService],
    }).compile();

    service = module.get<ProductBiddedImagesService>(ProductBiddedImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
