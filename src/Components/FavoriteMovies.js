import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchFavoriteMovies } from "../store";

const FavoriteMovies = () => {

    const { favoriteMovies } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFavoriteMovies());
    }, [dispatch])


    return (
        <div className="w-full">
            <ul className="flex flex-wrap">
                { favoriteMovies && (
                    favoriteMovies.map((movie) => (
                        <li key={movie.id} className="m-5 w-1/4">
                            <Link to={`/movie/${movie.movie.id}`}>
                                <img
                                    className="w-52 h-75 rounded-lg my-4"
                                    src={`https://image.tmdb.org/t/p/original${movie.movie.poster_path}`}
                                    alt="Actor Profile"
                                />
                                <span className="truncate block max-w-xs ">{movie.movie.title}</span>

                            </Link>
                        </li>
                    ))
                )

                }
            </ul>

        </div>
    )
}

export default FavoriteMovies;