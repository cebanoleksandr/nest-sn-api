import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MSchema } from "mongoose";
import { User } from "src/users/models/user.model";

export type ConversationDocument = HydratedDocument<Conversation>;

@Schema({ timestamps: true })
export class Conversation {
  @Prop()
  title?: string;

  @Prop({ type: [MSchema.Types.ObjectId], ref: User.name, required: true })
  participantIds: string[];

  @Prop({ type: MSchema.Types.ObjectId, ref: Message.name })
  lastMessageId?: string;
};

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
