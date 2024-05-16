import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '@app/common/database';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { CreateUserPostMiddleware } from '@app/common';

@Module({
  imports: [DatabaseModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CreateUserPostMiddleware)
      .forRoutes({ path: 'v1/users', method: RequestMethod.POST });
  }
}
