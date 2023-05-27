import { Axios } from './apiUtils/AxiosConfig';
import { setToken } from './apiUtils/auth';
import { REGISTRATION_URL, TOKEN_URL } from './endpoints';

export async function login(payload: any) {
  try {
    const res = await Axios.post(TOKEN_URL, payload);
    const data = res.data;
    const { access_token, refresh_token } = data;
    setToken(access_token, refresh_token);
    return data;
  } catch (error: any) {
    return error.response;
  }
}

export async function registration(payload: any) {
  try {
    const res = await Axios.post(REGISTRATION_URL, payload);
    return res.data;
  } catch (error: any) {
    return error.response;
  }
}
