import { Test, TestingModule } from '@nestjs/testing';
import { DonationAmountsController } from './donation_amounts.controller';

describe('DonationAmountsController', () => {
  let controller: DonationAmountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DonationAmountsController],
    }).compile();

    controller = module.get<DonationAmountsController>(DonationAmountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
