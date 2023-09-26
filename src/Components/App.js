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

  const backgroundImages = [
    "url('https://wallpaperaccess.com/full/17510.jpg')",
    "url('https://wallpaperaccess.com/full/837256.jpg')",
    "url('https://wallpaperaccess.com/full/1801911.jpg')",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const backgroundImage = backgroundImages[currentIndex];

  const handleThemeToggle = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
  };

  useEffect(() => {
    // initial data loading here
    dispatch(loginWithToken());
    dispatch(fetchActors());
    // when loaded then set loading to false
    setLoading(false);
  }, []);

  return (
    <div
      style={{
        backgroundImage: backgroundImage,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh", // Ensure the background covers the entire viewport
      }}
    >
      {/* Your app content */}
      <button
        className="theme text-white flex text-lg tracking-tight absolute left-7 top-12 px-3 py-2 rounded-md focus:outline-none focus:shadow-outline"
        onClick={handleThemeToggle}
      >
        Change Theme
      </button>
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
      <div className="h-20 bg-transparent" />
      <Footer />
    </div>
  );
};

export default App;
