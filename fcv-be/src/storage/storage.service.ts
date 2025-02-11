import { Injectable } from '@nestjs/common';
import { StoredFile, Storage } from './storage.interface';
import { promises as fs } from 'fs';
import { resolve } from 'path';

@Injectable()
export class LocalStorageService implements Storage {
  private uploadsPath = resolve(__dirname, '../../../uploads');

  async uploadFile(file: Express.Multer.File): Promise<StoredFile> {
    const filePath = `${this.uploadsPath}/${Date.now() + '_' + file.originalname}`;
    await fs.writeFile(filePath, file.buffer);

    return { path: filePath };
  }
}
