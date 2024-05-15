import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService],
  imports: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
