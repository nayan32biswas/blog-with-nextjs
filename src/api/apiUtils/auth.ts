import axios from 'axios';

import { ObjectType } from '@/types/common.types';
import { isServer } from '@/utils/utils';

import { UPDATE_ACCESS_TOKEN_URL } from '../endpoints';
import { getCookie, removeCookie, setCookie } from './cookie';

const ACCESS_TOKEN: string = 'A_T';
const ACCESS_TOKEN_EXP: string = 'A_E';
const REFRESH_TOKEN: string = 'R_T';

const tokeSafeMarginMinutes = 1 * 60;

function parseJwt(token: string): ObjectType {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
  return JSON.parse(jsonPayload);
}

function base64Decode(data: any) {
  const buff = Buffer.from(data, 'base64');
  return buff.toString('utf-8');
}

// function decodeJWT(token: string) {
//   const [header, payload, signature] = token.split('.');
//   const decodedHeader = base64Decode(header);
//   const decodedPayload = base64Decode(payload);
//   const decodedToken = {
//     header: JSON.parse(decodedHeader),
//     payload: JSON.parse(decodedPayload),
//     signature
//   };
//   return decodedToken;
// }

function decodeJWT(token: string) {
  const dataList = token.split('.');
  const decodedPayload = base64Decode(dataList[1]);
  return JSON.parse(decodedPayload);
}

function setAccessToken(accessToken: string, SSContext: any = null) {
  let tokenPayload: any = null;
  if (isServer()) {
    tokenPayload = decodeJWT(accessToken);
  } else {
    tokenPayload = parseJwt(accessToken);
  }
  setCookie(ACCESS_TOKEN, accessToken, SSContext);
  setCookie(ACCESS_TOKEN_EXP, tokenPayload.exp, SSContext);
  return true;
}
function setRefreshToken(refreshToken: string, SSContext: any = null) {
  setCookie(REFRESH_TOKEN, refreshToken, SSContext);
  return true;
}
export function setToken(access: string, refresh: string, SSContext: any = null) {
  setAccessToken(access, SSContext);
  setRefreshToken(refresh, SSContext);
  return true;
}
export function clearToken(SSContext: any = null) {
  removeCookie(ACCESS_TOKEN, SSContext);
  removeCookie(ACCESS_TOKEN_EXP, SSContext);
  removeCookie(REFRESH_TOKEN, SSContext);
  return true;
}
function getTimestampSec() {
  return Math.floor(Date.now() / 1000);
}

async function updateAccessToken(refreshToken: string) {
  let response = await axios.post(UPDATE_ACCESS_TOKEN_URL, {
    refresh_token: refreshToken
  });

  if (response.status === 200) {
    let accessToken = response.data?.access_token;
    return accessToken;
  } else {
    return null;
  }
}

async function getNewAccessToken(SSContext: any = null) {
  let refreshToken = getCookie(REFRESH_TOKEN, SSContext);
  if (!refreshToken) return null;

  try {
    let token = null;
    if (isServer()) {
      token = await updateAccessToken(refreshToken);
    } else {
      token = await navigator.locks.request('token', async () => {
        return await updateAccessToken(refreshToken);
      });
    }

    if (!token) return null;

    setAccessToken(token, SSContext);

    return token;
  } catch (ex) {
    return null;
  }
}

export async function getValidToken(SSContext: any = null) {
  try {
    let accessToken = getCookie(ACCESS_TOKEN, SSContext);
    if (!accessToken) return null;
    let accessTokenExp = getCookie(ACCESS_TOKEN_EXP, SSContext);
    // access token expire
    if (!accessTokenExp) return null;
    let expTimestamp = parseInt(accessTokenExp);
    if (expTimestamp > getTimestampSec() + tokeSafeMarginMinutes) {
      return accessToken;
    } else {
      let token = await getNewAccessToken(SSContext);
      return token;
    }
  } catch {
    return null;
  }
}

export function isAuthenticated(request: any = null): boolean {
  let refreshToken = getCookie(REFRESH_TOKEN, request);
  if (refreshToken) {
    return true;
  } else {
    return false;
  }
}

export async function getAuthConfig(SSContext: any = null) {
  const token = await getValidToken(SSContext);

  let config = {};

  if (token) {
    config = { headers: { Authorization: `Bearer ${token}` } };
  }
  return config;
}
