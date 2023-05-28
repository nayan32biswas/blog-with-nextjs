import { IMinimalUser } from './api.types';

export interface ActionType {
  type: string;
  value: any;
}

export interface AuthType {
  isAuthenticated: boolean;
}

export interface UserContextType {
  auth: AuthType;
  me: null | IMinimalUser;
}
