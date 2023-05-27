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
function setCookieString(str: string, request: any) {
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

export function setCookie(key: string, value: unknown, request: any) {
  const cookies = getCookieObject(request);
  cookies[key] = value;

  let cookieStr = '';
  for (const [key, value] of Object.entries(cookies)) {
    cookieStr += `${key}=${value};`;
  }
  setCookieString(cookieStr, request);
}
export function removeCookie(key: string, request: any) {
  const cookies = getCookieObject(request);
  if (cookies[key]) {
    delete cookies[key];
  }

  let cookieStr = '';
  for (const [key, value] of Object.entries(cookies)) {
    cookieStr += `${key}=${value};`;
  }
  setCookieString(cookieStr, request);
}
