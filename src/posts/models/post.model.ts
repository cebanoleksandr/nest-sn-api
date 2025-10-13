import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MSchema } from "mongoose";
import { User } from "src/users/models/user.model";

export class Media {
  @Prop({ required: true })
  type: 'image' | 'video' | 'audio';

  @Prop({ required: true })
  url: string;
}

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
  @Prop()
  content: string;

  @Prop({ type: MSchema.Types.ObjectId, ref: User.name })
  authorId: string;

  @Prop({ type: () => [Media], _id: false, required: true })
  media: Media[];

  @Prop({ required: true, type: () => [String] })
  hashtags: string[];

  @Prop({ required: true, type: () => [String] })
  likeIds: string[];

  @Prop({ required: true, type: () => [String] })
  saveIds: string[];
};

export const PostSchema = SchemaFactory.createForClass(Post);
