import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout, fetchSomeActors, clearSomeActors } from "../store";
import { SearchIcon, Star } from "lucide-react";
import { fetchDegreesOfSeparation } from "../utils/api";
import Spinner from "./Spinner";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const { auth, someActors } = useSelector((state) => state);
  const dispatch = useDispatch();

  // state to keep track of the casts' (actors') names
  const [casts1Id, setCasts1Id] = useState("");
  const [casts2Id, setCasts2Id] = useState("");
  const [degreesOfSeparation, setDegreesOfSeparation] = useState(null);
  const [path, setPath] = useState([]);
  const [moviesPath, setMoviesPath] = useState(null);
  const [flowchart, setFlowchart] = useState([]);

  useEffect(() => {
    for (let i = 0; i < path.length; i++) {
      dispatch(fetchSomeActors(path[i]));
    }
  }, [path]);

  useEffect(() => {
    let temp = [];
    for (let i = 0; i < path.length; i++) {
      for (let j = 0; j < someActors.length; j++) {
        if (someActors[j].id === path[i]) {
          if (moviesPath[j]) {
            temp.push(someActors[j]);
            temp.push(moviesPath[i][0]);
          } else {
            temp.push(someActors[j]);
          }
        }
      }
    }
    setFlowchart(temp);
  }, [someActors]);

  // Helper function to capitalize the first letter of every word
  const capitalizeFirstLetter = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Function to handle the API call
  const findLink = async () => {
    try {
      setLoading(true);
      const response = await fetchDegreesOfSeparation(casts1Id, casts2Id);
      setDegreesOfSeparation(response.degreesOfSeparation);
      setPath(response.path);
      setMoviesPath(response.moviesPath);
      dispatch(clearSomeActors());
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="text-slate-300">
      <div className="flex flex-wrap justify-center">
        <Star />
        <div className="ml-3 mr-3 mb-4 text-3xl font-bold">
          Welcome {auth.username} to Reel Relations!!{" "}
        </div>
        <Star />
      </div>
      <p className="my-6 mx-20 flex flex-wrap justify-center items-center">
        Discover the Enchanting World of Hollywood & Cinema From Across the
        Globe & Uncover Why It's All About Who You Know
      </p>

      {/* Input fields for casts' (actors') names */}
      <div className="flex flex-wrap justify-center join">
        <div
          className="rounded-l-md btn btn-square join-item px-2 py-2 bg-slate-500"
          disabled
        >
          <SearchIcon
            size={24}
            className="text-black border-none rounded-md bg-transparent"
          />
        </div>
        <input
          type="text"
          value={casts1Id}
          onChange={(e) => setCasts1Id(capitalizeFirstLetter(e.target.value))}
          placeholder="Enter 1st Actor"
          className="join-item flex items-center border-2 border-lime-400 border-secondary text-2xl font-bold normal-case hover:bg-base-200"
        />
        <div
          className="btn btn-square join-item px-2 py-2 bg-slate-500"
          disabled
        >
          <SearchIcon
            size={24}
            className="text-black border-none rounded-md bg-transparent"
          />
        </div>

        <input
          type="text"
          value={casts2Id}
          onChange={(e) => setCasts2Id(capitalizeFirstLetter(e.target.value))}
          placeholder="Enter 2nd Actor"
          className="join-item flex items-center border-2 border-lime-400 border-secondary text-2xl font-bold normal-case hover:bg-base-200"
        />
        <button
          className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          onClick={findLink}
        >
          Find Link
        </button>
      </div>
      <div>
        {/* Displays the degrees of separation */}
        {degreesOfSeparation !== null && (
          <div className="flex flex-wrap font-semibold justify-center text-2xl my-7">
            Degrees of Separation: {degreesOfSeparation}
          </div>
        )}
        <div className="">
          {flowchart.map((node) => (
            <div className="flex flex-wrap justify-center">
              {node.name ? (
                <Link
                  to={`/casts/${node.id}`}
                  className="font-semibold text-xl"
                >
                  {node.name}
                </Link>
              ) : (
                <div>
                  <p className="flex flex-wrap justify-center my-5 text-md items-center font-normal italic">
                    {" "}
                    who was in{" "}
                  </p>
                  <Link
                    to={`/movie/${node.id}`}
                    className="font-semibold text-xl"
                  >
                    '{node.title}'
                  </Link>
                  <p className="flex flex-wrap justify-center my-5 text-md items-center font-normal italic">
                    {" "}
                    with
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default Home;
