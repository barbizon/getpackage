import { Test, TestingModule } from '@nestjs/testing';
import { SendersService } from './senders.service';

describe('SendersService', () => {
  let service: SendersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendersService],
    }).compile();

    service = module.get<SendersService>(SendersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
