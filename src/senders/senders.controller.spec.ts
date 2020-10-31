import { Test, TestingModule } from '@nestjs/testing';
import { SendersController } from './senders.controller';

describe('SendersController', () => {
  let controller: SendersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SendersController],
    }).compile();

    controller = module.get<SendersController>(SendersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
