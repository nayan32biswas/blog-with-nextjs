import { TOKEN_FIELDS } from '@/lib/config';
import { NEXT_URL_KEY } from '@/lib/constants';
import { isServer } from '@/lib/utils';

export const checkIsAuthenticated = () => {
  const isAuthenticated = getCookieValue(TOKEN_FIELDS.IS_AUTHENTICATED_KEY);
  return !!isAuthenticated;
};

export const getCookieValue = (name: string) => {
  if (isServer()) return null;

  const cookies = document.cookie.split('; ');
  const cookie = cookies.find((c) => c.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
};

export const getRedirectUrlToAuth = (fullUrl: string) => {
  if (!fullUrl) return '/auth/signin';

  const url = new URL(fullUrl);
  const nextPathWithSearchQuery = url.pathname + url.search;
  const nextUrl = encodeURIComponent(nextPathWithSearchQuery);

  return `/auth/signin?${NEXT_URL_KEY}=${nextUrl}`;
};

export function performAfterAuthActions() {
  if (isServer()) {
    console.warn('Client-side only function called on server');
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const nextPageParam = urlParams.get(NEXT_URL_KEY);

  let nextPage = '/';
  if (nextPageParam) {
    nextPage = decodeURIComponent(nextPageParam);
  }

  window.location.href = nextPage;
}
