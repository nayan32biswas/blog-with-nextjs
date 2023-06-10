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

export interface ITokenApi {
  access_token: string;
  refresh_token: string;
}

export interface IBaseListApi {
  count: number;
  errorMessage?: string | null;
}

export interface IAuther extends IMinimalUser {}

export interface ITopic {
  slug: string;
  name: string;
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
