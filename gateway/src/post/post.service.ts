import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { INewPostInput } from '../interfaces/post/createPost.interface';
import { IUpdatePostInput } from '../interfaces/post/updatePost.interface';
import { catchError, of } from 'rxjs';

@Injectable()
export class PostService {
  constructor(
    @Inject(process.env.POST_SERVICE_NAME) private readonly client: ClientProxy,
  ) {}

  async newPost(data: INewPostInput) {
    return this.client.send('NEW_POST', data).toPromise();
  }

  async updatePost(data: IUpdatePostInput) {
    return this.client.send('UPDATE_POST', data).pipe(
      catchError((val) => {
        console.log(val);
        return of({ error: val.message });
      }),
    );
  }
}
