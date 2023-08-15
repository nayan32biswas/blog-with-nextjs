export interface IPostForm {
  title: string | null;
  short_description: string | null;
  cover_image: string | null;
  description: string | null;
  publish_now: boolean;
  topics: string[];
}

export interface IUserProfileForm {
  full_name: string | null;
  image: string | null;
}
