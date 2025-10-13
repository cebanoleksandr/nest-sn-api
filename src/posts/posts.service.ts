import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './models/post.model';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private readonly postModel: Model<PostDocument>) {}

  async getAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async getPostById(id: string): Promise<Post | null> {
    return this.postModel.findById(id).exec();
  }

  async create(dto: CreatePostDto): Promise<Post> {
    const post = new this.postModel(dto);
    return post.save();
  }

  async update(id: string, dto: UpdatePostDto): Promise<Post | null> {
    return this.postModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async remove(id: string): Promise<Post | null> {
    return this.postModel.findByIdAndDelete(id).exec();
  }
}
