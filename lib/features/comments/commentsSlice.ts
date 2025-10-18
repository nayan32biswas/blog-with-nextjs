import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { removeDuplicatesByKey } from '@/lib/utils';

import { API_STATE } from '../common/constants';
import { CommentApiService } from './commentApi';
import { CommentsState } from './types';

const initialState: CommentsState = {
  postsCommentData: {},
};

export class CommentAction {
  static getComments: any = createAsyncThunk(
    'comments/getComments',
    async (params: any, { rejectWithValue }) => {
      const slug = params.slug;
      const [data, errorObj] = await CommentApiService.getComments(params);
      if (data) data.slug = slug;

      return data ? data : rejectWithValue({ errorObj, slug });
    },
  );
}

const commentInitialObj = {
  after: null,
  results: [],
  apiState: API_STATE.LOADING,
  error: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔹 Get Posts
      .addCase(CommentAction.getComments.pending, (state, action) => {
        const slug = action.met?.arg?.slug;
        if (slug) {
          const prevData = state.postsCommentData[slug] || { ...commentInitialObj };

          state.postsCommentData[slug] = {
            ...prevData,
            apiState: API_STATE.LOADING,
            error: null,
          };
        }
      })
      .addCase(CommentAction.getComments.fulfilled, (state, action) => {
        const { slug, results, after } = action.payload;
        const prevData = state.postsCommentData[slug] || { ...commentInitialObj };
        const prevComments = prevData.results;

        const updatedComments = removeDuplicatesByKey([...prevComments, ...results], 'id');

        state.postsCommentData[slug] = {
          after,
          results: updatedComments,
          error: null,
          apiState: API_STATE.SUCCEEDED,
        };
      })
      .addCase(CommentAction.getComments.rejected, (state, action) => {
        const { slug, errorObj } = action.payload;
        const prevData = state.postsCommentData[slug] || { ...commentInitialObj };

        state.postsCommentData[slug] = {
          ...prevData,
          error: errorObj.detail,
          apiState: API_STATE.FAILED,
        };
      });
  },
});

export default commentsSlice.reducer;
