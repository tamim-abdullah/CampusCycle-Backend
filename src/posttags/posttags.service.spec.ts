import { Test, TestingModule } from '@nestjs/testing';
import { PostTagsService } from './posttags.service';

describe('PosttagsService', () => {
  let service: PostTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostTagsService],
    }).compile();

    service = module.get<PostTagsService>(PostTagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
