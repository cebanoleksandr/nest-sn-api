import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { COMMENT_NOT_FOUND_ERROR } from './comments.constants';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.commentsService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    const comment = await this.commentsService.getCommentById(id);

    if (!comment) {
      throw new NotFoundException(COMMENT_NOT_FOUND_ERROR);
    }

    return comment;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateCommentDto) {
    return this.commentsService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCommentDto) {
    const comment = await this.commentsService.update(id, dto);

    if (!comment) {
      throw new NotFoundException(COMMENT_NOT_FOUND_ERROR);
    }

    return comment;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.commentsService.remove(id);

    if (!result) {
      throw new NotFoundException(COMMENT_NOT_FOUND_ERROR);
    }

    return result;
  }
}
