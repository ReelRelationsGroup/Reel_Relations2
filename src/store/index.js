import {configureStore} from "@reduxjs/toolkit";
import logger from 'redux-logger';
import actorsSlice from "./actorsSlice";
import auth from './auth';
import favoriteCastsSlice from "./favoriteCastsSlice";
import favoriteMoviesSlice from "./favoriteMoviesSlice";
import moviesSlice from "./moviesSlice";
import singleActorSlice from "./singleActorSlice";
import someActorsSlice from "./someActorsSlice"
import singleMovieSlice from "./singleMovieSlice";
import user from './user';

const store = configureStore({
  middleware: (defaultMiddleware)=> defaultMiddleware().concat(logger),
  reducer:{
    auth: auth,
    singleActor: singleActorSlice,
    someActors: someActorsSlice,
    singleMovie: singleMovieSlice,
    users: user,
    movies: moviesSlice,
    actors: actorsSlice,
    favoriteMovies: favoriteMoviesSlice,
    favoriteCasts: favoriteCastsSlice
  }
});

export default store;
export * from './auth';
export * from './singleActorSlice';
export * from './someActorsSlice'
export * from './singleMovieSlice';
export * from './user';
export * from './moviesSlice';
export * from './actorsSlice';
export * from './favoriteCastsSlice';
export * from './favoriteMoviesSlice';