const conn = require("./conn");
const { TEXT, STRING, INTEGER, FLOAT, DATE } = conn.Sequelize;

const Movie = conn.define("movie", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: STRING,
  },
  overview: {
    type: TEXT,
  },
  backdrop_path: {
    type: STRING,
  },
  popularity: {
    type: FLOAT,
  },
  poster_path: {
    type: STRING,
  },
  runtime: {
    type: STRING,
  },
  release_date: {
    type: STRING,
  },
  vote_average: {
    type: FLOAT,
  },
  vote_count: {
    type: INTEGER,
  },
});

module.exports = Movie;