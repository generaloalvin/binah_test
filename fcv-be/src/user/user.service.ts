import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(@Inject(UserModel) private readonly userModel: UserModel) {}

  async create(user: User): Promise<User> {
    return this.userModel.create(user);
  }
}
