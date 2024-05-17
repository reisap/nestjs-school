import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordUser {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  new_password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
