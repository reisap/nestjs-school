import { AbstractModel } from '@app/common/database';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User extends AbstractModel {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  inactive: boolean;

  @Column()
  activationToken: string;

  @Column()
  passwordResetToken: string;

  @Column()
  image: string;
}
