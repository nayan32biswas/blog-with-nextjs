export interface ApiErrorObj {
  code: string;
  detail: string;
  field: string | null;
}

export interface ApiError {
  errors: ApiErrorObj[];
}

export interface IMinimalUser {
  username: string;
  full_name: string;
  image: string | null;
  is_active: boolean;
}

export interface IUserDetails {
  username: string;
  full_name: string;
  image: string | null;
  is_active: boolean;
}

export interface ITokenApi {
  access_token: string;
  refresh_token: string;
}

export interface IBaseListApi {
  after: string | null;
  errorMessage?: string | null;
}

export interface IAuther extends IMinimalUser {}

export interface ITopic {
  name: string;
  slug: string;
  description: string | null;
}

export interface IPostForm {
  title: string;
  short_description?: string;
  cover_image?: string;
  publish_at?: string;
  description: string;
  topics: [];
}

export interface IPost {
  slug: string;
  author: IAuther;
  title: string;
  short_description: null | string;
  cover_image: null | string;
  total_comment: number;
  total_reaction: number;
  publish_at: string;
}

export interface IPostList extends IBaseListApi {
  results: IPost[];
}

export interface IPostDetails extends IPost {
  description: null | string;
  topics: ITopic[];
}

export interface ITopicList extends IBaseListApi {
  results: ITopic[];
}

export interface IReply {
  id: string;
  user: IAuther | null;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface IComment {
  id: string;
  user: IAuther | null;
  description: string;
  created_at: string;
  updated_at: string;
  replies: IReply[];
}

export interface ICommentList extends IBaseListApi {
  results: IComment[];
}
