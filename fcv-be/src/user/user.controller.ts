import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './user.dto';
import { AuthService } from '../auth/auth.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() body: LoginUserDto) {
    const response = await this.authService.login(body.email, body.password);

    if (!response.success) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return response;
  }
}
