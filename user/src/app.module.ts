import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { User } from './entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SvcConfigModule } from './config/svc.config.module';

@Module({
  imports: [
    UserModule,
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
        username: configService.get('service.database.username'),
        password: configService.get('service.database.password'),
        database: configService.get('service.database.database'),
        entities: [User],
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
