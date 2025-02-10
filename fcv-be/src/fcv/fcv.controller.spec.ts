import { Test, TestingModule } from '@nestjs/testing';
import { FcvController } from './fcv.controller';

describe('FcvController', () => {
  let controller: FcvController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FcvController],
    }).compile();

    controller = module.get<FcvController>(FcvController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
