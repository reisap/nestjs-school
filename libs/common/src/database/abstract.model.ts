import { Column, Entity } from 'typeorm';

@Entity()
export class AbstractModel {
  @Column({
    type: Date,
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  create_date;

  @Column({
    type: Date,
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  update_at;
}
