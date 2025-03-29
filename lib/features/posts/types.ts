import { IMinimumUser } from "../common/types";

export interface IPost {
  author: IMinimumUser;
  title: string;
  slug: string;
  short_description: string;
  cover_image: string | null;
  total_comment: number;
  total_reaction: number;
  publish_at: string;
}

export interface IPostsApiResponse {
  after: string | null;
  results: IPost[];
}

export interface IPostDetails extends IPost {
  description: string;
}

export interface ITopic {
  name: string;
  slug: string;
  post_count: number | null;
}

export interface ITopicsApiResponse {
  after: string | null;
  results: ITopic[];
}
