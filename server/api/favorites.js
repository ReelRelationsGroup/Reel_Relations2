const { Movie, Casts, User } = require("../db");
const express = require('express');
const { FavoriteMovies, FavoriteCasts } = require("../db/Favorites");
const app = express.Router();

module.exports = app;

app.get('/movies', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const favorites = await FavoriteMovies.findAll({
      where: {
        userId: user.id
      },
      include: [Movie],
    });
    res.send(favorites);

  } catch (e) {
    next(e);
  }
});

app.get('/casts', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const favorites = await FavoriteCasts.findAll({
      where: {
        userId: user.id
      },
      include: [Casts],
    });
    res.send(favorites);

  } catch (e) {
    next(e);
  }
});

app.post('/movie', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const favoriteMovie = await FavoriteMovies.create({
      userId: user.id,
      movieId: req.body.movieId,
    });
    res.status(201).send(favoriteMovie);
  } catch (e) {
    next(e)
  }
});

app.post('/cast', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const favoriteCast = await FavoriteCasts.create({
      userId: user.id,
      actorId: req.body.castId,
    });
    res.status(201).send(favoriteCast);
  } catch (e) {
    next(e)
  }
});



app.delete('/movie/:id', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const favorite = await FavoriteMovies.findOne({
      where: {
        userId: user.id,
        movieId: req.params.id
      }
    });
    await favorite.destroy();
    res.send(favorite);
  } catch (e) {
    next(e);
  }
});

app.delete('/cast/:id', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const favorite = await FavoriteCasts.findOne({
      where: {
        userId: user.id,
        actorId: req.params.id
      }
    });
    await favorite.destroy();
    res.send(favorite);
  } catch (e) {
    next(e);
  }
});