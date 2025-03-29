import { publicEnv } from "./config";

export const API_VERSION = "api/v1";

export const API_V1 = `${publicEnv.BASE_API_URL}/${API_VERSION}`;

export const API_URLS = {
  // Auth
  registration: `${API_V1}/registration`,
  login: `${API_V1}/token`,
  refreshToken: `${API_V1}/update-access-token`,

  // User URLs
  userInfo: `${API_V1}/me`,
  // Post URLs
  posts: `${API_V1}/posts`,
  postsDetails: `${API_V1}/posts/:slug`,
  topics: `${API_V1}/topics`,
};
