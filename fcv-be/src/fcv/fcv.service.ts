import { Inject, Injectable } from '@nestjs/common';
import { STORAGE_KEY } from '../storage/storage';
import { Storage } from '../storage/storage.interface';
import { FcvModel } from './fcv.model';
import { Fcv } from './fvc.schema';
import { FcvTestTypes } from './fcv.enum';
import { AiService } from '../ai/ai.service';
import { CoughSampleResult } from '../ai/ai.interface';
import { FcvResults } from './fcv.interface';
import { FcvResultsDto } from './fcv.dto';

@Injectable()
export class FcvService {
  constructor(
    @Inject(STORAGE_KEY) private readonly storage: Storage,
    private readonly fcvModel: FcvModel,
    private readonly aiService: AiService,
  ) { }

  async processCoughSample(
    file: Express.Multer.File,
    test_types: string[],
    user_id: string,
  ): Promise<Fcv> {
    const storedFile = await this.storage.uploadFile(file);

    const results: FcvResults[] = await Promise.all(
      test_types.map<Promise<FcvResults>>(async (test_type: FcvTestTypes) => {
        let coughSampleResult: CoughSampleResult | null = null;
        let error_reason: string | null = null;

        try {
          coughSampleResult = await this.aiService.processCoughSample(
            storedFile,
            test_type,
          );
        } catch (error) {
          error_reason = error.message;
        }

        return {
          confidence: coughSampleResult?.confidence ?? null,
          error_reason,
          test_type,
          is_successful: !error_reason,
          created_at: new Date(),
        };
      }),
    );

    return this.fcvModel.create({
      cough_sample: storedFile,
      test_types: test_types as FcvTestTypes[],
      user: user_id as any,
      results,
    });
  }

  async getResults(
    user_id: string,
    test_type: FcvTestTypes,
  ): Promise<FcvResultsDto[]> {
    return (await this.fcvModel.getResultsForUser(user_id, test_type)).map(f => FcvResultsDto.fromFcvResults(f));
  }
}
