import {
  Body,
  Controller,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { CreatePostInputDto } from '../dto/post/createPost.dto';
import { UpdatePostInputDto } from '../dto/post/updatePost.dto';
import { DeletePostInputDto } from '../dto/post/deletePost.dto';

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

  @UseGuards(JwtAuthGuard)
  @Post('/delete/:id')
  async deletePost(@Request() req, @Param() params: DeletePostInputDto) {
    return this.postService.deletePost({
      userId: req.user.id,
      postId: params.id,
    });
  }
}
