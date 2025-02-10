import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class UserModel {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findByEmail(
    email: string,
  ): Promise<(User & { _id: Types.ObjectId }) | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(
    id: Types.ObjectId,
  ): Promise<(User & { _id: Types.ObjectId }) | null> {
    return this.userModel.findById(id).exec();
  }
}
