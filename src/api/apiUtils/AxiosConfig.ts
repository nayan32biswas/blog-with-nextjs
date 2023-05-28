import axios, { AxiosError, AxiosResponse } from 'axios';

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

export function handleAxiosError(error: AxiosError) {
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
      console.log(error);
      switch (status) {
        case 400:
          errorField = 'username';
          message = data?.detail || 'Something Wrong';
          break;
        case 401:
          message = data?.detail || 'Login required';
          redirectUrl = '/auth/sign-in';
          break;
        case 403:
          message = data?.detail || "You don't have permission to access this resource";
          break;
        case 404:
          message = 'Object not found';
          break;
        case 422:
          message = 'Developer Error. Please contact with us.';
          break;
        default:
          alert(message);
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
