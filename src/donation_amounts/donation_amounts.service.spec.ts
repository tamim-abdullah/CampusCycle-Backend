import { Test, TestingModule } from '@nestjs/testing';
import { DonationAmountsService } from './donation_amounts.service';

describe('DonationAmountsService', () => {
  let service: DonationAmountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DonationAmountsService],
    }).compile();

    service = module.get<DonationAmountsService>(DonationAmountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
