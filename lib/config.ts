export const privateEnv = {};

export const publicEnv = {
  BASE_API_URL: process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:8000",
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  MEDIA_URL: process.env.NEXT_PUBLIC_MEDIA_URL,
};

export const DEFAULT_TIMEOUT = 1000 * 60 * 3; // 3 minutes

export const TOKEN_FIELDS = {
  ACCESS_TOKEN_KEY: "accessToken",
  REFRESH_TOKEN_KEY: "refreshToken",
  IS_AUTHENTICATED_KEY: "isAuthenticated",
};

export const PLACEHOLDER_IMAGE_PATH = "/assets/placeholder.svg";

export const MIN_ITEMS_LIMIT = 10;
export const DEFAULT_ITEMS_LIMIT = 20;
export const MAX_ITEMS_LIMIT = 100;
