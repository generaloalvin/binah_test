import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Fcv, FcvDocument } from './fvc.schema';
import { Model } from 'mongoose';

@Injectable()
export class FcvModel {
  constructor(@InjectModel(Fcv.name) private fcvModel: Model<Fcv>) { }

  async create(fcv: Fcv): Promise<FcvDocument> {
    const createdFcv = new this.fcvModel(fcv);
    return createdFcv.save();
  }
}
