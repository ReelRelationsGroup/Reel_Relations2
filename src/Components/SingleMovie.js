import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faStar as filledStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import {
  addFavoriteMovie,
  deleteFavoriteMovie,
  fetchFavoriteMovies,
  fetchMovieById,
} from "../store";
import { useParams, NavLink, Link } from "react-router-dom";
import Spinner from "./Spinner";

// Star Rating component
const StarRating = ({ rating }) => {
  const filledStars = Math.round(rating / 2);
  const emptyStars = 5 - filledStars;

  return (
    <div className="star-rating">
      {[...Array(filledStars)].map((_, index) => (
        <FontAwesomeIcon key={index} icon={filledStar} />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <FontAwesomeIcon key={index} icon={emptyStar} />
      ))}
    </div>
  );
};

const SingleMovie = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { singleMovie, favoriteMovies, auth } = useSelector((state) => state);
  const [currentPage, setCurrentPage] = useState(1);
  const actorsPerPage = 15;

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

  const filteredCast = singleMovie.credits?.cast.filter((cast) => cast.popularity > 0);
  const sortedPopularity =
    filteredCast?.length < 10
      ? filteredCast
      : filteredCast
          ?.sort((actor1, actor2) => actor2.popularity - actor1.popularity);

  const indexOfLastActor = currentPage * actorsPerPage;
  const indexOfFirstActor = indexOfLastActor - actorsPerPage;
  const currentActors = sortedPopularity?.slice(
    indexOfFirstActor,
    indexOfLastActor
  );
  const popularActors = sortedPopularity?.slice(0,10);
  console.log(popularActors)

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
    <div className="flex p-8 text-slate-300">
      <div className="mx-6 w-[300px]">
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
        <img
          className="w-full h-[450px] min-w-[300px] min-h-[450px] block rounded-lg my-4"
          src={`https://image.tmdb.org/t/p/original${singleMovie.poster_path}`}
          alt="Movie Poster"
        />
      </div>
      <div className="flex-1 pl-[30px] overflow-x-hidden">
        <h1 className="mb-[8px] font-bold text-lg">
          {singleMovie.title} ({releaseYear}){" "}
        </h1>
        <p className="text-xs"> 
          Released: {formattedDate} - Runtime: {runtimeHours}h {runtimeMinutes}m
        </p>
        <p className="flex flex-wrap font-bold text-sm">
        User Score <StarRating rating={singleMovie.vote_average} /> 
        </p>
        <section className="mt-[30px]">
          <h2 className="mb-[8px] font-bold text-lg">Overview</h2>
          <p>{singleMovie.overview}</p>
        </section>
        <section className="mt-[30px] overflow-x-hidden flex-1">
          <h3 className="text-lg font-bold">Top Billed Cast: </h3>
          <div className="min-h-[221px] overflow-x-scroll">
            <ul className="flex">
              {popularActors.map((actor) => {
                return (
                  <li key={actor.id} className="w-[130px] mr-4 flex-shrink-0">
                    <Link to={`/casts/${actor.id}`}>
                      <img
                        className="w-[130px] h-[195px] object-cover"
                        src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`} />
                      <div className="text-center">{actor.name}</div>
                    </Link>
                    <div className="text-center">as </div>
                    <div className="text-center">{actor.character}</div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SingleMovie;