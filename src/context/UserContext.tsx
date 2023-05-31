import { Dispatch, createContext, useReducer } from 'react';

import { IMinimalUser } from '@/types/api.types';
import { ComponentChildrenProps } from '@/types/common.types';
import { AuthType, UserContextType } from '@/types/context.types';

const initialState: UserContextType = {
  auth: {
    isAuthenticated: false
  },
  me: null
};
type UserAction =
  | { type: 'SET_USER'; payload: IMinimalUser }
  | { type: 'SET_AUTH'; payload: AuthType };

// Define the reducer function for your user context
const userReducer = (state: UserContextType, action: UserAction): UserContextType => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        me: {
          ...action.payload
        }
      };
    case 'SET_AUTH':
      return {
        ...state,
        auth: {
          ...action.payload
        }
      };
    default:
      return state;
  }
};

// Define your user context
export const UserContext = createContext<{
  userState: UserContextType;
  userDispatch: Dispatch<UserAction>;
}>({
  userState: initialState,
  userDispatch: () => null
});

// Define your user provider
export const UserProvider = ({ children }: ComponentChildrenProps) => {
  const [userState, userDispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{ userState, userDispatch }}>{children}</UserContext.Provider>
  );
};
