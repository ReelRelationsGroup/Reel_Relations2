const conn = require("./conn");
const { BOOLEAN, ARRAY, STRING, INTEGER, FLOAT } = conn.Sequelize;

const Casts = conn.define("casts", {
  id: {
    type: INTEGER,
    primaryKey: true,
  },
  known_for_department: {
    type: STRING,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  profile_path: {
    type: STRING,
  },
});

module.exports = Casts;