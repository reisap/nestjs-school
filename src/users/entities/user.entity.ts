import { AbstractModel } from '@app/common/database';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User extends AbstractModel {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: true })
  inactive: boolean;

  @Column({ nullable: true })
  activationToken: string;

  @Column({ nullable: true })
  passwordResetToken: string;

  @Column({ nullable: true })
  image: string;
}
