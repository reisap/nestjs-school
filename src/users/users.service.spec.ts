import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { BadRequestException } from '@nestjs/common';

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;
  const mockUserRepository = {
    findOneParams: jest.fn(),
    findOneById: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('changeUserPassword', () => {
    it('should throw an error if email not found', async () => {
      const changeUserPasswordDto = {
        email: 'test@example.com',
        password: 'oldPassword',
        new_password: 'newPassword',
      };

      repository.findOneParams(null);

      await expect(
        service.changeUserPassword(changeUserPasswordDto),
      ).rejects.toThrow(BadRequestException);
      expect(repository.findOneParams).toHaveBeenCalledWith({
        email: changeUserPasswordDto.email,
      });
    });
  });
});
