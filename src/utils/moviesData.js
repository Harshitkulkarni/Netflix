import { createSlice } from "@reduxjs/toolkit";

const moviesData = createSlice({
  name: "moviesData",
  initialState: {
    nowPlayingMovies: null,
    Trailers: null,
  },
  reducers: {
    addnowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrailers: (state, action) => {
      state.Trailers = action.payload;
    },
  },
});

export const { addnowPlayingMovies, addTrailers } = moviesData.actions;
export default moviesData.reducer;
