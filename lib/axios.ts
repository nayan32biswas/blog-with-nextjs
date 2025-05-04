import axios, { AxiosInstance } from "axios";

import {
  getServerAccessToken,
  serverClearTokens,
  serverRefreshAccessToken,
} from "@/app/actions/auth";

import { DEFAULT_TIMEOUT, publicEnv, TOKEN_FIELDS } from "./config";
import { getCookieValue, isServer } from "./utils";

function getAxiosErrorMessage(
  error: any,
  defaultErrorMessage: string = "An unexpected error occurred",
) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return error.response.data?.detail || error.message;
    } else if (error.request) {
      return "No response received from the server";
    } else {
      return error.message;
    }
  } else {
    return defaultErrorMessage;
  }
}

const getAccessToken = async () => {
  if (isServer()) {
    return await getServerAccessToken();
  } else {
    return getCookieValue(TOKEN_FIELDS.ACCESS_TOKEN_KEY);
  }
};

const getAuthorizationString = (token: string) => `Bearer ${token}`;

let isRefreshing = false;
let refreshTokenPromise: any = null;
let refreshSubscribers: any = [];

const subscribeTokenRefresh = (callback: any) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (accessToken: string) => {
  refreshSubscribers.map((callback: any) => callback(accessToken));
};

const logoutUser = async () => {
  await serverClearTokens();
  if (isServer()) {
    // Add logic to handle server-side logout
  } else {
    window.location.href = "/logout";
  }
};

const getNewAccessToken = async () => {
  try {
    if (refreshTokenPromise) {
      return refreshTokenPromise;
    }

    refreshTokenPromise = (async () => {
      try {
        const { accessToken } = await serverRefreshAccessToken();

        if (!accessToken) {
          await logoutUser();
          throw new Error("No access token received");
        }

        return { accessToken };
      } finally {
        refreshTokenPromise = null;
      }
    })();

    return refreshTokenPromise;
  } catch {
    await logoutUser();
    throw "Unable to refresh the token";
  }
};

async function handleApiAuthError(api: AxiosInstance, originalRequest: any) {
  originalRequest._retry = true;

  // Step 1: Add subscriber for the original request
  const retryOriginalRequest = new Promise((resolve, reject) => {
    subscribeTokenRefresh((accessToken: string) => {
      try {
        // replace the expired accessToken and retry the original request
        originalRequest.headers["Authorization"] = getAuthorizationString(accessToken);
        resolve(api(originalRequest));
      } catch (error) {
        reject(error);
      }
    });
  });

  // Step 2: Initiate refresh only if not already refreshing
  if (!isRefreshing) {
    isRefreshing = true;
    try {
      const { accessToken } = await getNewAccessToken();
      onRefreshed(accessToken);
    } catch (err) {
      // Optionally notify subscribers of failure
      refreshSubscribers.forEach((callback: any) => callback(null));

      return Promise.reject(err);
    } finally {
      isRefreshing = false;
      refreshSubscribers = [];
    }
  }

  return retryOriginalRequest;
}

// Create Axios instance
const api = axios.create({
  baseURL: publicEnv.BASE_API_URL,
  timeout: DEFAULT_TIMEOUT,
});

// Request Interceptor: Attach access token
api.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();
    if (accessToken) {
      config.headers.Authorization = getAuthorizationString(accessToken);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor: Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      return handleApiAuthError(api, originalRequest);
    }

    return Promise.reject(error);
  },
);

export default api;

export { getAxiosErrorMessage };
