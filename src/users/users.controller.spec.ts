import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { NotificationService } from '../notification/notification.service';
import { JwtAuthGuard } from '@app/common';
import { JwtService } from '@nestjs/jwt';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let notificationService: NotificationService;

  const mockUsersService = {
    changeUserPassword: jest.fn(),
    verifyUserByEmailToken: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockNotificationService = {
    emailNotif: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        { provide: NotificationService, useValue: mockNotificationService },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useClass(JwtService)
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    notificationService = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
