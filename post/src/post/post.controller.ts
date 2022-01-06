import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PostService } from './post.service';
import { INewPostInput } from '../interfaces/newPost.interface';
import { IUpdatePostInput } from '../interfaces/updatePost.interface';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @MessagePattern('NEW_POST')
  async newPost(data: INewPostInput) {
    return this.postService.newPost(data);
  }

  @MessagePattern('UPDATE_POST')
  async updatePost(data: IUpdatePostInput) {
    return this.postService.updatePost(data);
  }
}
