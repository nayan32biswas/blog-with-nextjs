export interface IAuthUser {
  id: string;
  email: string;
  full_name?: string;
  [key: string]: any;
}
