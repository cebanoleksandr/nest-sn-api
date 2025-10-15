export class CreateCommentDto {
  text: string;
  authorId: string;
  postId: string;
  likeIds: string[];
  parentCommentId?: string;
  repliesIds: string[];
}
