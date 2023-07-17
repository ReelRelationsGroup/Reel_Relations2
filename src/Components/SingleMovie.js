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
} from "../store";
import { useParams, NavLink } from "react-router-dom";
import Spinner from "./Spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      toast.success("Movie removed from favorites."); // Show success toast when movie is removed
    } else {
      dispatch(addFavoriteMovie(movieId));
      toast.success("Movie added to favorites."); // Show success toast when movie is added
    }
    // dispatch(fetchFavoriteMovies());
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
    <div className="flex flex-col items-center justify-start h-screen">
      <h1 className="flex flex-col items-center justify-start">
        <div className="text-white text-2xl font-bold my-2 text-center">
          <div className="flex justify-center">
            <img
              src="https://cdn.dribbble.com/users/8805637/screenshots/16312153/media/d1dbc1c5e61313fc5c81b65f8540c8e3.gif"
              alt="Animated GIF"
              className="w-3/5"
            />
          </div>
        </div>
        <div className="text-white text-2xl font-bold my-2 text-center">
          You're Lost Buddy - Movie Page Not Found
        </div>
      </h1>
      <div className="flex items-center justify-center">
        <NavLink
          className="w-96 flex items-center justify-center text-md px-4 py-2 border rounded text-white border-white hover:border-teal-500 hover:text-teal-500 mt-4"
          to={"/"}
        >
          Return Back Home
        </NavLink>
      </div>
    </div>
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
          {auth.username && (
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
      <ToastContainer position="bottom-right" />{" "}
    </section>
  );
};

export default SingleMovie;
