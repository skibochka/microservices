import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PostService } from './post.service';
import { INewPostInput } from '../interfaces/newPost.interface';
import { IUpdatePostInput } from '../interfaces/updatePost.interface';
import { IDeletePostInput } from '../interfaces/deletePost.interface';
import { IGetPostsInput } from '../interfaces/getPosts.interface';

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

  @MessagePattern('DELETE_POST')
  async deletePost(data: IDeletePostInput) {
    return this.postService.deletePost(data);
  }

  @MessagePattern('GET_POST')
  async getPost(data: { id: number }) {
    return this.postService.getPost(data.id);
  }

  @MessagePattern('GET_POSTS')
  async getPosts(data: IGetPostsInput) {
    return this.postService.getPosts(data);
  }
}
