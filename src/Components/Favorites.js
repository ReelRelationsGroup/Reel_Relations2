import React, { useEffect, useState } from "react";
import FavoriteCasts from "./FavoriteCasts";
import FavoriteMovies from "./FavoriteMovies";


const Favorites = () => {

    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    }


    return (
        <div>
            <h1>Your Favorites</h1>
            <h3 
                onClick={() => setActiveTab(0)}>Favorite Movies</h3>
            <h3 
                onClick={() => setActiveTab(1)}>Favorite Casts</h3>
            {activeTab == 0 ? <FavoriteMovies /> : <FavoriteCasts />}
        </div>
    )
}

export default Favorites;