import {
  IComment,
  ICommentList,
  IPost,
  IPostDetails,
  IPostList,
  IReply,
  ITopic,
  ITopicList
} from '@/types/api.types';
import { ApiFuncArgs } from '@/types/common.types';
import { objectToQueryParams } from '@/utils';

import Axios from './apiUtils/AxiosConfig';
import { getAuthConfig } from './apiUtils/auth';
import {
  POSTS_URL,
  POST_COMMENTS_URL,
  POST_COMMENT_REPLIES_URL,
  POST_DETAILS_URL,
  TOPICS_URL
} from './endpoints';

export async function createPost({ payload }: any) {
  const config = await getAuthConfig();
  try {
    const res = await Axios.post(POSTS_URL, payload, config);
    return res.data as IPost;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function fetchPosts({ params, SSContext }: ApiFuncArgs) {
  const config = await getAuthConfig(SSContext);
  try {
    let url = POSTS_URL;
    if (params) {
      url = `${url}?${objectToQueryParams(params)}`;
    }
    const res = await Axios.get(url, config);
    return res.data as IPostList;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function fetchPostsDetails({ post_slug, SSContext }: ApiFuncArgs) {
  const config = await getAuthConfig(SSContext);
  try {
    const res = await Axios.get(POST_DETAILS_URL(post_slug), config);
    return res.data as IPostDetails;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function updatePost({ payload, post_slug }: any) {
  const config = await getAuthConfig();
  try {
    const res = await Axios.patch(POST_DETAILS_URL(post_slug), payload, config);
    return res.data as any;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function deletePost({ post_slug }: any) {
  const config = await getAuthConfig();
  try {
    const res = await Axios.delete(POST_DETAILS_URL(post_slug), config);
    return res.data as any;
  } catch (error: any) {
    return Promise.reject(error);
  }
}
export async function fetchTopics({ params, SSContext }: ApiFuncArgs) {
  const config = await getAuthConfig(SSContext);
  try {
    let url = TOPICS_URL;
    if (params) {
      url = `${url}?${objectToQueryParams(params)}`;
    }
    const res = await Axios.get(url, config);
    return res.data as ITopicList;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function createTopic({ payload }: ApiFuncArgs) {
  const config = await getAuthConfig();
  try {
    const res = await Axios.post(TOPICS_URL, payload, config);
    return res.data as ITopic;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function fetchComments({ post_slug, params, SSContext }: ApiFuncArgs) {
  const config = await getAuthConfig(SSContext);
  try {
    let url = POST_COMMENTS_URL(post_slug);
    if (params) {
      url = `${url}?${objectToQueryParams(params)}`;
    }
    const res = await Axios.get(url, config);
    return res.data as ICommentList;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function createComment({ payload, post_slug }: { payload: any; post_slug: string }) {
  const config = await getAuthConfig();
  try {
    const res = await Axios.post(POST_COMMENTS_URL(post_slug), payload, config);
    return res.data as IComment;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function createCommentReply({
  payload,
  post_slug,
  commentId
}: {
  payload: any;
  post_slug: string;
  commentId: string;
}) {
  const config = await getAuthConfig();
  try {
    const res = await Axios.post(POST_COMMENT_REPLIES_URL(post_slug, commentId), payload, config);
    return res.data as IReply;
  } catch (error: any) {
    return Promise.reject(error);
  }
}
