import { Logger } from '@nestjs/common';
import { AbstractModel } from './abstract.model';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

export interface BaseInterfaceRepository<TEntity> {
  create(data: DeepPartial<TEntity>): Promise<TEntity>;
  createMany(data: DeepPartial<TEntity>[]): Promise<TEntity[]>;
  save(data: DeepPartial<TEntity>): Promise<TEntity>;
  saveMany(data: DeepPartial<TEntity>[]): Promise<TEntity[]>;
  findOneById(id: any): Promise<TEntity>;
  findByCondition(filterCondition: FindOneOptions<TEntity>): Promise<TEntity>;
  findAll(options?: FindManyOptions<TEntity>): Promise<TEntity[]>;
  remove(data: TEntity): Promise<TEntity>;
  findWithRelations(relations: FindManyOptions<TEntity>): Promise<TEntity[]>;
  preload(entityLike: DeepPartial<TEntity>): Promise<TEntity>;
  findOne(options: FindOneOptions<TEntity>): Promise<TEntity>;
}

export abstract class AbstractRepository<TEntity extends AbstractModel>
  implements BaseInterfaceRepository<TEntity>
{
  protected abstract readonly logger: Logger;
  constructor(protected readonly entity: Repository<TEntity>) {}

  public async preload(entityLike: DeepPartial<TEntity>): Promise<TEntity> {
    return await this.entity.preload(entityLike);
  }

  //create
  public async create(data: DeepPartial<TEntity>): Promise<TEntity> {
    return await this.entity.create(data);
  }
  public async createMany(data: DeepPartial<TEntity>[]): Promise<TEntity[]> {
    return await this.entity.create(data);
  }
  //end create

  //find
  async findAll(options?: FindManyOptions<TEntity>): Promise<TEntity[]> {
    return await this.entity.find(options);
  }
  public async findOneById(id: any): Promise<TEntity> {
    const options: FindOptionsWhere<TEntity> = {
      id: id,
    };
    return await this.entity.findOneBy(options);
  }
  public async findOne(options: FindOneOptions<TEntity>): Promise<TEntity> {
    return this.entity.findOne(options);
  }
  public async findByCondition(
    filterCondition: FindOneOptions<TEntity>,
  ): Promise<TEntity> {
    return await this.entity.findOne(filterCondition);
  }
  public async findWithRelations(
    relations: FindManyOptions<TEntity>,
  ): Promise<TEntity[]> {
    return await this.entity.find(relations);
  }
  //end find

  //delete
  public async remove(data: TEntity): Promise<TEntity> {
    return await this.entity.remove(data);
  }

  //update
  public async save(data: DeepPartial<TEntity>): Promise<TEntity> {
    return await this.entity.save(data);
  }

  public async saveMany(data: DeepPartial<TEntity>[]): Promise<TEntity[]> {
    return this.entity.save(data);
  }
}
