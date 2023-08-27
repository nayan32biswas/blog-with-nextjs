import { GetServerSidePropsContext } from 'next';

import { ObjectType } from '@/types/common.types';
import { isServer } from '@/utils';

function getCookieObject(SSContext: GetServerSidePropsContext | null): ObjectType {
  if (isServer()) {
    if (!SSContext) return {};
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
function getServerCookieStrings(SSContext: GetServerSidePropsContext | null) {
  const cookies = SSContext?.req?.cookies;
  if (cookies) {
    return Object.keys(cookies).map((key) => `${key}=${cookies[key]}; Path=/`);
  }
  return [];
}
export function setCookie(key: string, value: string, SSContext: GetServerSidePropsContext | null) {
  const str = `${key}=${value}; path=/`;
  if (isServer()) {
    if (!SSContext) return;
    try {
      SSContext.req.cookies[key] = value;
      SSContext.res.setHeader('Set-Cookie', getServerCookieStrings(SSContext));
    } catch (ex) {
      console.log('ex', ex);
    }
  } else {
    document.cookie = str;
  }
}

export function getCookie(key: string, SSContext: GetServerSidePropsContext | null): string {
  const cookies = getCookieObject(SSContext);
  return cookies[key] || '';
}

export function removeCookie(key: string, SSContext: GetServerSidePropsContext | null) {
  setCookie(key, '; Max-Age=-99999999', SSContext);
}
