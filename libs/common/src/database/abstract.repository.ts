import {
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
  FindOptionsOrder,
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
  findAll(
    options?: FindManyOptions<TEntity>,
    sortField?: keyof TEntity,
    order?: 'ASC' | 'DESC',
  ): Promise<TEntity[]>;
  remove(data: TEntity): Promise<TEntity>;
  findWithRelations(relations: FindManyOptions<TEntity>): Promise<TEntity[]>;
  preload(entityLike: DeepPartial<TEntity>): Promise<TEntity>;
  findOne(options: FindOneOptions<TEntity>): Promise<TEntity>;
  delete(id: number): Promise<DeleteResult>;
  update(id: any, data: DeepPartial<TEntity>): Promise<TEntity>;
  findOneParams(object: object): Promise<TEntity>;
}

export abstract class AbstractRepository<TEntity extends AbstractModel>
  implements BaseInterfaceRepository<TEntity>
{
  protected abstract readonly logger: Logger;

  constructor(protected readonly entity: Repository<TEntity>) {}

  public async preload(entityLike: DeepPartial<TEntity>): Promise<TEntity> {
    try {
      return await this.entity.preload(entityLike);
    } catch (e) {
      this.handleException('preload', e);
    }
  }

  public async create(data: DeepPartial<TEntity>): Promise<TEntity> {
    try {
      return this.entity.create(data);
    } catch (e) {
      this.handleException('create', e);
    }
  }

  public async createMany(data: DeepPartial<TEntity>[]): Promise<TEntity[]> {
    try {
      return this.entity.create(data);
    } catch (e) {
      this.handleException('createMany', e);
    }
  }

  public async save(data: DeepPartial<TEntity>): Promise<TEntity> {
    try {
      return await this.entity.save(data);
    } catch (e) {
      this.handleException('save', e);
    }
  }

  public async saveMany(data: DeepPartial<TEntity>[]): Promise<TEntity[]> {
    try {
      return await this.entity.save(data);
    } catch (e) {
      this.handleException('saveMany', e);
    }
  }

  public async findAll(
    options?: FindManyOptions<TEntity>,
    sortField: keyof TEntity = 'id',
    order: 'ASC' | 'DESC' = 'ASC',
  ): Promise<TEntity[]> {
    try {
      // Create a type-safe order object
      const orderOption: FindOptionsOrder<TEntity> = {
        [sortField]: order,
      } as FindOptionsOrder<TEntity>;

      const findOptions: FindManyOptions<TEntity> = {
        ...options,
        order: orderOption,
      };

      return await this.entity.find(findOptions);
    } catch (e) {
      this.handleException('findAll', e);
    }
  }

  public async findOneById(id: any): Promise<TEntity> {
    try {
      const result = await this.entity.findOneBy({
        id,
      } as FindOptionsWhere<TEntity>);
      if (!result) {
        throw new NotFoundException('ID not found');
      }
      return result;
    } catch (e) {
      this.handleException('findOneById', e);
    }
  }

  public async findOne(options: FindOneOptions<TEntity>): Promise<TEntity> {
    try {
      return await this.entity.findOne(options);
    } catch (e) {
      this.handleException('findOne', e);
    }
  }

  public async findOneParams(object: object): Promise<TEntity> {
    try {
      return await this.entity.findOne({ where: object });
    } catch (e) {
      this.handleException('findOneParams', e);
    }
  }

  public async findByCondition(
    filterCondition: FindOneOptions<TEntity>,
  ): Promise<TEntity> {
    try {
      return await this.entity.findOne(filterCondition);
    } catch (e) {
      this.handleException('findByCondition', e);
    }
  }

  public async findWithRelations(
    relations: FindManyOptions<TEntity>,
  ): Promise<TEntity[]> {
    try {
      return await this.entity.find(relations);
    } catch (e) {
      this.handleException('findWithRelations', e);
    }
  }

  public async remove(data: TEntity): Promise<TEntity> {
    try {
      return await this.entity.remove(data);
    } catch (e) {
      this.handleException('remove', e);
    }
  }

  public async delete(id: number): Promise<DeleteResult> {
    try {
      const result = await this.entity.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('ID not found');
      }
      return result;
    } catch (e) {
      this.handleException('delete', e);
    }
  }

  public async update(
    id: any,
    data: DeepPartial<TEntity> | any,
  ): Promise<TEntity | any> {
    try {
      const entity = await this.findOneById(id);
      if (!entity) {
        throw new NotFoundException('ID not found');
      }
      await this.entity.update(id, data);
      return this.entity.create(data);
    } catch (e) {
      this.handleException('update', e);
    }
  }

  private handleException(method: string, error: any): never {
    this.logger.error(`Error in ${method}`, error);
    if (error instanceof NotFoundException) {
      throw new NotFoundException(error.message);
    }
    throw new UnprocessableEntityException(error.message);
  }
}
