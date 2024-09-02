import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../Postslice';

const Store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default Store;
