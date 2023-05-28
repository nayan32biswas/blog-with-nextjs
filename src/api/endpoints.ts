export const HOST = process.env.API_URL;

export const API_ROOT = `${HOST}/api`;
export const V1_API_ROOT = `${API_ROOT}/v1`;

export const TOKEN_URL = `${V1_API_ROOT}/token`;
export const REGISTRATION_URL = `${V1_API_ROOT}/registration`;
export const UPDATE_ACCESS_TOKEN_URL = `${V1_API_ROOT}/update-access-token`;
export const ME_URL = `${V1_API_ROOT}/me`;

export const POSTS_URL = `${V1_API_ROOT}/posts`;
