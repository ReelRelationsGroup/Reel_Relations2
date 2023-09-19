const Sequelize = require("sequelize");
const config = {};

if (process.env.QUIET) {
  config.logging = false;
}

// Add SSL configuration (for render.com)
config.dialectOptions = {
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
};

const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/reel_relations_db",
  config
);

module.exports = conn;
