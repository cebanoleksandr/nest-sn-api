import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './models/message.model';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  constructor(@InjectModel(Message.name) private readonly messageModel: Model<MessageDocument>) {}

  async getAll(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }

  async getMessageById(id: string): Promise<Message | null> {
    return this.messageModel.findById(id).exec();
  }

  async create(dto: CreateMessageDto): Promise<Message> {
    const message = new this.messageModel(dto);
    return message.save();
  }

  async update(id: string, dto: UpdateMessageDto): Promise<Message | null> {
    return this.messageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async remove(id: string): Promise<Message | null> {
    return this.messageModel.findByIdAndDelete(id).exec();
  }
}
