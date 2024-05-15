import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';

export abstract class AbstractService {
  protected readonly logger: Logger;
  constructor(private readonly repository: Repository<any>) {}

  async save(options) {
    return this.repository.save(options);
  }

  async find(options = {}) {
    return this.repository.find(options);
  }

  async findOne(options) {
    return this.repository.findOne(options);
  }

  async update(id: number, options) {
    return this.repository.update(id, options);
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }
}

/*
 jika kita membuat abstract service maka proses validasi akan pindah ke dalam controller,,ini menjadi tidak sesuai dengan prinsip solid
 namun jika ingin tetap menggunakan tahapan abstract ini, maka perlu penambahan generic di service ini dan melepas abstract repository. silahkan dipilih
 saran, lebih memilih tidak menggunakan abstract service karena didalam service 
*/
