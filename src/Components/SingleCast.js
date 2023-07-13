import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, Link } from "react-router-dom";
import {
  fetchActorById,
  fetchFavoriteCasts,
  addFavoriteCast,
  deleteFavoriteCast,
} from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import Carousel from "./Carousel";
import Spinner from "./Spinner";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

const SingleCast = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { singleActor, favoriteCasts, auth } = useSelector((state) => state);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 15;
  const [expanded, setExpanded] = useState(false);

  const isActorInFavorites = (actorId) => {
    if (favoriteCasts.length === 0) {
      return false;
    }
    return favoriteCasts.some((actor) => {
      return actor.actorId === actorId;
    });
  };

  const handleToggleFavorite = (actorId) => {
    if (isActorInFavorites(actorId)) {
      dispatch(deleteFavoriteCast(actorId));
    } else {
      dispatch(addFavoriteCast(actorId));
    }
    // dispatch(fetchFavoriteCasts());
  };

  useEffect(() => {
    dispatch(fetchActorById(id));
    dispatch(fetchFavoriteCasts());
  }, [dispatch, id]);

  // Calculate the current age
  const birthDate = new Date(singleActor.birthday);
  const ageDiffMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDiffMs);
  const currentAge = Math.abs(ageDate.getUTCFullYear() - 1970);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const truncatedBiography = singleActor?.biography
    ?.split(" ")
    ?.slice(0, 100)
    ?.join(" ");
  const showReadMore = singleActor?.biography?.split(" ").length > 100;

  if (!singleActor || !singleActor.movie_credits) {
    return (
      <>
        <Spinner />{" "}
        {/* Display the Spinner component when the data is loading */}
        <h1 className="flex flex-wrap justify-center text-2xL">
          <div className="flex justify-center items-center">
            <img
              className="max-w-sm"
              src="https://cdn.dribbble.com/users/2882885/screenshots/7861928/media/a4c4da396c3da907e7ed9dd0b55e5031.gif"
              alt="Loading..."
            />
          </div>
          You're Lost Buddy - Actor Page Not Found
        </h1>
        <NavLink
          className="flex flex-wrap justify-center inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          to={"/"}
        >
          Return Back Home
        </NavLink>
      </>
    );
  }

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = singleActor.movie_credits.cast.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex p-8 text-slate-300">
      <div className="mx-6 w-full">
        {auth.username && (
          <span>
            {isActorInFavorites(singleActor.id) ? (
              <FontAwesomeIcon
                icon={solidHeart}
                onClick={() => handleToggleFavorite(singleActor.id)}
              />
            ) : (
              <FontAwesomeIcon
                icon={regularHeart}
                onClick={() => handleToggleFavorite(singleActor.id)}
              />
            )}
          </span>
        )}
        <img
          className="w-[300px] h-[450px] min-w-[300px] min-h-[450px] block rounded-lg my-4"
          src={`https://image.tmdb.org/t/p/original${singleActor.profile_path}`}
          alt="Actor Profile"
        />
        <h1>Current Age: {currentAge} years old</h1>

      </div>
      <div className="w-[calc(100vw - 80px - 300px)] max-w-[920px] pl-[30px]">
        <h2 className="font-bold text-2xl">{singleActor.name}</h2>
        <section className="mt-[30px]">
            <h2 className="mb-[8px] font-bold text-lg">Biography </h2>
            {expanded ? (
                <p>{singleActor.biography}</p>
                ) : (
                <p>{truncatedBiography}</p>
                )}
                {showReadMore && (
                <button
                    className="text-lg font-semibold text-blue-500 hover:underline"
                    onClick={toggleExpand}
                >
                    {expanded ? (
                    <div className="flex items-center">
                        <ChevronsLeft size={20} />
                        <div>Read Less</div>
                    </div>
                    ) : (
                    <div className="flex items-center">
                        <div>Read More</div>
                        <ChevronsRight size={20} />
                    </div>
                    )}
                </button>
                )}
        </section>
        
        {/*<Carousel movies={singleActor.movie_credits.cast} /> */}
        <section className="mt-[30px]">
            <h3 className="text-lg font-bold">Acting: </h3>
            <ul>
            {currentMovies.map((movie) => (
                <li key={movie.id}>
                <Link className="block" to={`/movie/${movie.id}`}>
                    {movie.title}
                </Link>
                </li>
            ))}
            </ul>
            <div>
                {singleActor.movie_credits.cast.length > moviesPerPage && (
                    <ul>
                    {Array.from(
                        Array(
                        Math.ceil(
                            singleActor.movie_credits.cast.length / moviesPerPage
                        )
                        ),
                        (value, index) => (
                        <li key={index}>
                            <button
                            className={`pagination-item ${
                                currentPage === index + 1 ? "active" : ""
                            }`}
                            onClick={() => paginate(index + 1)}
                            >
                            {index + 1}
                            </button>
                        </li>
                        )
                    )}
                    </ul>
                )}
            </div>         
        </section>
      </div>
    </div>
  );
};

export default SingleCast;
