export interface ITopic {
  slug: string;
  name: string;
  count: number;
}

export interface IAuthor {
  name: string;
  avatar: string;
  initials: string;
}

export interface ICommentCommon {
  id: number;
  author: IAuthor;
  content: string;
  date: string;
}

export interface IComment extends ICommentCommon {
  replies: ICommentCommon[];
}

export interface IPost {
  slug: string;
  title: string;
  date: string;
  author: {
    name: string;
    avatar: string;
    initials: string;
  };
  category: string;
  readTime: string;
  image: string;
  short_description?: string;
  description?: string;
  topics?: string[];
  comments?: IComment[];
}
