import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AbstractModel {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column({
    type: Date,
    default: () => Date.now(),
  })
  create_at: Date;

  @Column({
    type: Date,
    default: () => Date.now(),
  })
  update_at: Date;
}
