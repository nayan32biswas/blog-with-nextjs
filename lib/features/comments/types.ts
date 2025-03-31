import { IMinimumUser } from "../common/types";

export interface IBaseComment {
  id: string;
  description: string;
  created_at: string;
  updated_at: string;
  user: IMinimumUser;
}

export interface IComment extends IBaseComment {
  replies: IComment[];
}

export interface ICommentsApiResponse {
  after: string | null;
  results: IComment[];
}

// Redux state types

interface CommentsApiData extends ICommentsApiResponse {
  apiState: string | null;
  error: string | null;
}

export interface CommentsState {
  postsCommentData: {
    [key: string]: CommentsApiData;
  };
}
