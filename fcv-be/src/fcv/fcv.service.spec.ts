import { Test, TestingModule } from '@nestjs/testing';
import { FcvService } from './fcv.service';

describe('FcvService', () => {
  let service: FcvService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FcvService],
    }).compile();

    service = module.get<FcvService>(FcvService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
