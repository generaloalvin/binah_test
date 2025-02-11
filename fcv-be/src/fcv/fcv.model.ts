import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Fcv, FcvDocument } from './fvc.schema';
import { Model } from 'mongoose';
import { FcvTestTypes } from './fcv.enum';
import { FcvResults } from './fcv.interface';

@Injectable()
export class FcvModel {
  constructor(@InjectModel(Fcv.name) private fcvModel: Model<Fcv>) { }

  async create(fcv: Fcv): Promise<FcvDocument> {
    const createdFcv = new this.fcvModel(fcv);
    return createdFcv.save();
  }

  async getResultsForUser(
    user_id: string,
    test_type: FcvTestTypes,
  ): Promise<FcvResults[]> {
    const results = await this.fcvModel
      .aggregate([
        {
          $match: {
            user: user_id,
            'results.test_type': test_type,
            'results.is_successful': true,
          },
        },
        {
          $project: {
            _id: 0,
            results: {
              $filter: {
                input: '$results',
                as: 'result',
                cond: {
                  $eq: ['$$result.test_type', 'TB'],
                },
              },
            },
          },
        },
        {
          $unwind: '$results',
        },
        {
          $sort: {
            'results.created_at': -1,
          }
        }
      ])
      .exec();

    return results.map((result) => result.results);
  }
}
