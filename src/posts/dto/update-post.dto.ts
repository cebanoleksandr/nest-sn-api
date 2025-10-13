import { Media } from "../models/post.model";

export class UpdatePostDto {
  content?: string;
  media?: Media[];
  hashtags?: string[];
  likeIds?: string[];
  saveIds?: string[];
};
