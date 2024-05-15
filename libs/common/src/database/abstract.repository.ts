import { Logger } from '@nestjs/common';
import { AbstractModel } from './abstract.model';
import {
  DeepPartial,
  DeleteResult,
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
  delete(id: number): Promise<DeleteResult>;
  update(id: any, data: object | DeepPartial<TEntity> | any): Promise<TEntity>;
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
    /**
     * Offset (paginated) where from entities should be taken.
     */
    //skip?: number;
    /**
     * Limit (paginated) - max number of entities should be taken.
     */
    //take?: number;
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
  public async delete(id: number): Promise<DeleteResult> {
    try {
      return await this.entity.delete(id);
    } catch (e) {
      return null;
    }
  }
  //end delete

  //update
  public async update(
    id: any,
    data: object | DeepPartial<TEntity> | any,
  ): Promise<TEntity> {
    try {
      const tbl = await this.findOne(id);
      if (tbl === null) {
        return null;
      }
      await this.entity.update(id, data);
      const result = await this.entity.save(data);

      return result;
    } catch (e) {
      return null;
    }
  }
  public async save(data: DeepPartial<TEntity>): Promise<TEntity> {
    return await this.entity.save(data);
  }

  public async saveMany(data: DeepPartial<TEntity>[]): Promise<TEntity[]> {
    return this.entity.save(data);
  }
  //end update
}
