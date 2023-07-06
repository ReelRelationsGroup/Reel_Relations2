import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteCasts } from "../store";
import { Link } from "react-router-dom";


const FavoriteCasts = () => {

    const { favoriteCasts } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFavoriteCasts());
    }, [dispatch])


    return (
        <div >
            <ul className = "flex flex-wrap">
                {favoriteCasts && (
                    favoriteCasts.map((cast) => (
                        <li key={cast.id} className="m-4">
                            <Link to={`/casts/${cast.actorId}`}>
                                <img
                                className="w-52 h-75 rounded-lg my-4"
                                src={`https://image.tmdb.org/t/p/original${cast.cast.profile_path}`}
                                alt="Actor Profile"
                                />
                                <span className="truncate">{cast.cast.name}</span>
                            </Link>
                        </li>
                    )
                ))}
            </ul>
        </div>
    )
}

export default FavoriteCasts;