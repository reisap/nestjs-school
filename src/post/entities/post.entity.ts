import { AbstractModel } from '@app/common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'post' })
export class Post extends AbstractModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;
}
