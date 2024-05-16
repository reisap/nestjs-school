import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AbstractModel {
  @PrimaryGeneratedColumn()
  id: bigint;

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
