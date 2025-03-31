import axios, { AxiosInstance } from "axios";

import {
  getServerAccessToken,
  serverClearTokens,
  serverRefreshAccessToken,
} from "@/app/actions/auth";

import { DEFAULT_TIMEOUT, publicEnv, TOKEN_FIELDS } from "./config";
import { getCookieValue } from "./utils";

export const getAccessToken = () => {
  return getCookieValue(TOKEN_FIELDS.ACCESS_TOKEN_KEY);
};

export const hasValidToken = () => {
  const accessToken = getAccessToken();
  return !!accessToken;
};

const getAuthorizationString = (token: string) => `Bearer ${token}`;

let isRefreshing = false;
let refreshSubscribers: any = [];

const subscribeTokenRefresh = (callback: any) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (accessToken: string) => {
  refreshSubscribers.map((callback: any) => callback(accessToken));
};

const logoutUser = async () => {
  await serverClearTokens();
  window.location.href = "/logout";
};

const refreshAccessToken = async () => {
  try {
    const { accessToken } = await serverRefreshAccessToken();

    if (!accessToken) {
      await logoutUser();
    }

    return { accessToken };
  } catch {
    await logoutUser();
    throw "Unable to refresh the token";
  }
};

async function handleApiAuthError(api: AxiosInstance, originalRequest: any) {
  originalRequest._retry = true;

  if (!isRefreshing) {
    isRefreshing = true;

    try {
      const { accessToken } = await refreshAccessToken();
      onRefreshed(accessToken);

      refreshSubscribers = [];
    } catch (err) {
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }

  return new Promise((resolve) => {
    subscribeTokenRefresh((accessToken: string) => {
      // replace the expired accessToken and retry the original request
      originalRequest.headers["Authorization"] = getAuthorizationString(accessToken);
      resolve(api(originalRequest));
    });
  });
}

// Create Axios instance
const api = axios.create({
  baseURL: publicEnv.BASE_API_URL,
  timeout: DEFAULT_TIMEOUT,
});

// Request Interceptor: Attach access token
api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = getAuthorizationString(accessToken);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      return handleApiAuthError(api, originalRequest);
    }

    return Promise.reject(error);
  },
);

const serverApi = axios.create({
  baseURL: publicEnv.BASE_API_URL,
  timeout: DEFAULT_TIMEOUT,
});

// Server Request Interceptor: Attach server access token for SSR
serverApi.interceptors.request.use(
  async (config) => {
    const accessToken = await getServerAccessToken();
    if (accessToken) {
      config.headers.Authorization = getAuthorizationString(accessToken);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

serverApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      return handleApiAuthError(serverApi, originalRequest);
    }

    return Promise.reject(error);
  },
);

export { serverApi };
export default api;
