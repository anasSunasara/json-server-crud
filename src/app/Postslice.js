import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching posts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('http://192.168.1.9:3001/posts');
  const data = await response.json();
  return data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the reducer to be used in the store
export default postsSlice.reducer;
