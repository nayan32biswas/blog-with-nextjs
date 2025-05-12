export type nullableString = string | null | undefined;

export interface IMinimumUser {
  username: string;
  full_name: string;
  image: string | null;
}
