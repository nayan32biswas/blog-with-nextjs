import { ICommentList, IPostDetails, IPostList, ITopicList } from '@/types/api.types';
import { ApiFuncArgs } from '@/types/common.types';
import { objectToQueryParams } from '@/utils';

import Axios from './apiUtils/AxiosConfig';
import { getAuthConfig } from './apiUtils/auth';
import { POSTS_URL, POST_COMMENTS_URL, POST_DETAILS_URL, TOPICS_URL } from './endpoints';

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
