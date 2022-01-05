import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SvcConfigService } from './svc.config.service';
import svcConfig from './svc.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.production'],
      isGlobal: true,
      load: [svcConfig],
    }),
  ],
  providers: [SvcConfigService, ConfigService],
  exports: [SvcConfigService, ConfigService],
})
export class SvcConfigModule {}
