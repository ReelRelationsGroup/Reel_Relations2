import React, { useEffect, useState } from "react";
import Home from "./Home";
import LoginRegister from "./LoginRegister";
import { useSelector, useDispatch } from "react-redux";
import { Link, Routes, Route } from "react-router-dom";
import SingleMovie from "./SingleMovie";
import SingleCast from "./SingleCast";
import DegreesOfSeparation from "./DegreesOfSeperation";
import Navbar from "./Navbar";
import About from "./About";
import { PageNotFound } from "./PageNotFound";
import Favorites from "./Favorites";
import Footer from "./Footer";
import { fetchActors, loginWithToken } from "../store";
import EditAccount from "./EditAccount";

const App = () => {
  const { auth, actors } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // initial data loading here
    dispatch(loginWithToken());
    dispatch(fetchActors());
    // when loaded then set loading to false
    setLoading(false);
  }, []);

  return (
    <div>
      <div>
        <Navbar />
        <Routes>
          {auth.id ? (
            <Route path="/editAccount" element={<EditAccount />} />
          ) : null}
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<SingleMovie />} />
          <Route path="/casts/:id" element={<SingleCast />} />
          <Route
            path="/degrees-of-separation/:casts1Id/:casts2Id"
            element={<DegreesOfSeparation />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <div>
        <h1>{actors.length}</h1>
      </div>
      <div className="h-20"/>
      <Footer />
    </div>
  );
};

export default App;
