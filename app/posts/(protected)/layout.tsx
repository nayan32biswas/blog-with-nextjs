import AuthGuard from '@/components/auth/AuthGuard';

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AuthGuard>{children}</AuthGuard>;
}
