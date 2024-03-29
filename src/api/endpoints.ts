import { API_URL } from '@/utils/constKey';

export const HOST = API_URL;

export const API_ROOT = `${HOST}/api`;
export const V1_API_ROOT = `${API_ROOT}/v1`;

export const TOKEN_URL = `${V1_API_ROOT}/token`;
export const REGISTRATION_URL = `${V1_API_ROOT}/registration`;
export const UPDATE_ACCESS_TOKEN_URL = `${V1_API_ROOT}/update-access-token`;
export const CHANGE_PASSWORD = `${V1_API_ROOT}/change-password`;
export const ME_URL = `${V1_API_ROOT}/me`;
export const UPDATE_ME_URL = `${V1_API_ROOT}/update-me`;
export const USER_DETAILS_URL = (username: string) => `${V1_API_ROOT}/users/${username}`;

export const POSTS_URL = `${V1_API_ROOT}/posts`;
export const POST_DETAILS_URL = (slug: string) => `${POSTS_URL}/${slug}`;

export const TOPICS_URL = `${V1_API_ROOT}/topics`;

export const POST_COMMENTS_URL = (slug: string) => `${POST_DETAILS_URL(slug)}/comments`;
export const POST_COMMENT_DETAILS_URL = (slug: string, id: string) =>
  `${POST_COMMENTS_URL(slug)}/${id}`;
export const POST_COMMENT_REPLIES_URL = (slug: string, commentID: string) =>
  `${POST_COMMENT_DETAILS_URL(slug, commentID)}/replies`;
export const POST_COMMENT_REPLY_DETAILS_URL = (slug: string, commentID: string, replyId: string) =>
  `${POST_COMMENT_DETAILS_URL(slug, commentID)}/replies/${replyId}`;

export const UPLOAD_IMAGE_URL = `${V1_API_ROOT}/upload-image`;
