interface UserLink {
  type: string;
  link: string;
}

export interface IUserDetails {
  username: string;
  email: string | null;
  full_name: string;
  image: string | null;
  bio: string | null;
  is_active: boolean;
  location: string | null;
  user_links: UserLink[];
}

export interface IUserPublicProfile {
  username: string;
  full_name: string;
  image: string | null;
  bio: string | null;
  is_active: boolean;
  user_links: UserLink[];
  role?: string | null;
  location?: string | null;
  email?: string | null;
  website?: string | null;
  twitter?: string | null;
  github?: string | null;
}
