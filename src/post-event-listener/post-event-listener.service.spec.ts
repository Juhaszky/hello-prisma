import { Test, TestingModule } from '@nestjs/testing';
import { PostEventListenerService } from './post-event-listener.service';

describe('PostEventListenerService', () => {
  let service: PostEventListenerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostEventListenerService],
    }).compile();

    service = module.get<PostEventListenerService>(PostEventListenerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
