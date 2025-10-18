import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { removeDuplicatesByKey } from '@/lib/utils';

import { API_STATE } from '../common/constants';
import { PostApiService } from './postApi';
import { PostState } from './types';

const initialState: PostState = {
  postsApiData: {
    after: null,
    results: [],
    apiState: null,
    error: null,
  },
  userPostsApiData: {
    after: null,
    results: [],
    apiState: null,
    error: null,
    username: null,
  },
  postsDetailsApiData: {
    data: null,
    apiState: null,
    error: null,
  },
  topicsApiData: {
    after: null,
    results: [],
    apiState: null,
    error: null,
  },
};

export class PostAction {
  static getPosts: any = createAsyncThunk(
    'post/getPosts',
    async (params: any, { rejectWithValue }) => {
      const [data, errorObj] = await PostApiService.getPosts(params);
      return data ? data : rejectWithValue(errorObj);
    },
  );
  static getUserPosts: any = createAsyncThunk(
    'post/getUserPosts',
    async (params: any, { rejectWithValue }) => {
      const [data, errorObj] = await PostApiService.getPosts(params);
      return data ? data : rejectWithValue(errorObj);
    },
  );
  static getPostsDetails: any = createAsyncThunk(
    'post/getPostsDetails',
    async (params: any, { rejectWithValue }) => {
      const [data, errorObj] = await PostApiService.getPostsDetails(params);
      return data ? data : rejectWithValue(errorObj);
    },
  );
  static getTopics: any = createAsyncThunk(
    'post/getTopics',
    async (params: any, { rejectWithValue }) => {
      const [data, errorObj] = await PostApiService.getTopics(params);
      return data ? data : rejectWithValue(errorObj);
    },
  );
}

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    resetPostList: (state) => {
      state.postsApiData = {
        after: null,
        results: [],
        apiState: null,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Get Posts
      .addCase(PostAction.getPosts.pending, (state) => {
        state.postsApiData = {
          ...state.postsApiData,
          apiState: API_STATE.LOADING,
        };
      })
      .addCase(PostAction.getPosts.fulfilled, (state, action) => {
        state.postsApiData = {
          ...action.payload,
          apiState: API_STATE.SUCCEEDED,
          error: null,
        };
      })
      .addCase(PostAction.getPosts.rejected, (state, action) => {
        state.postsApiData = {
          ...state.postsApiData,
          apiState: API_STATE.FAILED,
          error: action.payload as string,
        };
      })
      // 🔹 Get User Posts
      .addCase(PostAction.getUserPosts.pending, (state, action) => {
        let existingPosts = state.userPostsApiData.results || [];
        const username = action.meta.arg.queryParams.username;

        // Reset the posts if the username is different
        if (!username || state.userPostsApiData.username !== username) {
          existingPosts = [];
        }

        state.userPostsApiData = {
          ...state.userPostsApiData,
          results: existingPosts,
          apiState: API_STATE.LOADING,
        };
      })
      .addCase(PostAction.getUserPosts.fulfilled, (state, action) => {
        const prevPosts = state.userPostsApiData.results || [];

        const username = action.meta.arg.queryParams.username;
        const { results, after } = action.payload;

        const updatedPosts = removeDuplicatesByKey([...prevPosts, ...results], 'slug');

        state.userPostsApiData = {
          after,
          username: username,
          results: updatedPosts,
          apiState: API_STATE.SUCCEEDED,
          error: null,
        };
      })
      .addCase(PostAction.getUserPosts.rejected, (state, action) => {
        state.userPostsApiData = {
          ...state.userPostsApiData,
          apiState: API_STATE.FAILED,
          error: action.payload as string,
        };
      })
      // 🔹 Get Post Details
      .addCase(PostAction.getPostsDetails.pending, (state) => {
        state.postsDetailsApiData = {
          data: null,
          apiState: API_STATE.LOADING,
          error: null,
        };
      })
      .addCase(PostAction.getPostsDetails.fulfilled, (state, action) => {
        state.postsDetailsApiData = {
          data: action.payload,
          apiState: API_STATE.SUCCEEDED,
          error: null,
        };
      })
      .addCase(PostAction.getPostsDetails.rejected, (state, action) => {
        state.postsDetailsApiData = {
          data: null,
          apiState: API_STATE.FAILED,
          error: action.payload as string,
        };
      })
      // 🔹 Get Topics
      .addCase(PostAction.getTopics.pending, (state) => {
        state.topicsApiData = {
          ...state.topicsApiData,
          apiState: API_STATE.LOADING,
        };
      })
      .addCase(PostAction.getTopics.fulfilled, (state, action) => {
        state.topicsApiData = {
          ...action.payload,
          apiState: API_STATE.SUCCEEDED,
          error: null,
        };
      })
      .addCase(PostAction.getTopics.rejected, (state, action) => {
        state.topicsApiData = {
          ...state.topicsApiData,
          apiState: API_STATE.FAILED,
          error: action.payload as string,
        };
      });
  },
});

export const { resetPostList } = postSlice.actions;

export default postSlice.reducer;
