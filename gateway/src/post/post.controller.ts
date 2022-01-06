import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { CreatePostInputDto } from '../dto/post/createPost.dto';
import { UpdatePostInputDto } from '../dto/post/updatePost.dto';
import { postIdInputDto } from '../dto/post/deletePost.dto';
import { getPostsInputDto } from '../dto/post/getPosts.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async newPost(@Request() req, @Body() body: CreatePostInputDto) {
    return this.postService.newPost({ authorId: req.user.id, ...body });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update')
  async updatePost(@Request() req, @Body() body: UpdatePostInputDto) {
    return this.postService.updatePost({
      userId: req.user.id,
      postId: body.postId,
      dataToUpdate: { title: body.title, text: body.text },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  async deletePost(@Request() req, @Param() params: postIdInputDto) {
    return this.postService.deletePost({
      userId: req.user.id,
      postId: params.id,
    });
  }

  @Get('/all')
  async getPosts(@Query() params: getPostsInputDto) {
    return this.postService.getPosts(params);
  }

  @Get('/:id')
  async getPost(@Param() params: postIdInputDto) {
    return this.postService.getPost(params.id);
  }
}
