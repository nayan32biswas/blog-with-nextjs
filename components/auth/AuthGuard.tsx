import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { serverCheckIsAuthenticated } from '@/app/actions/auth';
import { getRedirectUrlToAuth } from '@/lib/features/auth/utility';

export default async function AuthGuard({ children }: any) {
  const headersList = await headers();
  const fullUrl = headersList.get('x-full-url');

  const isAuthenticated = await serverCheckIsAuthenticated();

  if (!isAuthenticated) {
    // We will have two level of validation.
    // One in the middleware and another in the AuthGuard component.
    const redirectUrl = getRedirectUrlToAuth(fullUrl || '/');
    return redirect(redirectUrl);
  }

  return children;
}
