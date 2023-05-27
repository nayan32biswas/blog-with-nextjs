import axios from 'axios';

import { ObjectType } from '@/types/common.types';
import { AsyncLock } from '@/utils/asyncLock';

import { UPDATE_ACCESS_TOKEN_URL } from '../endpoints';
import { getCookie, removeCookie, setCookie } from './cookie';

const ACCESS_TOKEN: string = 'A_T';
const ACCESS_TOKEN_EXP: string = 'A_E';
const REFRESH_TOKEN: string = 'R_T';
// const REFRESH_TOKEN_EXP = 'REFRESH_TOKEN_EXP',

const fiveMinutes = 1 * 60;

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
function setAccessToken(accessToken: string, request: any = null) {
  let tokenPayload = parseJwt(accessToken);
  setCookie(ACCESS_TOKEN, accessToken, request);
  setCookie(ACCESS_TOKEN_EXP, tokenPayload.exp, request);
  return true;
}
function setRefreshToken(refreshToken: string, request: any = null) {
  setCookie(REFRESH_TOKEN, refreshToken, request);
  return true;
}
export function setToken(access: string, refresh: string) {
  setAccessToken(access);
  setRefreshToken(refresh);
  return true;
}
export function clearToken(request: any = null) {
  removeCookie(ACCESS_TOKEN, request);
  removeCookie(ACCESS_TOKEN_EXP, request);
  removeCookie(REFRESH_TOKEN, request);
  return true;
}
function getTimestampSec() {
  return Math.floor(Date.now() / 1000);
}

const customLock = new AsyncLock();
export async function getValidToken(request: any = null) {
  await customLock.promise;
  customLock.enable();

  try {
    let accessToken = getCookie(ACCESS_TOKEN, request);
    if (accessToken === null) return null;
    let accessTokenExp = getCookie(ACCESS_TOKEN_EXP, request);
    // access token expire
    if (accessTokenExp === null) return null;

    let expTimestamp = parseInt(accessTokenExp);
    if (expTimestamp > getTimestampSec() + fiveMinutes) {
      return accessToken;
    } else {
      let refreshToken = getCookie(REFRESH_TOKEN, request);
      if (refreshToken === null) return null;

      let response = await axios.post(UPDATE_ACCESS_TOKEN_URL, {
        refresh_token: refreshToken
      });
      if (response.status === 200) {
        let accessToken = response.data?.access_token;
        setAccessToken(accessToken);
        return accessToken;
      } else {
        // display error message or redirect to other page.
        clearToken();
      }
    }
  } finally {
    customLock.disable();
  }
  return null;
}
