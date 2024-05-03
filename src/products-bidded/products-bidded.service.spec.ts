import { Test, TestingModule } from '@nestjs/testing';
import { ProductsBiddedService } from './products-bidded.service';

describe('ProductsBiddedService', () => {
  let service: ProductsBiddedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsBiddedService],
    }).compile();

    service = module.get<ProductsBiddedService>(ProductsBiddedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
