// require("dotenv").config();
const conn = require("./conn");
const { JSON, STRING, UUID, UUIDV4, TEXT } = conn.Sequelize;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;
const axios = require("axios");
const { BOOLEAN } = require("sequelize");

const User = conn.define("user", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  login: {
    type: STRING,
    unique: true,
  },
  username: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: {
      args: true,
      msg: "Username Already Exists",
    },
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
    unique: {
      args: true,
      msg: "Email Already In Use.",
    },
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false,
  },
  place: {
    type: JSON,
    defaultValue: {},
  },
  avatar: {
    type: TEXT,
    defaultValue:
      "https://images.assetsdelivery.com/compings_v2/alexutemov/alexutemov1608/alexutemov160800980.jpg",
  },
});

User.addHook("beforeSave", async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.findByToken = async function (token) {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await this.findByPk(id);
    if (!user) {
      const error = new Error("Bad Credentials");
      error.status = 401;
      throw error;
    }
    return user;
  } catch (ex) {
    const error = new Error(
      ex instanceof jwt.JsonWebTokenError ? "Bad Credentials" : ex.message
    );
    error.status = ex instanceof jwt.JsonWebTokenError ? 401 : 500;
    throw error;
  }
};

// setAdmin is instance method that sets isAdmin to true and saves the user
User.prototype.setAdmin = async function (bool) {
  this.isAdmin = bool;
  await this.save();
  return this;
};

User.prototype.getFavorites = async function () {
  const favorites = await conn.models.favorites.findAll({
    where: {
      userId: this.id,
    },
    include: [
      {
        model: conn.models.casts,
      },
      {
        model: conn.models.movies,
      },
    ],
  });
  return favorites;
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, JWT);
};

User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({
    where: {
      username,
    },
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ id: user.id }, JWT);
  }
  const error = new Error("Bad Credentials");
  error.status = 401;
  throw error;
};

User.authenticateGithub = async function (code) {
  let response = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      code,
      client_secret: process.env.CLIENT_SECRET,
      client_id: process.env.CLIENT_ID,
    },
    {
      headers: {
        accept: "application/json",
      },
    }
  );
  const { access_token, error } = response.data;
  if (error) {
    const _error = Error(error);
    _error.status = 401;
    throw _error;
  }

  response = await axios.get("https://api.github.com/user", {
    headers: {
      authorization: `Bearer ${access_token}`,
    },
  });

  const { login, avatar_url, email } = response.data; // get the avatar_url and email

  // Assign a placeholder email if the GitHub email is not available
  const userEmail = email ? email : `${login}@placeholder.com`;

  let user = await User.findOne({
    where: { login },
  });

  if (!user) {
    user = await User.create({
      login,
      username: `Github-${login}`,
      email: userEmail, // provide the email here
      password: `random-${Math.random()}`,
      avatar: avatar_url, // add the avatar url here
    });
  }

  await user.update({
    username: `Github-${login}`,
    avatar: avatar_url, // update the avatar url here
  });

  return user.generateToken();
};

module.exports = User;
