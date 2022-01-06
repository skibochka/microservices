import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { INewPostInput } from '../interfaces/newPost.interface';
import { IUpdatePostInput } from '../interfaces/updatePost.interface';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly userRepository: Repository<Post>,
  ) {}

  async newPost(data: INewPostInput) {
    return this.userRepository.save(data);
  }

  async updatePost(data: IUpdatePostInput) {
    const post = await this.userRepository.findOne({ id: data.postId });

    if (post) {
      if (post.authorId === data.userId) {
        return this.userRepository.update(
          { id: data.postId },
          data.dataToUpdate,
        );
      }

      return new BadRequestException(
        "Permission denied. You can't update this post",
      );
    }

    return new BadRequestException(
      `Post with ID ${data.postId} does not exist`,
    );
  }
}
