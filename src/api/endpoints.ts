export const HOST = process.env.API_URL;

export const API_ROOT = `${HOST}/api`;
export const V1_API_ROOT = `${API_ROOT}/v1`;

export const TOKEN_URL = `${V1_API_ROOT}/token`;
export const REGISTRATION_URL = `${V1_API_ROOT}/registration`;
export const UPDATE_ACCESS_TOKEN_URL = `${V1_API_ROOT}/update-access-token`;
export const ME_URL = `${V1_API_ROOT}/me`;
export const USER_DETAILS_URL = (username: string) => `${V1_API_ROOT}/users/${username}`;

export const POSTS_URL = `${V1_API_ROOT}/posts`;
export const POST_DETAILS_URL = (slug: string) => `${POSTS_URL}/${slug}`;

export const TOPICS_URL = `${V1_API_ROOT}/topics`;

export const POST_COMMENTS_URL = (slug: string) => `${POST_DETAILS_URL(slug)}/comments`;
export const POST_COMMENT_DETAILS_URL = (slug: string, id: string) =>
  `${POST_COMMENTS_URL(slug)}/${id}`;
