import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MESSAGE_NOT_FOUND } from './message.constants';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { title } from 'process';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll() {
    return this.messageService.getAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getOne(@Param('id') id: string) {
    const message = await this.messageService.getMessageById(id);

    if (!message) {
      throw new NotFoundException(MESSAGE_NOT_FOUND);
    }

    return message;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createMessageDto: CreateMessageDto) {
    const body = { title: '', audioUrl: '', videoUrl: '', photoUrl: '' };
    return this.messageService.create({ ...body, ...createMessageDto });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    const updatedMessage = await this.messageService.update(id, updateMessageDto);

    if (!updatedMessage) {
      throw new NotFoundException(MESSAGE_NOT_FOUND);
    }

    return updatedMessage;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    const deleted = await this.messageService.remove(id);

    if (!deleted) {
      throw new NotFoundException(MESSAGE_NOT_FOUND);
    }

    return deleted;
  }
}
