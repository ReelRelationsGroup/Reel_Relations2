const { Casts, Movie, castsMovieLink } = require("../db");

const buildGraph = async () => {
  const graph = {};

  try {
    // Fetch movies and casts in parallel using query batching - 2 seconds faster
    const [movies, casts] = await Promise.all([
      Movie.findAll({
        include: [
          {
            model: Casts,
            as: "casts",
            through: {
              model: castsMovieLink,
              as: "castsMovieLink",
            },
          },
        ],
      }),
      Casts.findAll(),
    ]);

    if (!movies || movies.length === 0) {
      throw new Error("No movies found in the database.");
    }

    // Build the graph
    for (const movie of movies) {
      const movieCasts = movie.get("casts");

      for (const cast of movieCasts) {
        const castId = cast.id;

        if (!graph[castId]) {
          graph[castId] = [];
        }

        // Filter out the current cast from the list of coCasts
        const coCasts = movieCasts.filter((c) => c.id !== castId);
        const coCastIds = coCasts.map((c) => c.id);

        graph[castId].push(...coCastIds);
      }
    }
  } catch (error) {
    throw new Error(`Error building the graph: ${error.message}`);
  }

  return graph;
};

module.exports = buildGraph;