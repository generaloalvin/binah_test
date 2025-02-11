import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './user.schema';
import { UserModel } from './user.model';

describe('UserService', () => {
  let service: UserService;
  const modelMock = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        UserModel,
        {
          provide: getModelToken(User.name),
          useValue: {},
        },
      ],
    })
      .overrideProvider(UserModel)
      .useValue(modelMock)
      .compile();

    service = module.get<UserService>(UserService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    modelMock.create.mockResolvedValueOnce({
      _id: '60f7b3b3b3b3b3b3b3b3b3b3',
      email: 'test@test.com',
      name: 'Test User',
    });

    const user = {
      email: 'test@test.com',
      name: 'Test User',
      password: 'testtest',
    };

    const createdUser = await service.create(user);

    expect(modelMock.create).toHaveBeenCalledWith(user);
    expect(createdUser).toEqual({
      _id: '60f7b3b3b3b3b3b3b3b3b3b3',
      email: 'test@test.com',
      name: 'Test User',
    });
  });
});
