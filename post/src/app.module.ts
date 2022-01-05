import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { SvcConfigModule } from './config/svc.config.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';

@Module({
  imports: [
    PostModule,
    SvcConfigModule,
    ConfigModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        name: configService.get('service.database.name'),
        host: configService.get('service.database.host'),
        port: configService.get('service.database.port'),
        password: configService.get('service.database.password'),
        username: configService.get('service.database.username'),
        database: configService.get('service.database.database'),
        entities: [Post],
        migrations: configService.get('service.database.migrations'),
        logging: configService.get('service.database.logging'),
        synchronize: configService.get('service.database.synchronize'),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
