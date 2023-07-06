const express = require("express");
const app = express.Router();
const { Casts, Movie, castsMovieLink } = require("../db");
const bfs = require("../utils/DegreesOfSeparation"); // Update import statement
const buildGraph = require("../utils/graphBuilder");
const getCommonMovie = require ("./getCommonMovie")

// GET for degrees of separation between two actors
app.get("/:castsId/:casts2Id", async (req, res, next) => {
  try {
    const { castsId, casts2Id } = req.params;

    // Fetch the casts (actors) by name
    const casts1 = await Casts.findOne({ where: { name: castsId } });
    const casts2 = await Casts.findOne({ where: { name: casts2Id } });

    if (!casts1 || !casts2) {
      return res.status(404).json({ error: "Actor Not Found" });
    }

    const graph = await buildGraph();
    console.log(casts1.id, casts2.id);

    // Using the bfs function to find the path between the two actors
    let path = bfs(graph, casts1.id, casts2.id);

    // Calculate degrees of separation
    let degreesOfSeparation = path ? path.length - 1 : null;

    let moviesPath = [];
    for (let i = 0; i < path.length; i++){
      if (path[i+1]) {
        const commonMovies = await getCommonMovie(path[i], path[i+1]);
        moviesPath.push(commonMovies);
      }
    }

    // Sending the result as a JSON response
    res.json({ degreesOfSeparation, path, moviesPath });
  } catch (error) {
    next(error);
  }
});

module.exports = app;