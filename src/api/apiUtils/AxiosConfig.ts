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
  (error: any) => {
    if (!error.response) {
      alert('Network error. Please check your internet.');
    } else if (error.response.status) {
      // Implement anything after each error response
      return Promise.reject(error);
    }
  }
);

export default api;
