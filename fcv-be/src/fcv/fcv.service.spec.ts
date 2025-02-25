import { Test, TestingModule } from '@nestjs/testing';
import { FcvService } from './fcv.service';
import { Storage, StoredFile } from '../storage/storage.interface';
import { STORAGE_KEY } from '../storage/storage';
import { FcvModel } from './fcv.model';
import { getModelToken } from '@nestjs/mongoose';
import { Fcv } from './fvc.schema';
import { FcvTestTypes } from './fcv.enum';
import { AiService } from '../ai/ai.service';

describe('FcvService', () => {
  let service: FcvService;
  const storageMock = {
    uploadFile: jest.fn(),
  };

  const modelMock = {
    create: jest.fn(),
    getResultsForUser: jest.fn(),
  };

  const mockFile: any = {
    path: 'test',
  };

  const aiServiceMock = {
    processCoughSample: jest.fn().mockResolvedValue({
      confidence: 0.9,
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FcvService,
        {
          provide: FcvModel,
          useValue: modelMock,
        },
        {
          provide: STORAGE_KEY,
          useValue: storageMock,
        },
        {
          provide: AiService,
          useValue: aiServiceMock,
        },
      ],
    }).compile();

    service = module.get<FcvService>(FcvService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should process cough sample', async () => {
    const createdFcv: Fcv = {
      cough_sample: {
        path: 'test',
      },
      test_types: [FcvTestTypes.SMK],
      user: 'test_id' as any,
      results: [],
    };

    const storedFile: StoredFile = {
      path: 'test',
    };

    modelMock.create.mockResolvedValueOnce(createdFcv);
    storageMock.uploadFile.mockResolvedValueOnce(storedFile);

    const fcv = await service.processCoughSample(
      mockFile,
      [FcvTestTypes.SMK],
      'test_id',
    );

    expect(storageMock.uploadFile).toHaveBeenCalled();
    expect(storageMock.uploadFile).toHaveBeenCalledWith(mockFile);
    expect(modelMock.create).toHaveBeenCalled();
    expect(modelMock.create).toHaveBeenCalledWith({
      ...createdFcv,
      results: [
        {
          confidence: 0.9,
          error_reason: null,
          is_successful: true,
          test_type: FcvTestTypes.SMK,
          created_at: expect.any(Date),
        },
      ],
    });
    expect(fcv).toEqual(createdFcv);
  });

  it('should process cough sample with multiple test types', async () => {
    const createdFcv: Fcv = {
      cough_sample: {
        path: 'test',
      },
      test_types: [FcvTestTypes.SMK, FcvTestTypes.TB],
      user: 'test_id' as any,
      results: [],
    };

    const storedFile1: StoredFile = {
      path: 'test',
    };

    modelMock.create.mockResolvedValueOnce(createdFcv);
    storageMock.uploadFile.mockResolvedValueOnce(storedFile1);

    const fcv = await service.processCoughSample(
      mockFile,
      [FcvTestTypes.SMK, FcvTestTypes.TB],
      'test_id',
    );

    expect(storageMock.uploadFile).toHaveBeenCalledTimes(1);
    expect(modelMock.create).toHaveBeenCalled();
    expect(modelMock.create).toHaveBeenCalledWith({
      ...createdFcv,
      results: [
        {
          confidence: 0.9,
          error_reason: null,
          is_successful: true,
          test_type: FcvTestTypes.SMK,
          created_at: expect.any(Date),
        },
        {
          confidence: 0.9,
          error_reason: null,
          is_successful: true,
          test_type: FcvTestTypes.TB,
          created_at: expect.any(Date),
        },
      ],
    });
    expect(fcv).toEqual(createdFcv);
  });

  it('should get cough sample results', async () => {
    const coughSampleResults: Fcv = {
      cough_sample: {
        path: 'test',
      },
      test_types: [FcvTestTypes.SMK],
      user: 'test_id' as any,
      results: [],
    };

    modelMock.getResultsForUser.mockResolvedValueOnce(coughSampleResults);

    const results = await service.getResults('test_id', FcvTestTypes.SMK);
    expect(modelMock.getResultsForUser).toHaveBeenCalled();
    expect(modelMock.getResultsForUser).toHaveBeenCalledWith(
      'test_id',
      FcvTestTypes.SMK,
    );
    expect(results).toEqual(coughSampleResults);
  });
});
