import { GetServerSidePropsContext } from 'next';

import axios, { AxiosError, AxiosResponse } from 'axios';

import { clearToken } from './auth';

const api = axios.create({
  timeout: 20000
});

api.interceptors.request.use(
  (config) => {
    // Change required configuration before api call if needed
    // config.headers = {
    //   ...config.headers,
    //   Authorization: `Bearer ${getValidToken()}`,
    // };
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Implement anything after each success response
    return Promise.resolve(response);
  },
  (error: AxiosError) => {
    // Implement anything after each error response
    return Promise.reject(error);
  }
);

export function handleAxiosError(
  error: AxiosError,
  SSContext: GetServerSidePropsContext | null = null
) {
  let status = 0;
  let message = 'Something Wrong. try letter';
  let errorCode = 'UNKNOWN';
  let errorField = null;
  let redirectUrl = null;

  if (!error.response) {
    alert('Network error. Please check your internet.');
  } else {
    status = error.response.status;
    let data = error.response.data as any;

    if (status >= 400 && status < 500) {
      if (status === 401) {
        clearToken(SSContext);
        message = 'Authentication Error';
        redirectUrl = '/auth/sign-in';
      } else if (status === 422) {
        message = 'Developer Error. Please contact with us.';
      } else {
        if (data?.errors) {
          const errorObj = data?.errors[0];
          message = errorObj.detail;
          errorCode = errorObj.code;
          if (errorObj.field) {
            errorField = errorObj.field;
          }
        }
      }
    } else if (status >= 500) {
      message = 'Something wrong. try letter';
    }
  }
  return {
    status,
    errorCode,
    errorField,
    message,
    redirectUrl
  };
}

export default api;
