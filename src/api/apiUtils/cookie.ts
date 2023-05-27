import { ObjectType } from '@/types/common.types';
import { isServer } from '@/utils/utils';

function getCookieString(request: any): string {
  if (isServer()) {
    const cookie = request.headers?.cookie;
    if (!cookie) return '';
    return cookie;
  } else {
    return document.cookie;
  }
}
export function setCookie(key: string, value: string, request: any) {
  const str = `${key}=${value}; path=/`;

  if (isServer() && request?.headers?.cookie) {
    request.headers.cookie = str;
  } else {
    document.cookie = str;
  }
}

function getCookieObject(request: any): ObjectType {
  const Obj: ObjectType = {};
  getCookieString(request)
    .split(';')
    .forEach(function (cookie) {
      let [name, ...rest] = cookie.split('=');
      name = name.trim();
      if (!name) return;
      const value = rest.join('=').trim();
      if (!value) return;
      Obj[name] = decodeURIComponent(value);
    });
  return Obj;
}

export function getCookie(key: string, request: any): string {
  const cookies = getCookieObject(request);
  return cookies[key] || '';
}

export function removeCookie(key: string, request: any) {
  const cookies = getCookieObject(request);
  if (cookies[key]) {
    delete cookies[key];
  }

  for (const key of Object.keys(cookies)) {
    setCookie(key, '', request);
  }
}
