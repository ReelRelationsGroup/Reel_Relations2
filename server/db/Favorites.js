const { User } = require('lucide-react');
const conn = require('./conn');
const {INTEGER}  = conn.Sequelize

const FavoriteMovies = conn.define("favoriteMovies", {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    movieId: {
        type: INTEGER
    },
});

const FavoriteCasts = conn.define("favoriteCasts", {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    actorId: {
        type: INTEGER
    },
});



module.exports = {
    FavoriteMovies,
    FavoriteCasts
};