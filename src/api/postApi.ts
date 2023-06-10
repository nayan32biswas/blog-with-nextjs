import { IPostList, ITopicList } from '@/types/api.types';

import Axios from './apiUtils/AxiosConfig';
import { getAuthConfig } from './apiUtils/auth';
import { POSTS_URL, TOPICS_URL } from './endpoints';

export async function fetchPosts(SSContext: any = null) {
  const config = await getAuthConfig(SSContext);
  try {
    const res = await Axios.get(POSTS_URL, config);
    return res.data as IPostList;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function fetchTopics(SSContext: any = null) {
  const config = await getAuthConfig(SSContext);
  try {
    const res = await Axios.get(TOPICS_URL, config);
    return res.data as ITopicList;
  } catch (error: any) {
    return Promise.reject(error);
  }
}
