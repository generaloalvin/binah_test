import { Global, Module } from '@nestjs/common';
import { LocalStorageService } from './storage.service';
import { STORAGE_KEY } from './storage';

@Global()
@Module({
  providers: [
    {
      provide: STORAGE_KEY,
      useClass: LocalStorageService,
    },
  ],
  exports: [STORAGE_KEY],
})
export class StorageModule {}
