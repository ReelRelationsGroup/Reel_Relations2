const express = require("express");
const { Movie } = require("../db");
const app = express.Router();

module.exports = app;

app.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.findAll();
    res.send(movies);
  } catch (e) {
    next(e);
  }
});

app.get("/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.id);

    if (!movie) {
      res.redirect("/PageNotFound");
      return;
    }
    res.send(movie);
  } catch (err) {
    next(err);
  }
});