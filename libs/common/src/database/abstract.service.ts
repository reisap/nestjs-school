import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';

export abstract class AbstractService<TRepository> {
  protected readonly logger: Logger;
  constructor(private readonly repository: Repository<TRepository>) {}

  async findOne(query: object) {
    return this.repository.findOne(query);
  }
}

/*
 jika kita membuat abstract service maka proses validasi akan pindah ke dalam controller,,ini menjadi tidak sesuai dengan prinsip solid
 namun jika ingin tetap menggunakan tahapan abstract ini, maka perlu penambahan generic di service ini
*/
