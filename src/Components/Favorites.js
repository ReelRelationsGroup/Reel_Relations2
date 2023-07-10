import React, { useEffect, useState } from "react";
import FavoriteCasts from "./FavoriteCasts";
import FavoriteMovies from "./FavoriteMovies";

const Favorites = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="flex md:flex-row text-slate-300">
      <div className="mx-6 w-full md:w-1/2">
        <h1 className="text-2xl my-4">Your Favorites</h1>
        <div className="text-lg flex border-slate-400">
          <h2
            className="ml-5 mr-3 hover:text-teal-200 hover:cursor-pointer"
            onClick={() => setActiveTab(0)}
          >
            Movies
          </h2>
          <h2
            className="ml-2 mr-3 hover:text-teal-200 hover:cursor-pointer"
            onClick={() => setActiveTab(1)}
          >
            Casts
          </h2>
        </div>
        {activeTab == 0 ? <FavoriteMovies /> : <FavoriteCasts />}
      </div>
    </div>
  );
};

export default Favorites;
