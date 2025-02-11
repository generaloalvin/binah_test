import { Inject, Injectable } from '@nestjs/common';
import { STORAGE_KEY } from 'src/storage/storage';
import { Storage } from '../storage/storage.interface';
import { FcvTestTypes } from './fcv.enum';

@Injectable()
export class FcvService {
  constructor(
    @Inject(STORAGE_KEY) private readonly storage: Storage
  ) { }

  async processCoughSample(file: Express.Multer.File, test_type: FcvTestTypes, user_id: string): Promise<any> {

  }
}
