import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import {
  addFavoriteMovie,
  deleteFavoriteMovie,
  fetchFavoriteMovies,
  fetchMovieById,
  fetchMovies,
} from "../store";
import { useParams, NavLink } from "react-router-dom";
import Spinner from "./Spinner";

const SingleMovie = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { singleMovie, favoriteMovies, auth, movies } = useSelector((state) => state);

  const isMovieInFavorites = (movieId) => {
    console.log('favoriteMovies:', favoriteMovies);
    console.log('movieId:', movieId);
  
    if (!favoriteMovies || favoriteMovies.length === 0) {
      return false;
    }
  
    const isFavorite = favoriteMovies.some((movie) => {
      console.log(movie);
      console.log(movie.movieId === movieId);
      return movie.movieId === movieId;
    });
  
    console.log('isFavorite:', isFavorite);
    return isFavorite;
  };
  
  const isSingleInDb = (movieId) => {
    return movies.some((movie) => movie.id === movieId);
  }

  const handleToggleFavorite = (movieId) => {
    if (isMovieInFavorites(movieId)) {
      dispatch(deleteFavoriteMovie(movieId));
    } else {
      dispatch(addFavoriteMovie(movieId));
    }
    dispatch(fetchFavoriteMovies());
  };

  useEffect(() => {
    dispatch(fetchMovieById(id));
    dispatch(fetchFavoriteMovies());
    dispatch(fetchMovies());
  }, [dispatch, id]);

  const releaseYear = new Date(singleMovie?.release_date).getFullYear();
  const formattedDate = new Date(
    singleMovie?.release_date
  ).toLocaleDateString();

  const runtimeHours = Math.floor(singleMovie.runtime / 60);
  const runtimeMinutes = singleMovie.runtime % 60;

  return !singleMovie?.title ? (
    <>
      <h1 className="flex flex-wrap justify-center text-2xL">
        You're Lost Buddy - Movie Page Not Found
      </h1>
      <NavLink
        className="flex flex-wrap justify-center inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
        to={"/"}
      >
        Return Back Home
      </NavLink>
    </>
  ) : (
    <section className="mx-6 flex flex-col md:flex-row text-slate-300">
      <div className="w-full md:w-1/3">
        <img
          className="w-full m-auto py-5 px-4 relative group"
          src={`https://image.tmdb.org/t/p/original${singleMovie.poster_path}`}
          alt="Movie Poster"
        />
      </div>
      <div className="w-full md:w-2/3 px-4 my-4">
        <h1 className="font-semibold text-3xl">
          {singleMovie.title} ({releaseYear}){" "}
          {auth.username && isSingleInDb(singleMovie.id) && (
            <span>
              {isMovieInFavorites(singleMovie.id) ? (
                <FontAwesomeIcon
                  icon={solidHeart}
                  onClick={() => handleToggleFavorite(singleMovie.id)}
                />
              ) : (
                <FontAwesomeIcon
                  icon={regularHeart}
                  onClick={() => handleToggleFavorite(singleMovie.id)}
                />
              )}
            </span>
          )}
        </h1>
        <p>
          Released: {formattedDate} - User Score: {singleMovie.vote_average} -
          Runtime: {runtimeHours}h {runtimeMinutes}m
        </p>
        <h2 className="text-xl font-extrabold my-5">Overview</h2>
        <p>{singleMovie.overview}</p>
      </div>
    </section>
  );
};

export default SingleMovie;
