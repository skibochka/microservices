import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { INewPostInput } from '../interfaces/newPost.interface';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly userRepository: Repository<Post>,
  ) {}

  async newPost(data: INewPostInput) {
    return this.userRepository.save(data);
  }
}
