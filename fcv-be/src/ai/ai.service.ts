import { Injectable } from '@nestjs/common';
import { StoredFile } from '../storage/storage.interface';
import { CoughSampleResult } from './ai.interface';

@Injectable()
export class AiService {
  async processCoughSample(file: StoredFile, test_type: string): Promise<CoughSampleResult> {
    // TODO: return a random value
    return {
      confidence: Math.random()
    }
  }
}
