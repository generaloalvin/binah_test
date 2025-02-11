import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginResponse, JwtPayload } from './auth.interface';
import { UserModel } from '../user/user.model';
import { hash, compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  private readonly saltRounds = 0;

  constructor(
    private jwtService: JwtService,
    @Inject(forwardRef(() => UserModel)) private userModel: UserModel,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return hash(password, this.saltRounds);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    try {
      return await compare(password, hash);
    } catch {
      return false;
    }
  }

  async login(email: string, password: string): Promise<AuthLoginResponse> {
    const user = await this.userModel.findByEmail(email);

    if (!user) {
      return {
        success: false,
      };
    }

    const isValidPassword = await this.comparePassword(password, user.password);

    if (!isValidPassword) {
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
