import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Conversation, ConversationDocument } from './models/conversation.model';
import { Model } from 'mongoose';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@Injectable()
export class ConversationService {
  constructor(@InjectModel(Conversation.name) private readonly conversationModel: Model<ConversationDocument>) {}

  async getAll(): Promise<Conversation[]> {
    return this.conversationModel.find().exec();
  }

  async getConversationById(id: string): Promise<Conversation | null> {
    return this.conversationModel.findById(id).exec();
  }

  async create(dto: CreateConversationDto): Promise<Conversation> {
    const conversation = new this.conversationModel(dto);
    return conversation.save();
  }

  async update(id: string, dto: UpdateConversationDto): Promise<Conversation | null> {
    return this.conversationModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async remove(id: string): Promise<Conversation | null> {
    return this.conversationModel.findByIdAndDelete(id).exec();
  }
}
