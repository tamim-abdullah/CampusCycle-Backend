import { Test, TestingModule } from '@nestjs/testing';
import { ProductsBiddedController } from './products-bidded.controller';

describe('ProductsBiddedController', () => {
  let controller: ProductsBiddedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsBiddedController],
    }).compile();

    controller = module.get<ProductsBiddedController>(ProductsBiddedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
