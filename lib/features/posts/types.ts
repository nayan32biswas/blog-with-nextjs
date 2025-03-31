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
  topics: string[];
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

// Redux state type

interface PostsApiData extends IPostsApiResponse {
  apiState: string | null;
  error: string | null;
}

interface PostDetailsApiData {
  data: IPostDetails | null;
  apiState: string | null;
  error: string | null;
}

interface TopicsApiData extends ITopicsApiResponse {
  apiState: string | null;
  error: string | null;
}

export interface PostState {
  postsApiData: PostsApiData;
  postsDetailsApiData: PostDetailsApiData;
  topicsApiData: TopicsApiData;
}
