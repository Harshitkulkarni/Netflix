import { createSlice } from "@reduxjs/toolkit";

const moviesData = createSlice({
  name: "moviesData",
  initialState: {
    nowPlayingMovies: null,
    Trailers: null,
    popularMovies: null,
    trendingMovies: null,
    fetchedMovies: [],
    moviesName: [],
    moviesVideos: null,
  },
  reducers: {
    addnowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrailers: (state, action) => {
      state.Trailers = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTrendingMovies: (state, action) => {
      state.trendingMovies = action.payload;
    },
    addSearchedMovies: (state, action) => {
      const { moviesName, fetchedMovies } = action.payload;
      state.fetchedMovies = fetchedMovies;
      state.moviesName = moviesName;
    },
    addMoviesVideos: (state, action) => {
      state.moviesVideos = action.payload;
    },
  },
});

export const {
  addnowPlayingMovies,
  addTrailers,
  addPopularMovies,
  addTrendingMovies,
  addSearchedMovies,
  addMoviesVideos,
} = moviesData.actions;
export default moviesData.reducer;
