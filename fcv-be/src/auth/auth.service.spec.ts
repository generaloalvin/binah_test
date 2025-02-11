import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserModel } from '../user/user.model';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  const modelMock = {
    create: jest.fn(),
    findByEmail: jest.fn(),
  };
  const jwtServiceMock = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserModel, JwtService],
    })
      .overrideProvider(UserModel)
      .useValue(modelMock)
      .overrideProvider(JwtService)
      .useValue(jwtServiceMock)
      .compile();

    service = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a token', async () => {
    modelMock.findByEmail = jest.fn().mockResolvedValueOnce({
      _id: '60f7b3b3b3b3b3b3b3b3b3',
      email: 'test@test.com',
      name: 'Test User',
      password: await service.hashPassword('testtest'),
    });
    jwtServiceMock.sign = jest.fn().mockReturnValue('token');

    const token = await service.login('test@test.com', 'testtest');

    expect(modelMock.findByEmail).toHaveBeenCalledWith('test@test.com');
    expect(jwtServiceMock.sign).toHaveBeenCalledWith({
      _id: '60f7b3b3b3b3b3b3b3b3b3',
      email: 'test@test.com',
    });
    expect(token).toEqual({
      success: true,
      token: 'token',
    });
  });

  it('should return a failure response', async () => {
    modelMock.findByEmail = jest.fn().mockResolvedValueOnce(null);

    const token = await service.login('error@test.com', 'testtest');

    expect(modelMock.findByEmail).toHaveBeenCalledWith('error@test.com');
    expect(token).toEqual({
      success: false,
    });

    expect(jwtServiceMock.sign).not.toHaveBeenCalled();
  });
});
