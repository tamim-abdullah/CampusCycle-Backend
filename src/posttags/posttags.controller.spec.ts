import { Test, TestingModule } from '@nestjs/testing';
import { PosttagsController } from './posttags.controller';

describe('PosttagsController', () => {
  let controller: PosttagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PosttagsController],
    }).compile();

    controller = module.get<PosttagsController>(PosttagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
