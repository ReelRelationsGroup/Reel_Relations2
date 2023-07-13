import React from "react";
import { NavLink } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <>
      <h1 className="flex flex-wrap justify-center text-2xL text-white">
        <div>
          <img
            src="https://cdn.dribbble.com/users/8805637/screenshots/16312153/media/d1dbc1c5e61313fc5c81b65f8540c8e3.gif"
            alt="Animated GIF"
          />
        </div>
        You're Lost Buddy - 404 Page Not Found
      </h1>
      <NavLink
        className="flex flex-wrap justify-center inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
        to={"/"}
      >
        Return Back Home
      </NavLink>
    </>
  );
};
