import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'db',
    //   port: 3306,
    //   username: 'root',
    //   password: 'root',
    //   database: 'socialmedia',
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
    // TypeOrmModule.forRootAsync({
    //   useFactory: () => {
    //     return {
    //       type: 'postgres',
    //       url: 'postgresql://emeke:password@localhost:5434/user',
    //       // autoLoadEntities: true,
    //       synchronize: true,
    //       host: 'localhost',
    //       entities: [User],
    //     };
    //   },
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          url: configService.get('MYSQL_URI'),
          synchronize: true,
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {
  static forFeature(entity: EntityClassOrSchema[]): DynamicModule {
    return TypeOrmModule.forFeature(entity);
  }
}
