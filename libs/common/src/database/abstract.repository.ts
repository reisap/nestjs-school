import {
  BadRequestException,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
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
    try {
      return await this.entity.create(data);
    } catch (e) {
      throw new UnprocessableEntityException(e);
    }
  }
  public async createMany(data: DeepPartial<TEntity>[]): Promise<TEntity[]> {
    try {
      return await this.entity.create(data);
    } catch (e) {
      throw new UnprocessableEntityException(e);
    }
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

    try {
      return await this.entity.find(options);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
  public async findOneById(id: any): Promise<TEntity> {
    try {
      const options: FindOptionsWhere<TEntity> = {
        id: id,
      };
      const result = await this.entity.findOneBy(options);
      if (!result || typeof result === undefined || typeof result === null) {
        throw new NotFoundException('id not found');
      }

      return result;
    } catch (e) {
      throw new NotFoundException(e);
    }
  }
  public async findOne(options: FindOneOptions<TEntity>): Promise<TEntity> {
    try {
      return this.entity.findOne(options);
    } catch (e) {
      throw new NotFoundException(e);
    }
  }
  public async findByCondition(
    filterCondition: FindOneOptions<TEntity>,
  ): Promise<TEntity> {
    try {
      return await this.entity.findOne(filterCondition);
    } catch (e) {
      throw new NotFoundException(e);
    }
  }
  public async findWithRelations(
    relations: FindManyOptions<TEntity>,
  ): Promise<TEntity[]> {
    try {
      return await this.entity.find(relations);
    } catch (e) {
      throw new NotFoundException(e);
    }
  }
  //end find

  //delete
  public async remove(data: TEntity): Promise<TEntity> {
    try {
      return await this.entity.remove(data);
    } catch (e) {
      throw new NotFoundException(e);
    }
  }
  public async delete(id: number): Promise<DeleteResult> {
    try {
      const result = await this.entity.delete(id);
      if (!result || typeof result === undefined || typeof result === null) {
        throw new NotFoundException('id not found');
      }
      return result;
    } catch (e) {
      throw new NotFoundException(e);
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
      if (!tbl || typeof tbl === undefined || typeof tbl === null) {
        throw new NotFoundException('id not found');
      }

      await this.entity.update(id, data);
      const result = await this.entity.save(data);

      return result;
    } catch (e) {
      throw new UnprocessableEntityException(e);
    }
  }
  public async save(data: DeepPartial<TEntity>): Promise<TEntity> {
    try {
      const result = await this.entity.save(data);
      return result;
    } catch (e) {
      throw new UnprocessableEntityException(e);
    }
  }

  public async saveMany(data: DeepPartial<TEntity>[]): Promise<TEntity[]> {
    try {
      const result = await this.entity.save(data);
      return result;
    } catch (e) {
      throw new UnprocessableEntityException(e);
    }
  }
  //end update
}
