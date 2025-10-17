import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { CONVERSATION_NOT_FOUND } from './conversation.constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll() {
    return this.conversationService.getAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getOne(@Param('id') id: string) {
    const conversation = await this.conversationService.getConversationById(id);

    if (!conversation) {
      throw new NotFoundException(CONVERSATION_NOT_FOUND);
    }

    return conversation;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createConversationDto: CreateConversationDto) {
    return this.conversationService.create(createConversationDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateConversationDto: UpdateConversationDto) {
    const updatedConversation = await this.conversationService.update(id, updateConversationDto);

    if (!updatedConversation) {
      throw new NotFoundException(CONVERSATION_NOT_FOUND);
    }

    return updatedConversation;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    const deleted = await this.conversationService.remove(id);

    if (!deleted) {
      throw new NotFoundException(CONVERSATION_NOT_FOUND);
    }

    return deleted;
  }
}
