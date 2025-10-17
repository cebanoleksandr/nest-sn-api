import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MSchema } from "mongoose";
import { Conversation } from "src/conversation/models/conversation.model";
import { User } from "src/users/models/user.model";

export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true })
export class Message {
  @Prop()
  text: string;

  @Prop()
  audioUrl: string;

  @Prop()
  videoUrl: string;

  @Prop()
  photoUrl: string;

  @Prop({ type: MSchema.Types.ObjectId, ref: User.name, required: true })
  senderId: string;

  @Prop({ type: MSchema.Types.ObjectId, ref: Conversation.name, required: true })
  conversationId: string;

  @Prop()
  isRead: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
