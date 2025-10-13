import { Media } from "../models/post.model";

export class CreatePostDto {
  content?: string;
  media?: Media[];
  hashtags?: string[];
  likeIds?: string[];
  saveIds?: string[];
};
