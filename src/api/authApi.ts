import Axios from './apiUtils/AxiosConfig';
import { getAuthConfig, setToken } from './apiUtils/auth';
import { ME_URL, REGISTRATION_URL, TOKEN_URL } from './endpoints';

export async function login(payload: any) {
  try {
    const res = await Axios.post(TOKEN_URL, payload);
    const { access_token, refresh_token } = res.data;
    setToken(access_token, refresh_token);
    return res.data;
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

export async function getMe() {
  const { config } = await getAuthConfig();
  try {
    const res = await Axios.get(ME_URL, config);
    return res.data;
  } catch (error: any) {
    return error.response;
  }
}
