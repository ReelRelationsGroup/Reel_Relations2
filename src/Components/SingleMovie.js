import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { addFavoriteMovie, deleteFavoriteMovie, fetchFavoriteMovies, fetchMovieById } from "../store";
import { useParams, NavLink } from "react-router-dom";
import Spinner from "./Spinner";

const SingleMovie = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { singleMovie, favoriteMovies, auth } = useSelector((state) => state);

  const isMovieInFavorites = (movieId) => {
    if (favoriteMovies.length === 0) {
      return false; 
    }

    return favoriteMovies.some((movie) => {
      return movie.movieId === movieId;
    });
  };

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
  }, [dispatch, id]);

  const releaseYear = new Date(singleMovie?.release_date).getFullYear();
  const formattedDate = new Date(
    singleMovie?.release_date
  ).toLocaleDateString();

  const runtimeHours = Math.floor(singleMovie.runtime / 60);
  const runtimeMinutes = singleMovie.runtime % 60;

  return !singleMovie?.title ? (
    <Spinner />
  ) : (
    <section className="mx-6 flex flex-col md:flex-row">
      <div className="w-full md:w-1/3">
        <img
          className="w-full m-auto py-5 px-4 relative group"
          src={`https://image.tmdb.org/t/p/original${singleMovie.poster_path}`}
          alt="Movie Poster"
        />
      </div>
      <div className="w-full md:w-2/3 px-4 my-4">
        <h1 className="font-semibold text-3xl">
          {singleMovie.title} ({releaseYear}) {auth.username && (
          <span >
          {isMovieInFavorites(singleMovie.id) ? (
            <FontAwesomeIcon icon={solidHeart} onClick={() => handleToggleFavorite(singleMovie.id)} />
          ) : (
            <FontAwesomeIcon icon={regularHeart} onClick={() => handleToggleFavorite(singleMovie.id)}/>
          )}
        </span>
        )
        }
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