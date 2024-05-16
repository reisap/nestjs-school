import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class AbstractModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: Date,
    nullable: true,
    default: () => 'CURRENT_TIMESTAMPZ',
  })
  create_date;

  @Column({
    type: Date,
    nullable: true,
    default: () => 'CURRENT_TIMESTAMPZ',
  })
  update_date;
}
