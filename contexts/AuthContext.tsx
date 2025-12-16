'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';

import { serverClearTokens } from '@/app/actions/auth';
import { AuthApiService } from '@/lib/features/auth/authApi';
import { IAuthUser } from '@/lib/features/auth/types';
import { checkIsAuthenticated } from '@/lib/features/auth/utility';
import { noop } from '@/lib/utils';

interface AuthContextType {
  authUser: IAuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: (nextUrl?: string) => void;
}

const initialAuthContext: AuthContextType = {
  authUser: null,
  isAuthenticated: false,
  isLoading: false,
  logout: noop,
};

const AuthContext = React.createContext<AuthContextType>(initialAuthContext);

async function loadUser(setIsLoading: any, setAuthUser: any) {
  setIsLoading(true);
  try {
    const [userData, errorObj] = await AuthApiService.getCurrentUser();
    if (userData) {
      setAuthUser(userData);
    } else {
      alert(errorObj.detail);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const isAuthenticated = checkIsAuthenticated();

  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);
  const [authUser, setAuthUser] = React.useState<IAuthUser | null>(null);

  React.useEffect(() => {
    if (!authUser && isAuthenticated) {
      loadUser(setIsLoading, setAuthUser);
    }
  }, [authUser, isAuthenticated]);

  const logout = async (nextUrl = '/auth/signin') => {
    await serverClearTokens();
    router.push(nextUrl);
  };

  return (
    <AuthContext.Provider value={{ authUser, logout, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
