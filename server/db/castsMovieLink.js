const Sequelize = require("sequelize");
const conn = require("./conn");
const INTEGER = conn.Sequelize;

// this model will link casts (actors) to movies to movie_cast

export const castsMovieLink = conn.define("castsMovieLink", {
  castsId: {
    type: INTEGER,
    references: {
      model: "casts", // 'cast' refers to table name
      key: "id", // 'id' refers to column name in cast table
      through: "castsMovieLink",
    },
  },
  moviesId: {
    type: INTEGER,
    references: {
      model: "movies", // 'movies' refers to table name
      key: "id", // 'id' refers to column name in movies table
      through: "castsMovieLink",
    },
  },
  movie_castsId: {
    type: INTEGER,
    references: {
      model: "movie_casts", // 'movie_casts' refers to table name
      key: "movieId", // 'id' refers to column name in movie_casts table
    },
  },
});