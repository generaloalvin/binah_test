import { Test, TestingModule } from '@nestjs/testing';
import { FcvController } from './fcv.controller';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../user/user.schema';
import { UserModel } from '../user/user.model';
import { AuthService } from '../auth/auth.service';

describe('FcvController', () => {
  let controller: FcvController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FcvController],
      providers: [
        {
          provide: getModelToken(User.name),
          useValue: {},
        },
        UserModel,
        JwtService,
        AuthService,
      ],
    }).compile();

    controller = module.get<FcvController>(FcvController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
