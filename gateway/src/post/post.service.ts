import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ICreatePostInput } from '../interfaces/post/createPost.interface';

@Injectable()
export class PostService {
  constructor(
    @Inject(process.env.POST_SERVICE_NAME) private readonly client: ClientProxy,
  ) {}

  async newPost(data: ICreatePostInput) {
    return this.client.send('NEW_POST', data);
  }
}
