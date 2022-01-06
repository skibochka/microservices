import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { CreatePostInputDto } from '../dto/post/createPost.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async newPost(@Request() req, @Body() body: CreatePostInputDto) {
    return this.postService.newPost({ authorId: req.user.id, ...body });
  }
}
