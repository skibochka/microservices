import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { CreatePostInputDto } from '../dto/post/createPost.dto';
import { UpdatePostInputDto } from '../dto/post/updatePost.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async newPost(@Request() req, @Body() body: CreatePostInputDto) {
    return this.postService.newPost({ authorId: req.user.id, ...body });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update')
  async updatePost(@Request() req, @Body() body: UpdatePostInputDto) {
    return this.postService.updatePost({
      userId: req.user.id,
      postId: body.postId,
      dataToUpdate: { title: body.title, text: body.text },
    });
  }
}
