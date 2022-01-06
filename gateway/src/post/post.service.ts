import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { INewPostInput } from '../interfaces/post/createPost.interface';
import { IUpdatePostInput } from '../interfaces/post/updatePost.interface';
import { IDeletePostInput } from '../interfaces/post/deletePost.interface';
import { IGetPostsInput } from '../interfaces/post/getPosts.interface';

@Injectable()
export class PostService {
  constructor(
    @Inject(process.env.POST_SERVICE_NAME) private readonly client: ClientProxy,
  ) {}

  async newPost(data: INewPostInput) {
    return this.client.send('NEW_POST', data).toPromise();
  }

  async updatePost(data: IUpdatePostInput) {
    return this.client.send('UPDATE_POST', data).toPromise();
  }

  async deletePost(data: IDeletePostInput) {
    return this.client.send('DELETE_POST', data).toPromise();
  }

  async getPost(id: number) {
    return this.client.send('GET_POST', { id }).toPromise();
  }

  async getPosts(data: IGetPostsInput) {
    return this.client.send('GET_POSTS', data).toPromise();
  }
}
