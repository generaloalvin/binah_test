import { Injectable } from '@nestjs/common';
import { StoredFile, Storage } from './storage.interface';
import { promises as fs } from 'fs';
import path from 'path';

@Injectable()
export class LocalStorageService implements Storage {
  private uploadsPath = path.resolve(__dirname, '../../uploads');

  async uploadFile(file: Express.Multer.File): Promise<StoredFile> {
    const filePath = `${this.uploadsPath}/${file.originalname}`;
    await fs.writeFile(filePath, file.buffer);

    return { path: filePath };
  }
}
