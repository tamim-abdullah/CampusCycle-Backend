import { Test, TestingModule } from '@nestjs/testing';
import { ProductBiddedImagesController } from './product-bidded-images.controller';

describe('ProductBiddedImagesController', () => {
  let controller: ProductBiddedImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductBiddedImagesController],
    }).compile();

    controller = module.get<ProductBiddedImagesController>(ProductBiddedImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
