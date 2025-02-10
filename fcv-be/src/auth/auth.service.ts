import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginResponse, JwtPayload } from './auth.interface';
import { UserModel } from '../user/user.model';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userModel: UserModel,
  ) {}

  async login(email: string): Promise<AuthLoginResponse> {
    const user = await this.userModel.findByEmail(email);

    if (!user) {
      return {
        success: false,
      };
    }

    const payload: JwtPayload = { _id: user._id, email };
    return {
      success: true,
      token: this.jwtService.sign(payload),
    };
  }
}
