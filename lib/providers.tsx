'use client';

import dynamic from 'next/dynamic';
import type React from 'react';
import { Provider } from 'react-redux';

import { store } from './store';

// Lazy load AuthProvider to avoid circular dependency
const AuthProvider = dynamic(
  () => import('@/contexts/AuthContext').then((mod) => mod.AuthProvider),
  {
    ssr: false,
  },
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
}
