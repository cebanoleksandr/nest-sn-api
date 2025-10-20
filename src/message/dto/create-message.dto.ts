export class CreateMessageDto {
  text?: string;
  audioUrl?: string;
  videoUrl?: string;
  photoUrl?: string;
  senderId: string;
  conversationId: string;
}
