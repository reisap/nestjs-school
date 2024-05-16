import { AbstractModel } from '@app/common/database';
import { Exclude } from 'class-transformer';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class User extends AbstractModel {
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ default: true })
  inactive: boolean;

  @Column({ nullable: true })
  activationToken: string;

  @Column({ nullable: true })
  passwordResetToken: string;

  @Column({ nullable: true })
  image: string;

  @DeleteDateColumn()
  deletedAt?: Date;
}
