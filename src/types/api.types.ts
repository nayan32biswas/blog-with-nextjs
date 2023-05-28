export interface IMinimalUser {
  username: string;
  full_name: string;
  image: string | null;
}

export interface ITokenApi {
  access_token: string;
  refresh_token: string;
}

export interface IBaseListApi {
  count: number;
}

export interface IAuther extends IMinimalUser {}

export interface ITopic {
  id: string;
  name: string;
}

export interface IPost {
  id: string;
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
