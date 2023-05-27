import axios from 'axios';

import { getValidToken } from './auth';

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['timeout'] = 30 * 1000;

const handleResponseError = (error: any) => {
  if (error?.response?.status >= 400 && error?.response?.status < 500) {
    return error.response;
  } else if (error?.response?.status >= 500) {
    return error;
  }
};

const baseApi = async (config: any) => {
  const callBack = axios(config);
  return callBack
    .then(() => {
      return callBack;
    })
    .catch(async (error) => {
      return handleResponseError(error);
    });
};

const authApi = async (config: any, request: any = null) => {
  const token = getValidToken(request);
  if (!token) {
    delete config.headers['Authorization'];
  } else {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  const callBack = axios(config);
  return callBack
    .then(() => {
      return callBack;
    })
    .catch(async (error) => {
      return handleResponseError(error);
    });
};

export { authApi, baseApi };
