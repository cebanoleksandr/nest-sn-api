import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './models/comment.model';
import { Model } from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private readonly commentModel: Model<CommentDocument>) {}

  async getAll(): Promise<Comment[]> {
    return this.commentModel.find().exec();
  }

  async getCommentById(id: string): Promise<Comment | null> {
    return this.commentModel.findById(id).exec();
  }

  async create(dto: Partial<Comment>): Promise<Comment> {
    const comment = new this.commentModel(dto);
    return comment.save();
  }

  async update(id: string, dto: Partial<Comment>): Promise<Comment | null> {
    return this.commentModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async remove(id: string): Promise<Comment | null> {
    return this.commentModel.findByIdAndDelete(id).exec();
  }
}
