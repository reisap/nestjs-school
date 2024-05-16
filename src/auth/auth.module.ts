import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { CommonModule } from '@app/common/common.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule, CommonModule],
  exports: [AuthService],
})
export class AuthModule {}
