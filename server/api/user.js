const express = require("express");
const app = express.Router();
const { User, Favorites } = require("../db");

app.get("/", async (req, res, next) => {
  try {
    const user = await User.findAll();
    res.send(user);
  } catch (er) {
    next(er);
  }
});

// Get user by id and include favorites
app.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (!user || (user.id !== req.params.id && !user.isAdmin)) {
      res.status(401).send({ error: "Unauthorized or Bad credentials" });
      return;
    }
    const fetchedUser = await User.findByPk(req.params.id, {
      include: Favorites,
    });
    res.send(fetchedUser);
  } catch (ex) {
    next(ex);
  }
});

app.post("/", async (req, res, next) => {
  try {
    console.log("route receiving: " + req.body);
    res.status(201).send(await User.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (!user || !user.isAdmin || user.id !== req.params.id) {
      res.status(401).send("Unauthorized or Bad credentials");
      return;
    }
    const fetchedUser = await User.findByPk(req.params.id);
    const updateData = {
      username: req.body.data.username,
      email: req.body.data.email,
      avatar: req.body.data.avatar,
    };
    if (
      req.body.data.password !== "" &&
      req.body.data.password !== undefined &&
      req.body.data.password !== null
    ) {
      updateData.password = req.body.data.password;
    }
    const updatedUser = await fetchedUser.update(updateData);
    res.send(updatedUser);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(403);
      res.send(error.errors[0].message);
    } else {
      next(error);
    }
  }
});

module.exports = app;
