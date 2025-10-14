import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { POST_NOT_FOUND_ERROR } from './posts.constants';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.postsService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    const post = await this.postsService.getPostById(id);

    if (!post) {
      throw new NotFoundException(POST_NOT_FOUND_ERROR);
    }

    return post;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreatePostDto) {
    return this.postsService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const post = await this.postsService.update(id, dto);

    if (!post) {
      throw new NotFoundException(POST_NOT_FOUND_ERROR);
    }

    return post;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.postsService.remove(id);

    if (!result) {
      throw new NotFoundException(POST_NOT_FOUND_ERROR);
    }

    return result;
  }
}
