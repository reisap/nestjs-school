import { Column } from 'typeorm';

export abstract class AbstractModel {
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
