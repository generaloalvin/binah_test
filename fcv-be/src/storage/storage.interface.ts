import { Express } from 'express';

export interface StoredFile {
  path: string;
}

export interface Storage {
  uploadFile(file: Express.Multer.File): Promise<StoredFile>;
}
