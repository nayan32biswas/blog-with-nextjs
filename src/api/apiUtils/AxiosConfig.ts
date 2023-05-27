import axios, { AxiosRequestConfig } from 'axios';

import { getValidToken } from './auth';

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['timeout'] = 30 * 1000;

const handleResponseError = (error: any) => {
  if (error?.response?.status >= 400 && error?.response?.status < 500) {
    return error.response;
  } else if (error?.response?.status >= 500) {
    return 'Server down please try later';
  }
};

// class BaseAxios {
//   static request(config: AxiosRequestConfig) {
//     const callBack = axios(config);
//     return callBack
//       .then(() => {
//         return callBack;
//       })
//       .catch(async (error) => {
//         return handleResponseError(error);
//       });
//   }
//   static get(url: string, params: any = {}) {
//     return this.request({ method: 'post', url: url, params: params });
//   }
//   static post(url: string, data: any = {}) {
//     return this.request({ method: 'post', url: url, data: data });
//   }
//   static put(url: string, data: any = {}) {
//     return this.request({ method: 'put', url: url, data: data });
//   }
//   static patch(url: string, data: any = {}) {
//     return this.request({ method: 'patch', url: url, data: data });
//   }
//   static delete(url: string, params: any = {}) {
//     return this.request({ method: 'delete', url: url, params: params });
//   }
// }

class Axios {
  // pass request obj on Server Side api call.
  static request(config: AxiosRequestConfig, authRequired: boolean = false, request: any = null) {
    const token = getValidToken(request);
    if (!config.headers) {
      config.headers = {};
    }
    if (!token) {
      if (authRequired === true) {
        return 'Authentication required';
      }
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
  }
  static get(url: string, params: any = {}, authRequired: boolean = false, request: any = null) {
    return this.request({ method: 'post', url: url, params: params }, authRequired, request);
  }
  static post(url: string, data: any = {}, authRequired: boolean = false, request: any = null) {
    return this.request({ method: 'post', url: url, data: data }, authRequired, request);
  }
  static put(url: string, data: any = {}, authRequired: boolean = false, request: any = null) {
    return this.request({ method: 'put', url: url, data: data }, authRequired, request);
  }
  static patch(url: string, data: any = {}, authRequired: boolean = false, request: any = null) {
    return this.request({ method: 'patch', url: url, data: data }, authRequired, request);
  }
  static delete(url: string, params: any = {}, authRequired: boolean = false, request: any = null) {
    return this.request({ method: 'delete', url: url, params: params }, authRequired, request);
  }
}
export { Axios };
