import { IMinimalUser, IUserDetails } from '@/types/api.types';
import { ITokenApi } from '@/types/api.types';

import Axios from './apiUtils/AxiosConfig';
import { getAuthConfig, setToken } from './apiUtils/auth';
import {
  CHANGE_PASSWORD,
  ME_URL,
  REGISTRATION_URL,
  TOKEN_URL,
  UPDATE_ME_URL,
  USER_DETAILS_URL
} from './endpoints';

export async function login(payload: any) {
  try {
    const res = await Axios.post(TOKEN_URL, payload);
    const { access_token, refresh_token } = res.data;
    setToken(access_token, refresh_token);
    return res.data as ITokenApi;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function registration(payload: any) {
  try {
    const res = await Axios.post(REGISTRATION_URL, payload);
    return res.data as IMinimalUser;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function changePassword({ payload }: any) {
  const config = await getAuthConfig();
  try {
    const res = await Axios.post(CHANGE_PASSWORD, payload, config);
    return res.data as IMinimalUser;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function getMe() {
  const config = await getAuthConfig();
  try {
    const res = await Axios.get(ME_URL, config);
    return res.data as IUserDetails;
  } catch (error: any) {
    return Promise.reject(error);
  }
}
export async function updateMe({ payload }: any) {
  const config = await getAuthConfig();
  try {
    const res = await Axios.patch(UPDATE_ME_URL, payload, config);
    return res.data as IUserDetails;
  } catch (error: any) {
    return Promise.reject(error);
  }
}
export async function getPublicUserProfile({ username }: { username: string }) {
  const config = await getAuthConfig();
  try {
    const res = await Axios.get(USER_DETAILS_URL(username), config);
    return res.data as IMinimalUser;
  } catch (error: any) {
    return Promise.reject(error);
  }
}
