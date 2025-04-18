"use server";

import axios from "axios";
import { decode } from "jsonwebtoken";
import { cookies } from "next/headers";

import { TOKEN_FIELDS } from "@/lib/config";
import { API_URLS } from "@/lib/endpoints";

interface ILoginPayload {
  username: string;
  password: string;
}

const getExpiredTime = (token: string) => {
  const decoded: any = decode(token);
  const expireTimestamp = decoded?.exp;
  const expiryDate = new Date(expireTimestamp * 1000);
  return expiryDate;
};

const setIsAuthenticatedToCookie = (cookieStore: any, refreshToken: string) => {
  const expiryDate = getExpiredTime(refreshToken);

  const isAuthenticated = !!refreshToken;

  cookieStore.set(TOKEN_FIELDS.IS_AUTHENTICATED_KEY, isAuthenticated, {
    secure: true,
    sameSite: "strict",
    expires: expiryDate,
    httpOnly: false,
  });
};

const setTokenToCookie = (cookieStore: any, key: string, token: string, httpOnly = true) => {
  const expiryDate = getExpiredTime(token);

  cookieStore.set(key, token, {
    secure: true,
    sameSite: "strict",
    expires: expiryDate,
    httpOnly,
  });
};

async function serverLogin(formData: ILoginPayload) {
  let accessToken: string;
  let refreshToken: string;
  const errorMessage = null;

  const payload = {
    username: formData.username,
    password: formData.password,
  };

  try {
    const response = await axios.post(API_URLS.login, payload);
    accessToken = response.data.access_token;
    refreshToken = response.data.refresh_token;
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Something went wrong";
    return { success: false, errorMessage: errorMessage };
  }

  const cookieStore = await cookies();

  setTokenToCookie(cookieStore, TOKEN_FIELDS.REFRESH_TOKEN_KEY, refreshToken, true);
  setTokenToCookie(cookieStore, TOKEN_FIELDS.ACCESS_TOKEN_KEY, accessToken, false);
  setIsAuthenticatedToCookie(cookieStore, refreshToken);

  return { success: true, errorMessage };
}

async function serverRefreshAccessToken() {
  const cookieStore = await cookies();
  const existingRefreshToken = cookieStore.get(TOKEN_FIELDS.REFRESH_TOKEN_KEY)?.value;

  if (!existingRefreshToken) {
    return { success: false };
  }

  const payload = {
    refresh_token: existingRefreshToken,
  };

  try {
    const response = await axios.post(API_URLS.refreshToken, payload);
    const newAccessToken = response.data?.access_token;

    setTokenToCookie(cookieStore, TOKEN_FIELDS.ACCESS_TOKEN_KEY, newAccessToken, false);
    return { success: true, accessToken: newAccessToken };
  } catch {
    return { success: false, error: "Invalid refresh token" };
  }
}

async function getServerAccessToken() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(TOKEN_FIELDS.ACCESS_TOKEN_KEY)?.value;
  return accessToken;
}

async function serverClearTokens() {
  const cookieStore = await cookies();

  cookieStore.set(TOKEN_FIELDS.REFRESH_TOKEN_KEY, "", { maxAge: 0 });
  cookieStore.set(TOKEN_FIELDS.ACCESS_TOKEN_KEY, "", { maxAge: 0 });

  return { success: true };
}

export { getServerAccessToken, serverClearTokens, serverLogin, serverRefreshAccessToken };
