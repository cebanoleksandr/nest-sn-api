import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MSchema } from "mongoose";
import { Post } from "src/posts/models/post.model";
import { User } from "src/users/models/user.model";

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment {
  @Prop()
  text: string;

  @Prop({ type: MSchema.Types.ObjectId, ref: User.name })
  authorId: string;

  @Prop({ type: MSchema.Types.ObjectId, ref: Post.name })
  postId: string;

  @Prop({ type: MSchema.Types.ObjectId, ref: Comment.name })
  parentCommentId: string | null;

  @Prop({ required: true, type: () => [String] })
  likeIds: string[];

  @Prop({ required: true, type: () => [String] })
  repliesIds: string[];
};

export const CommentSchema = SchemaFactory.createForClass(Comment);
