import { configureStore } from '@reduxjs/toolkit';

import commentsReducer from './features/comments/commentsSlice';
import postsReducer from './features/posts/postsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
