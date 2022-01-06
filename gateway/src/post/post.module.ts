import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { ClientsModule } from '@nestjs/microservices';
import { PostServiceClientOptions } from '../microservices/postSvc.options';

@Module({
  imports: [ClientsModule.register([PostServiceClientOptions])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
