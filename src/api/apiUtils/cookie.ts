import { ObjectType } from '@/types/common.types';
import { isServer } from '@/utils/utils';

function getCookieObject(SSContext: any): ObjectType {
  if (isServer()) {
    const cookie = SSContext.req?.cookies;
    if (!cookie) return {};
    return cookie;
  } else {
    const Obj: ObjectType = {};
    document.cookie.split(';').forEach(function (cookie) {
      let [name, ...rest] = cookie.split('=');
      name = name.trim();
      if (!name) return;
      const value = rest.join('=').trim();
      if (!value) return;
      Obj[name] = decodeURIComponent(value);
    });
    return Obj;
  }
}
export function setCookie(key: string, value: string, SSContext: any) {
  const str = `${key}=${value}; path=/`;
  if (isServer()) {
    try {
      SSContext.req.cookies[key] = value;
    } catch (ex) {
      console.log('ex', ex);
    }
    SSContext.res.setHeader('Set-Cookie', str);
  } else {
    document.cookie = str;
  }
}

export function getCookie(key: string, SSContext: any): string {
  const cookies = getCookieObject(SSContext);
  return cookies[key] || '';
}

export function removeCookie(key: string, SSContext: any) {
  setCookie(key, '; Max-Age=-99999999;', SSContext);
}
