import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from './config/app.config.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    AuthModule,
    AppConfigModule,
    ConfigModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
